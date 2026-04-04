import React from 'react';
import { Star, Quote } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import { testimonials } from '@/utils/siteData';

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 sm:py-32 bg-white overflow-hidden font-sans">

      <div className="container mx-auto px-6 lg:px-12 mb-16 text-center max-w-3xl">
        {/* Small Header */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="w-6 h-6 flex items-center justify-center relative bg-linear-to-br from-[#008de4] to-blue-600 rounded-sm shadow-md">
            <div className="absolute w-[3px] h-[12px] bg-white rounded-full"></div>
            <div className="absolute w-[12px] h-[3px] bg-white rounded-full"></div>
          </div>
          <span className="text-sm font-bold tracking-[0.2em] text-gray-800 uppercase">
            Testimonials
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-black tracking-tight leading-[1.1]">
          Comprehensive Health <br /> Care Testimonials
        </h2>
      </div>

      {/* react-fast-marquee — wrapper clips horizontal track */}
      <div className="w-full overflow-hidden">
        <Marquee
          speed={50}
          gradient={true}
          gradientColor="white"
          gradientWidth={80}
          pauseOnHover={true}
          className="py-4"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>

    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="w-[85vw] sm:w-[400px] flex flex-col p-8 sm:p-10 bg-[#f4f9fd] rounded-[32px] mx-4 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,141,228,0.15)] border border-transparent hover:border-blue-100 group cursor-default">
      {/* Header: Avatar & Quote */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-12 h-12 bg-[#008de4] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Quote className="w-5 h-5 text-white fill-current" />
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-[22px] h-[22px] text-[#008de4] fill-[#008de4]" />
        ))}
      </div>

      {/* Text Body */}
      <p className="text-gray-600 text-[16px] leading-[1.8] font-medium mb-10 flex-1">
        "{testimonial.text}"
      </p>

      {/* Signature & Role */}
      <div className="mt-auto">
        <svg className="w-24 h-12 mb-2 text-gray-400 stroke-current" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 40C20 30 15 10 30 20C45 30 35 45 50 40C65 35 60 15 75 25C90 35 85 45 95 30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="text-gray-900 text-sm font-bold tracking-wide">{testimonial.name}</p>
        <p className="text-gray-500 text-xs font-semibold tracking-wide mt-0.5">{testimonial.role}</p>
      </div>
    </div>
  );
}
