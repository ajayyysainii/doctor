import React from "react";
import Marquee from "react-fast-marquee";
import { clinic } from "@/utils/siteData";

const CLINIC_IMAGES = [
  { src: "/clinic/clinic.png", alt: `${clinic.name} — clinic interior` },
  { src: "/clinic/clinic2.png", alt: `${clinic.name} — facility` },
  { src: "/clinic/clinic3.png", alt: `${clinic.name} — care environment` },
  { src: "/clinic/clinic4.png", alt: `${clinic.name} — medical facility` },
  { src: "/clinic/clinic5.png", alt: `${clinic.name} — clinic space` },
] as const;

export default function ClinicMarquee() {
  return (
    <section
      className="relative w-full max-w-full min-w-0 overflow-hidden py-14 sm:py-20 font-sans"
      aria-label="Clinic photos"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] mb-10 sm:mb-12">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center relative bg-linear-to-br from-[#008de4] to-blue-600 rounded-sm shadow-md shrink-0">
            <div className="absolute w-[3px] h-[12px] bg-white rounded-full" />
            <div className="absolute w-[12px] h-[3px] bg-white rounded-full" />
          </div>
          <span className="text-sm font-bold tracking-[0.2em] text-gray-800 uppercase">
            Our facilities
          </span>
        </div>
        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-black text-black tracking-tight leading-tight">
          Inside{" "}
          <span className="text-[#008de4]">
            {clinic.name}
          </span>
        </h2>
        <p className="text-gray-600 text-sm">
          {clinic.address}
        </p>
      </div>

      <div className="w-full max-w-full min-w-0 overflow-hidden">
        <Marquee
          speed={45}
          gradient
          gradientColor="#f4f9fd"
          gradientWidth={72}
          pauseOnHover
          className="max-w-full overflow-hidden py-2"
        >
          {CLINIC_IMAGES.map((img) => (
            <div
              key={img.src}
              className="relative h-[200px] w-[min(78vw,340px)] sm:h-[240px] sm:w-[380px] shrink-0 overflow-hidden rounded-[24px] mx-3 sm:mx-4 ring-1 ring-black/4"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
