import React from 'react';
import { doctor, aboutContent } from '@/utils/siteData';

export default function AboutSection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-white overflow-hidden font-sans">
      {/* Background Decoration */}
      <div className="absolute -left-[20%] top-1/4 w-[50%] h-[150%] opacity-[0.03] pointer-events-none -rotate-12 flex justify-center items-center">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-gray-900" preserveAspectRatio="none">
          <path d="M0,50 Q25,0 50,50 T100,50 L100,60 Q75,10 50,60 T0,60 Z" />
          <path d="M0,70 Q25,20 50,70 T100,70 L100,80 Q75,30 50,80 T0,80 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          
          {/* Left Column Text Content */}
          <div className="flex flex-col items-start pt-8">
            {/* Small Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 flex items-center justify-center relative bg-linear-to-br from-[#008de4] to-blue-600 rounded-sm shadow-md">
                <div className="absolute w-[3px] h-[12px] bg-white rounded-full"></div>
                <div className="absolute w-[12px] h-[3px] bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-bold tracking-[0.2em] text-gray-800 uppercase">
                {aboutContent.sectionLabel}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[70px] font-black text-black mb-8 tracking-tighter leading-[1.1]">
              Discover <span className="text-[#008de4]">{aboutContent.headlineHighlight}</span>
            </h2>

            <p className="text-gray-600 text-lg sm:text-[19px] leading-[1.8] mb-10 font-medium max-w-2xl">
              {aboutContent.description}
            </p>

            <button className="bg-black text-white px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mb-14 border border-black/10">
              MORE ABOUT US
            </button>

            <div className="w-full h-px bg-gray-200 mb-12"></div>

            {/* Two columns text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-14 w-full">
              {aboutContent.features.map((f, i) => (
                <div key={i}>
                  <h4 className="font-bold text-gray-900 text-xl mb-3">{f.title}</h4>
                  <p className="text-gray-500 text-base leading-relaxed font-medium">{f.description}</p>
                </div>
              ))}
            </div>

            {/* Bottom banner block */}
            <div className="bg-[#008de4] rounded-[24px] p-5 sm:p-6 lg:p-5 xl:p-6 flex flex-col sm:flex-row items-center justify-between w-full max-w-[650px] gap-6 shadow-[0_20px_40px_rgba(0,141,228,0.2)] hover:shadow-[0_25px_50px_rgba(0,141,228,0.3)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              {/* Subtle background glow element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 transition-opacity"></div>

              <div className="flex items-center gap-5 relative z-10 w-full sm:w-auto">
                <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden border-2 border-white/20 shrink-0 shadow-inner">
                  <img 
                    src="/doctor/headshot.png"
                    alt={doctor.name}
                    className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h5 className="text-white font-bold text-[20px] mb-0.5">{doctor.shortName}</h5>
                  <p className="text-blue-100 text-[15px] font-medium tracking-wide">{doctor.specialization}</p>
                </div>
              </div>
              
              <button className="bg-white text-[#008de4] w-full sm:w-auto px-8 py-3.5 rounded-[14px] font-bold text-[15px] hover:bg-gray-50 hover:shadow-md transition-all duration-300 relative z-10">
                Book An Appointment
              </button>
            </div>
          </div>

          {/* Right Column Image */}
          <div className="w-full h-[600px] lg:h-[800px] relative mt-8 lg:mt-0 px-2 lg:px-0">
            <div className="absolute inset-0 rounded-[48px] overflow-hidden shadow-2xl bg-gray-100">
              <img 
                src="/doctor/profile.png" 
                alt={`${doctor.name} — ${doctor.specialization}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[radial-gradient(#008de4_3px,transparent_3px)] bg-size-[24px_24px] -z-10 opacity-30 rounded-full animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute top-1/4 -left-12 w-32 h-32 bg-blue-100 opacity-60 rounded-full blur-3xl -z-10"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
