import React from "react";
import { ArrowUpRight } from "lucide-react";
import { servicesHighlights } from "@/utils/siteData";

export default function ServicesHighlightStrip() {
  return (
    <section className="w-full py-6 sm:py-8 font-sans">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {servicesHighlights.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group relative block h-[190px] sm:h-[210px] overflow-hidden rounded-[20px]"
              aria-label={item.title}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <h3 className="text-white text-2xl sm:text-[38px] leading-[0.95] font-black tracking-tight max-w-[85%]">
                  {item.title}
                </h3>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
