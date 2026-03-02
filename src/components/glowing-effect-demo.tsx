"use client";

import React from "react";
import { GlowingEffect } from "@/src/components/ui/glowing-effect";

export default function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        image="https://picsum.photos/seed/prayan1/800/600"
      />

      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        image="https://picsum.photos/seed/prayan2/800/600"
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        image="https://picsum.photos/seed/prayan3/800/1000"
      />

      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        image="https://picsum.photos/seed/prayan4/800/600"
      />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        image="https://picsum.photos/seed/prayan5/1200/600"
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  image: string;
}

const GridItem = ({ area, image }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl md:rounded-3xl p-[1px] group overflow-hidden bg-neon-red/10 border border-neon-red/20 shadow-[0_0_20px_rgba(255,0,60,0.1)] transition-all duration-500 hover:border-neon-red/50 hover:shadow-[0_0_30px_rgba(255,0,60,0.3)]">
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
          <img
            src={image}
            alt="Highlight"
            className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
      </div>
    </li>
  );
};
