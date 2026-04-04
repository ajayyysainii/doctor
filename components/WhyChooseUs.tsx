import React from 'react';
import { Stethoscope, HandHeart, Dna, Microscope } from 'lucide-react';
import { whyChooseUsContent } from '@/utils/siteData';

const iconMap: Record<string, React.ReactNode> = {
  stethoscope: <Stethoscope className="w-10 h-10 text-[#008de4] stroke-[1.5]" />,
  'hand-heart': <HandHeart className="w-10 h-10 text-[#008de4] stroke-[1.5]" />,
  dna: <Dna className="w-10 h-10 text-[#008de4] stroke-[1.5]" />,
  microscope: <Microscope className="w-10 h-10 text-[#008de4] stroke-[1.5]" />,
};

export default function WhyChooseUs() {
  return (
    <section id="services" className="w-full py-24 sm:py-32 bg-white font-sans scroll-mt-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
        
        {/* Top Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-24 gap-8">
          <div className="max-w-2xl">
            {/* Small Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 flex items-center justify-center relative bg-linear-to-br from-[#008de4] to-blue-600 rounded-sm shadow-md">
                <div className="absolute w-[3px] h-[12px] bg-white rounded-full"></div>
                <div className="absolute w-[12px] h-[3px] bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-bold tracking-[0.2em] text-gray-800 uppercase">
                {whyChooseUsContent.sectionLabel}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tighter leading-[1.1]">
              {whyChooseUsContent.headline}
            </h2>
          </div>

          <div className="max-w-md lg:pb-3">
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed font-medium">
              {whyChooseUsContent.subtext}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="w-full border border-gray-200 rounded-4xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {whyChooseUsContent.features.map((feature, index) => (
              <div 
                key={index} 
                className="p-10 sm:p-12 flex flex-col items-start hover:bg-gray-50 transition-colors duration-300 group"
              >
                <div className="mb-8 p-4 bg-blue-50/50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {iconMap[feature.iconKey]}
                </div>
                <h4 className="font-bold text-gray-900 text-[22px] mb-4 tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-gray-500 text-base leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
