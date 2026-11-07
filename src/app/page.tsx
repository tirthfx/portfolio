import ShapeHero, { type HeroShape } from "@/components/kokonutui/shape-hero";
import { cn } from "@/lib/utils";

// Blank shapes in paper colors. No text until Tirth approves copy.
const SOLID = "bg-ink";
const OUTLINE = "border-2 border-ink-soft/35 bg-paper-2";
const ACCENT = "bg-accent-ink";
const pill = (w: string) => cn("h-14", w);

const SHAPES: HeroShape[] = [
  { id: "p1", className: cn(pill("w-44"), SOLID) },
  { id: "p2", className: cn(pill("w-36"), OUTLINE) },
  { id: "d1", className: cn("size-16", ACCENT) },
  { id: "p3", className: cn(pill("w-48"), OUTLINE) },
  { id: "p4", className: cn(pill("w-28"), ACCENT) },
  { id: "p5", className: cn(pill("w-40"), OUTLINE) },
  { id: "d2", className: cn("size-12", SOLID) },
  { id: "p6", className: cn(pill("w-56"), OUTLINE) },
  { id: "p7", className: cn(pill("w-40"), SOLID) },
  { id: "d3", className: cn("size-20", OUTLINE) },
  { id: "p8", className: cn(pill("w-36"), OUTLINE) },
  { id: "p9", className: cn(pill("w-24"), OUTLINE) },
  { id: "p10", className: cn(pill("w-32"), SOLID) },
  { id: "d4", className: cn("size-14", OUTLINE) },
  { id: "p11", className: cn(pill("w-44"), OUTLINE) },
  { id: "p12", className: cn(pill("w-36"), OUTLINE) },
  { id: "p13", className: cn(pill("w-40"), SOLID) },
  { id: "d5", className: cn("size-12", ACCENT) },
  { id: "p14", className: cn(pill("w-52"), OUTLINE) },
  { id: "p15", className: cn(pill("w-36"), OUTLINE) },
  { id: "d6", className: cn("size-16", SOLID) },
  { id: "p16", className: cn(pill("w-32"), OUTLINE) },
];

export default function Home() {
  return (
    <main>
      <ShapeHero
        as="p"
        title={null}
        description={null}
        actions={null}
        shapes={SHAPES}
        className="min-h-svh bg-transparent text-ink dark:bg-transparent dark:text-ink"
      />
    </main>
  );
}
