import React from 'react';
import Link from 'next/link';
import { clinic, footerContent } from '@/utils/siteData';
import { BOOK_PATH } from '@/utils/siteUrl';

function SocialIcon({ platform }: { platform: string }) {
  const className = "w-10 h-10 fill-current text-[#008de4] group-hover:text-white transition-colors";

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }

  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full pb-12 pt-6 bg-white font-sans">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] flex flex-col gap-6">
        
        {/* Top CTA Banner */}
        <div className="bg-[#f2f8fc] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <h2 className="text-2xl sm:text-[28px] font-black tracking-tight text-gray-900 uppercase">
            {footerContent.ctaBanner}
          </h2>
          <Link
            href={BOOK_PATH}
            className="bg-[#008de4] text-white px-8 py-3.5 rounded-xl font-bold text-[15px] hover:bg-blue-600 transition-colors whitespace-nowrap shadow-md"
          >
            {footerContent.ctaButton}
          </Link>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* Logo Block (Left) */}
          <div className="w-full lg:w-[32%] bg-[#008de4] rounded-3xl p-12 flex items-center justify-center min-h-[300px]">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="text-white text-4xl font-extrabold flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-md backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                   <div className="w-7 h-7 border-[5px] border-white border-t-transparent rounded-full rotate-45 flex items-center justify-center relative">
                     <div className="absolute w-2.5 h-4 bg-white rotate-45 rounded-sm" />
                   </div>
                </div>
                {clinic.name}
              </div>
            </div>
          </div>

          {/* Nav & Newsletter Block (Right) */}
          <div className="flex-1 bg-[#f2f8fc] rounded-3xl p-10 sm:p-12 flex flex-col justify-between min-h-[300px]">
            
            {/* Top Half of Right Block */}
            <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
              <div className="max-w-xs">
                <p className="text-gray-900 text-sm font-medium leading-relaxed">
                  {footerContent.clinicDescription}
                </p>
              </div>

              <div className="w-full max-w-md">
                <h4 className="text-gray-900 text-lg font-bold mb-5 tracking-tight">
                  {footerContent.newsletterHeading.split('\n').map((line, i) => (
                    <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                  ))}
                </h4>
                <div className="flex flex-col gap-2">
                  <input 
                    type="email" 
                    placeholder="Your Email*"
                    className="flex-1 bg-white rounded-xl px-5 py-3.5 text-[15px] font-medium outline-none focus:ring-2 focus:ring-[#008de4]/30 placeholder:text-gray-400 border border-transparent focus:border-[#008de4]/30"
                  />
                  <button className="bg-[#008de4] text-white px-8 py-3.5 rounded-xl font-bold text-[15px] hover:bg-blue-600 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Half of Right Block (Links) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 text-[13px] font-semibold text-gray-800">
              <div className="flex flex-col gap-6">
                <nav className="flex gap-6 sm:gap-8 flex-wrap">
                  {footerContent.navLinks.map((link) => (
                    <a key={link.href} href={link.href} className="hover:text-[#008de4] transition-colors">
                      {link.label}
                    </a>
                  ))}
                </nav>
                <div className="font-medium text-gray-500">
                  {clinic.copyright}
                </div>
              </div>

              <nav className="flex gap-6 sm:gap-8 flex-wrap">
                {footerContent.legalLinks.map((link) => (
                  <a key={link} href="#" className="text-gray-500 hover:text-[#008de4] transition-colors">{link}</a>
                ))}
              </nav>
            </div>
            
          </div>
        </div>

        {/* Bottom Social Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-2">
          {footerContent.socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="bg-[#f2f8fc] rounded-3xl py-8 px-4 flex flex-col items-center justify-center gap-3 group hover:bg-[#008de4] transition-colors hover:shadow-lg"
            >
              <SocialIcon platform={link.platform} />
              {"tag" in link && link.tag && (
                <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500 group-hover:text-white/90 transition-colors">
                  {link.tag}
                </span>
              )}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
