"use client";

import React, { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { painAreasContent } from "@/utils/siteData";

export default function PainAreasSection() {
  const [activeAreaId, setActiveAreaId] = useState<string>(
    painAreasContent.areas[0]?.id ?? "spine"
  );

  const activeArea = useMemo(
    () =>
      painAreasContent.areas.find((area) => area.id === activeAreaId) ??
      painAreasContent.areas[0],
    [activeAreaId]
  );

  return (
    <section className="w-full bg-white py-14 sm:py-18 lg:py-24 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1400px]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.05] mb-8 sm:mb-10 lg:mb-12">
          {painAreasContent.titleStart} <br />
          experiencing <span className="text-[#008de4]">{painAreasContent.titleHighlight}</span>
          {painAreasContent.titleEnd}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-start">
          <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
            {painAreasContent.areas.map((area, index) => {
              const isActive = area.id === activeArea?.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setActiveAreaId(area.id)}
                  className={[
                    "w-full flex items-center justify-between gap-3 px-4 sm:px-5 lg:px-6 py-3.5 sm:py-4 text-left transition-colors",
                    isActive
                      ? "bg-linear-to-r from-[#0079c7] to-[#008de4] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50",
                    index !== painAreasContent.areas.length - 1 ? "border-b border-gray-200" : "",
                  ].join(" ")}
                >
                  <span className="font-semibold text-base sm:text-lg">{area.label}</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                </button>
              );
            })}
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:p-7">
            <h3 className="text-[#008de4] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
              {activeArea?.label}
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-gray-700 text-[15px] sm:text-base lg:text-lg leading-snug">
              {activeArea?.symptoms.map((symptom) => (
                <li key={symptom} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-700 shrink-0" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
