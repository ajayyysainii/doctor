"use client";

import { useEffect, useRef } from "react";
import type { ModelViewerElement } from "@google/model-viewer";
import { painAreasContent } from "@/utils/siteData";

type SkeletonModelViewerProps = {
  activeAreaId: string;
  onAreaSelect: (areaId: string) => void;
};

export default function SkeletonModelViewer({
  activeAreaId,
  onAreaSelect,
}: SkeletonModelViewerProps) {
  const viewerRef = useRef<ModelViewerElement>(null);

  useEffect(() => {
    void import("@google/model-viewer");
  }, []);

  // No camera manipulation on area change — hotspots track the 3D surface natively

  return (
    <div className="skeleton-viewer-wrap relative w-full h-full min-h-[550px] rounded-2xl border border-gray-200 bg-linear-to-b from-slate-50 to-white">
      <model-viewer
        ref={viewerRef}
        src={painAreasContent.skeletonModel}
        camera-controls
        touch-action="none"
        auto-rotate
        auto-rotate-delay="2000"
        rotation-per-second="12deg"
        alt="Interactive human skeleton — select a body area"
        shadow-intensity="0.85"
        exposure="1.05"
        interaction-prompt="none"
        camera-orbit="0deg 78deg 105%"
        min-camera-orbit="auto 78deg 105%"
        max-camera-orbit="auto 78deg 105%"
        className="skeleton-model-viewer"
      >
        {painAreasContent.areas.map((area) => {
          const isActive = area.id === activeAreaId;
          return (
            <button
              key={area.id}
              slot={`hotspot-${area.id}`}
              type="button"
              data-position={area.hotspot.position}
              data-normal={area.hotspot.normal}
              data-visibility-attribute="visible"
              className={isActive ? "Hotspot is-active" : "Hotspot"}
              aria-label={`${area.label} pain area`}
              aria-pressed={isActive}
              onClick={() => onAreaSelect(area.id)}
            >
              <span className="HotspotAnnotation">{area.label}</span>
            </button>
          );
        })}
      </model-viewer>
      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-gray-500 px-4">
        Drag to spin · Tap a hotspot to explore symptoms
      </p>
    </div>
  );
}
