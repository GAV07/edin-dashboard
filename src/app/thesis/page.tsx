import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Investment Thesis | Investor Dashboard",
  description:
    "Edin Capital's investment thesis: human flourishing through integrated capital.",
};

const layers = [
  {
    name: "Elevators",
    description: "The multipliers that elevate human potential and enrich life",
    sectors: ["Frontier Tech", "Media & Entertainment", "Consumer Products"],
  },
  {
    name: "Equippers",
    description:
      "The stabilizing forces that expand capacity and increase resilience",
    sectors: [
      "Education & Workforce",
      "Hospitality & Community",
      "Manufacturing & Supply Chain",
    ],
  },
  {
    name: "Essentials",
    description: "The fundamentals that sustain people and communities",
    sectors: [
      "Health & Wellbeing",
      "Shelter & Safety",
      "Energy & Infrastructure",
    ],
  },
];

export default function ThesisPage() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 0.5rem)' }}>
      {/* Full-bleed background image */}
      <Image
        src="/images/tree-roots.jpg"
        alt=""
        fill
        className="object-cover"
        priority
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />

      {/* All content layered over the image */}
      <div className="relative z-10 h-full flex flex-col justify-center gap-10 px-8 max-w-6xl mx-auto">
        {/* Headline + description */}
        <div>
          <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60 border border-white/20 rounded-full px-3 py-1 mb-4">
            Investment Thesis
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-white leading-tight mb-4">
            Human
            <br />
            Flourishing
            <span className="text-goldenCircuit">.</span>
          </h1>
          <p className="text-base text-white/75 leading-relaxed max-w-lg">
            We invest in companies that build novel, robust, scalable solutions
            contributing to the full spectrum of human flourishing.
          </p>
        </div>

        {/* Three layers */}
        <div>
          <p className="text-[10px] text-white/50 uppercase tracking-[0.15em] font-medium mb-3">
            Organized across three layers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {layers.map((layer) => (
              <div
                key={layer.name}
                className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 p-5"
              >
                <h3 className="text-sm font-semibold text-white mb-1">
                  {layer.name}
                </h3>
                <p className="text-xs text-white/60 mb-3 leading-relaxed">
                  {layer.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {layer.sectors.map((sector) => (
                    <span
                      key={sector}
                      className="inline-block text-[11px] font-medium text-white/80 bg-white/10 border border-white/15 rounded-md px-2.5 py-1"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
