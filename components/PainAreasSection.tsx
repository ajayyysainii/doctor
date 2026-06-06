"use client";

import React, { useMemo, useState } from "react";
import { painAreasContent } from "@/utils/siteData";
import SkeletonModelViewer from "@/components/SkeletonModelViewer";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          <SkeletonModelViewer
            activeAreaId={activeAreaId}
            onAreaSelect={setActiveAreaId}
          />
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:p-7 flex flex-col">
            <h3 className="text-[#008de4] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
              {activeArea?.label}
            </h3>
            <ul className="space-y-2 sm:space-y-2.5 text-gray-700 text-[15px] sm:text-base lg:text-lg leading-snug flex-1">
              {activeArea?.symptoms.map((symptom) => (
                <li key={symptom} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-700 shrink-0" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {painAreasContent.areas.map((area) => {
                const isActive = area.id === activeAreaId;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setActiveAreaId(area.id)}
                    className={[
                      "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#008de4] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                    ].join(" ")}
                  >
                    {area.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
