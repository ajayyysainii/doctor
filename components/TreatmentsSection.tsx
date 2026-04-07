import React from "react";
import { ArrowUpRight } from "lucide-react";
import { treatmentsContent } from "@/utils/siteData";

export default function TreatmentsSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1400px]">
        <h2 className="text-center text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black mb-8 sm:mb-12">
          {treatmentsContent.title}
        </h2>

        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {treatmentsContent.items.map((item, index) => {
            const imageFirst = index % 2 === 0;
            return (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-4 sm:gap-5 lg:gap-6 items-stretch"
              >
                {imageFirst ? (
                  <>
                    <TreatmentImagePanel item={item} />
                    <TreatmentTextCard item={item} />
                  </>
                ) : (
                  <>
                    <TreatmentTextCard item={item} />
                    <TreatmentImagePanel item={item} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TreatmentImagePanel({ item }: { item: (typeof treatmentsContent.items)[number] }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 min-h-[260px] sm:min-h-[300px]">
      <div className="relative overflow-hidden rounded-2xl">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        <div className="absolute inset-x-0 bottom-4 flex justify-center px-4">
          <span className="rounded-full bg-[#b1161a] px-4 py-1.5 text-white font-semibold text-sm sm:text-base leading-none">
            {item.label}
          </span>
        </div>
      </div>

      <div className="hidden sm:flex gap-2.5">
        {item.stripImages.map((img, idx) => (
          <div key={`${item.id}-${idx}`} className="w-7 md:w-8 lg:w-10 overflow-hidden rounded-xl">
            <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TreatmentTextCard({ item }: { item: (typeof treatmentsContent.items)[number] }) {
  return (
    <div className="rounded-2xl bg-[#fcf9f9] border border-[#efe8e8] p-5 sm:p-6 lg:p-7 flex flex-col">
      <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-black leading-[1.05] mb-3">{item.title}</h3>
      <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed mb-4">{item.description}</p>

      <ul className="space-y-1.5 text-[13px] sm:text-[14px] text-gray-800 mb-5">
        {item.points.map((point) => (
          <li key={point} className="flex items-start gap-2">
            <span className="mt-[0.35rem] h-1.5 w-1.5 rounded-full bg-[#b1161a] shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-auto ml-auto h-12 w-12 rounded-full bg-linear-to-br from-[#7f0f13] to-[#b1161a] text-white grid place-items-center hover:scale-105 transition-transform"
        aria-label={`Explore ${item.title}`}
      >
        <ArrowUpRight className="w-5 h-5" />
      </button>
    </div>
  );
}
