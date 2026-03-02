import React, { useRef, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import {
    luminance, cos, min, time, atan, uniform, pass, PI, TWO_PI, color,
    positionLocal, sin, texture, Fn, uv, vec2, vec3, vec4
} from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';

export const TornadoBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGPURenderer | null = null, renderPipeline: any;
        let animationFrameId: number;

        const init = () => {
            // Camera setup to view from slightly above
            camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 50);
            camera.position.set(2, 1, 4); // Adjusted target view
            camera.lookAt(0, 0.4, 0);

            scene = new THREE.Scene();

            // textures
            const textureLoader = new THREE.TextureLoader();
            // Assuming perlin noise texture exists in public folder
            const perlinTexture = textureLoader.load('/textures/noises/perlin/rgb-256x256.png');
            perlinTexture.wrapS = THREE.RepeatWrapping;
            perlinTexture.wrapT = THREE.RepeatWrapping;

            // TSL functions
            const toRadialUv = Fn(([uvNode, multiplier, rotation, offset]) => {
                const centeredUv = uvNode.sub(0.5).toVar();
                const distanceToCenter = centeredUv.length();
                const angle = atan(centeredUv.y, centeredUv.x);
                const radialUv = vec2(angle.add(PI).div(TWO_PI), distanceToCenter).toVar();
                radialUv.mulAssign(multiplier);
                radialUv.x.addAssign(rotation);
                radialUv.y.addAssign(offset);
                return radialUv;
            });

            const toSkewedUv = Fn(([uvNode, skew]) => {
                return vec2(
                    uvNode.x.add(uvNode.y.mul(skew.x)),
                    uvNode.y.add(uvNode.x.mul(skew.y))
                );
            });

            const twistedCylinder = Fn(([position, parabolStrength, parabolOffset, parabolAmplitude, timeNode]) => {
                const angle = atan(position.z, position.x).toVar();
                const elevation = position.y;

                // parabol
                const radius = parabolStrength.mul(position.y.sub(parabolOffset)).pow(2).add(parabolAmplitude).toVar();

                // turbulences
                radius.addAssign(sin(elevation.sub(timeNode).mul(20).add(angle.mul(2))).mul(0.05));

                const twistedPosition = vec3(
                    cos(angle).mul(radius),
                    elevation,
                    sin(angle).mul(radius)
                );

                return twistedPosition;
            });

            // uniforms
            const emissiveColor = uniform(color('#ff003c')); // prayan neon-red
            const timeScale = uniform(0.2);
            const parabolStrength = uniform(1.2);
            const parabolOffset = uniform(0.3);
            const parabolAmplitude = uniform(0.2);

            // tornado floor
            const floorMaterial = new THREE.MeshBasicNodeMaterial({ transparent: true, wireframe: false, depthWrite: false });

            floorMaterial.outputNode = Fn(() => {
                const scaledTime = time.mul(timeScale);

                // noise 1
                const noise1Uv = toRadialUv(
                    uv(),
                    vec2(0.5, 0.5),
                    scaledTime,
                    scaledTime
                );
                noise1Uv.assign(toSkewedUv(noise1Uv, vec2(-1, 0)));
                noise1Uv.mulAssign(vec2(4, 1));
                const noise1 = texture(perlinTexture, noise1Uv, 1).r.remap(0.45, 0.7);

                // noise 2
                const noise2Uv = toRadialUv(
                    uv(),
                    vec2(2, 8),
                    scaledTime.mul(2),
                    scaledTime.mul(8)
                );
                noise2Uv.assign(toSkewedUv(noise2Uv, vec2(-0.25, 0)));
                noise2Uv.mulAssign(vec2(2, 0.25));
                const noise2 = texture(perlinTexture, noise2Uv, 1).b.remap(0.45, 0.7);

                // outer fade
                const distanceToCenter = uv().sub(0.5).toVar();
                const outerFade = min(
                    distanceToCenter.length().oneMinus().smoothstep(0.5, 0.9),
                    distanceToCenter.length().smoothstep(0, 0.2)
                );

                // effect
                const effect = noise1.mul(noise2).mul(outerFade).toVar();

                // output
                return vec4(
                    emissiveColor.mul(effect.step(0.2)).mul(3), // Emissive
                    effect.smoothstep(0, 0.01) // Alpha
                );
            })();

            const floor = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), floorMaterial);
            floor.rotation.x = -Math.PI * 0.5;
            scene.add(floor);

            // tornado cylinder geometry
            const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 10, 10, true);
            cylinderGeometry.translate(0, 0.5, 0);

            // tornado emissive cylinder
            const emissiveMaterial = new THREE.MeshBasicNodeMaterial({ transparent: true, side: THREE.DoubleSide, wireframe: false, depthWrite: false });

            emissiveMaterial.positionNode = twistedCylinder(positionLocal, parabolStrength, parabolOffset, parabolAmplitude.sub(0.05), time.mul(timeScale));

            emissiveMaterial.outputNode = Fn(() => {
                const scaledTime = time.mul(timeScale);

                // noise 1
                const noise1Uv = uv().add(vec2(scaledTime, scaledTime.negate())).toVar();
                noise1Uv.assign(toSkewedUv(noise1Uv, vec2(-1, 0)));
                noise1Uv.mulAssign(vec2(2, 0.25));
                const noise1 = texture(perlinTexture, noise1Uv, 1).r.remap(0.45, 0.7);

                // noise 2
                const noise2Uv = uv().add(vec2(scaledTime.mul(0.5), scaledTime.negate())).toVar();
                noise2Uv.assign(toSkewedUv(noise2Uv, vec2(-1, 0)));
                noise2Uv.mulAssign(vec2(5, 1));
                const noise2 = texture(perlinTexture, noise2Uv, 1).g.remap(0.45, 0.7);

                // outer fade
                const outerFade = min(
                    uv().y.smoothstep(0, 0.1),
                    uv().y.oneMinus().smoothstep(0, 0.4)
                );

                // effect
                const effect = noise1.mul(noise2).mul(outerFade);

                const emissiveColorLuminance = luminance(emissiveColor);

                // output
                return vec4(
                    emissiveColor.mul(1.2).div(emissiveColorLuminance), // emissive
                    effect.smoothstep(0, 0.1) // alpha
                );
            })();

            const emissive = new THREE.Mesh(cylinderGeometry, emissiveMaterial);
            emissive.scale.set(1, 1, 1);
            scene.add(emissive);

            // tornado dark cylinder
            const darkMaterial = new THREE.MeshBasicNodeMaterial({ transparent: true, side: THREE.DoubleSide, wireframe: false, depthWrite: false });

            darkMaterial.positionNode = twistedCylinder(positionLocal, parabolStrength, parabolOffset, parabolAmplitude, time.mul(timeScale));

            darkMaterial.outputNode = Fn(() => {
                const scaledTime = time.mul(timeScale).add(123.4);

                // noise 1
                const noise1Uv = uv().add(vec2(scaledTime, scaledTime.negate())).toVar();
                noise1Uv.assign(toSkewedUv(noise1Uv, vec2(-1, 0)));
                noise1Uv.mulAssign(vec2(2, 0.25));
                const noise1 = texture(perlinTexture, noise1Uv, 1).g.remap(0.45, 0.7);

                // noise 2
                const noise2Uv = uv().add(vec2(scaledTime.mul(0.5), scaledTime.negate())).toVar();
                noise2Uv.assign(toSkewedUv(noise2Uv, vec2(-1, 0)));
                noise2Uv.mulAssign(vec2(5, 1));
                const noise2 = texture(perlinTexture, noise2Uv, 1).b.remap(0.45, 0.7);

                // outer fade
                const outerFade = min(
                    uv().y.smoothstep(0, 0.2),
                    uv().y.oneMinus().smoothstep(0, 0.4)
                );

                // effect
                const effect = noise1.mul(noise2).mul(outerFade);

                return vec4(
                    vec3(0), // dark
                    effect.smoothstep(0, 0.01)
                );
            })();

            const dark = new THREE.Mesh(cylinderGeometry, darkMaterial);
            dark.scale.set(1, 1, 1);
            scene.add(dark);

            // renderer
            if (THREE.WebGPURenderer) {
                renderer = new THREE.WebGPURenderer({ antialias: false, alpha: true });
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setClearColor(0x000000, 0);
                renderer.toneMapping = THREE.ACESFilmicToneMapping;

                if (containerRef.current) {
                    const canvas = renderer.domElement;
                    canvas.style.position = 'absolute';
                    canvas.style.top = '50%';
                    canvas.style.left = '50%';
                    canvas.style.transform = 'translate(-50%, -50%)';
                    canvas.style.width = '100%';
                    canvas.style.height = '100%';
                    canvas.style.objectFit = 'cover';
                    containerRef.current.appendChild(canvas);
                }

                // post processing
                // Note: WebGPURenderer uses RenderPipeline for TSL nodes
                renderPipeline = new THREE.RenderPipeline(renderer);

                const scenePass = pass(scene, camera);
                const scenePassColor = scenePass.getTextureNode('output');

                const bloomPass = bloom(scenePassColor, 0.8, 0.1, 1);

                renderPipeline.outputNode = scenePassColor.add(bloomPass);

                const animate = async () => {
                    if (renderPipeline) {
                        try {
                            await renderPipeline.render();
                        } catch (e) {
                            console.error("WebGPU rendering error:", e);
                        }
                    }
                    animationFrameId = requestAnimationFrame(animate);
                };

                renderer.init().then(() => {
                    animate();
                }).catch(err => {
                    console.error("Failed to init WebGPU renderer", err);
                });
            } else {
                console.error("WebGPU is not supported on this browser.");
            }
        };

        const onWindowResize = () => {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        init();
        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (renderer) {
                if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
                    containerRef.current.removeChild(renderer.domElement);
                }
                renderer.dispose();
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{
                mixBlendMode: 'screen',
                opacity: 0.8
            }}
        />
    );
};
