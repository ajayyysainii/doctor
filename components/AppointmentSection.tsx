"use client";

import React from 'react';
import { ChevronDown, Calendar, Clock } from 'lucide-react';
import { appointmentContent } from '@/utils/siteData';

export default function AppointmentSection() {
  return (
    <section id="contact" className="w-full py-24 bg-white font-sans scroll-mt-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch">
          
          {/* Left Column: Form */}
          <div className="flex-1 bg-[#f0f6fa] rounded-[2.5rem] p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-[3rem] font-black text-black mb-10 tracking-tight leading-tight">
              {appointmentContent.headline}
            </h2>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              
              {/* Choose Doctor */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900 tracking-wide">
                  Choose Doctor
                </label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none bg-white rounded-xl px-5 py-4 text-gray-600 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#008de4]/30 cursor-pointer shadow-sm border border-transparent focus:border-[#008de4]/50 transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled hidden>Select a Doctor</option>
                    {appointmentContent.doctors.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Your Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900 tracking-wide">
                  Your Name
                </label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white rounded-xl px-5 py-4 text-gray-800 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#008de4]/30 shadow-sm border border-transparent focus:border-[#008de4]/50 transition-all placeholder:text-gray-300"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900 tracking-wide">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  placeholder={appointmentContent.phonePlaceholder}
                  className="w-full bg-white rounded-xl px-5 py-4 text-gray-800 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#008de4]/30 shadow-sm border border-transparent focus:border-[#008de4]/50 transition-all placeholder:text-gray-300"
                />
              </div>

              {/* Date and Time Group */}
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Select Date */}
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-sm font-semibold text-gray-900 tracking-wide">
                    Select Date
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="dd/mm/yyyy"
                      className="w-full bg-white rounded-xl pl-5 pr-12 py-4 text-gray-800 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#008de4]/30 shadow-sm border border-transparent focus:border-[#008de4]/50 transition-all placeholder:text-gray-400"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                      <Calendar className="w-[18px] h-[18px]" />
                    </div>
                  </div>
                </div>

                {/* Select Time */}
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-sm font-semibold text-gray-900 tracking-wide">
                    Select Time
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="--:-- --"
                      className="w-full bg-white rounded-xl pl-5 pr-12 py-4 text-gray-800 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#008de4]/30 shadow-sm border border-transparent focus:border-[#008de4]/50 transition-all placeholder:text-gray-400"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                      <Clock className="w-[18px] h-[18px]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="mt-4 w-full bg-[#008de4] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-blue-600 hover:-translate-y-[2px] transition-all shadow-[0_10px_20px_rgba(0,141,228,0.25)]"
              >
                {appointmentContent.ctaLabel}
              </button>
              
            </form>
          </div>

          {/* Right Column: Image */}
          <div className="flex-1 w-full relative min-h-[500px] lg:min-h-auto">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-xl">
              <img 
                src="/appointment-doctor.png" 
                alt="Doctor writing on clipboard" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -z-10 -bottom-8 -right-8 w-[200px] h-[200px] bg-blue-100/50 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
