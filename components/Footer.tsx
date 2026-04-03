import React from 'react';
import { clinic, footerContent } from '@/utils/siteData';

export default function Footer() {
  return (
    <footer className="w-full pb-12 pt-6 bg-white font-sans">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1400px] flex flex-col gap-6">
        
        {/* Top CTA Banner */}
        <div className="bg-[#f2f8fc] rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <h2 className="text-2xl sm:text-[28px] font-black tracking-tight text-gray-900 uppercase">
            {footerContent.ctaBanner}
          </h2>
          <button className="bg-[#008de4] text-white px-8 py-3.5 rounded-xl font-bold text-[15px] hover:bg-blue-600 transition-colors whitespace-nowrap shadow-md">
            {footerContent.ctaButton}
          </button>
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
                <div className="flex gap-2">
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
                    <a key={link} href="#" className="hover:text-[#008de4] transition-colors">{link}</a>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-2">
          {/* X / Twitter */}
          <a href={footerContent.socialLinks.twitter} className="bg-[#f2f8fc] rounded-3xl py-10 flex items-center justify-center group hover:bg-[#008de4] transition-colors hover:shadow-lg">
            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-[#008de4] group-hover:text-white transition-colors">
               <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          
          {/* LinkedIn */}
          <a href={footerContent.socialLinks.linkedin} className="bg-[#f2f8fc] rounded-3xl py-10 flex items-center justify-center group hover:bg-[#008de4] transition-colors hover:shadow-lg">
            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-[#008de4] group-hover:text-white transition-colors">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          
          {/* Dribbble */}
          <a href={footerContent.socialLinks.dribbble} className="bg-[#f2f8fc] rounded-3xl py-10 flex items-center justify-center group hover:bg-[#008de4] transition-colors hover:shadow-lg">
            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-[#008de4] group-hover:text-white transition-colors">
              <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.068-2.164-.99-4.22-2.617-5.836-1.57-1.554-3.66-2.482-5.918-2.628-.018 3.515-.365 7.41-1.168 11.233 2.193.593 4.54.912 6.942.946 1.488-.934 2.502-2.34 2.76-3.715zm-3.21 4.793c-2.3-.06-4.542-.367-6.666-.91-1.2 3.125-2.735 6.07-4.543 8.71 1.5.384 3.09.58 4.72.58 2.37 0 4.582-.693 6.49-1.9v-6.48zm-8.868 7.37c1.782-2.588 3.292-5.46 4.475-8.528-3.08-.85-6.3-1.282-9.593-1.282H4.66c-.198 1.485-.3 3.03-.3 4.605 0 2.455.772 4.73 2.08 6.58 1.15-1.114 2.434-2.227 3.86-3.375zm-7.662-5.617h3.766c3.122 0 6.225.38 9.208 1.13.785-3.8 1.12-7.674 1.134-11.165-.008-.008-.016-.017-.025-.025-2.68.817-5.502 1.258-8.384 1.306-2.784.05-5.5-.325-8.082-1.077C2.453 7.82 2 9.855 2 12c0 .736.068 1.454.195 2.15z"/>
            </svg>
          </a>
          
          {/* Facebook */}
          <a href={footerContent.socialLinks.facebook} className="bg-[#f2f8fc] rounded-3xl py-10 flex items-center justify-center group hover:bg-[#008de4] transition-colors hover:shadow-lg">
            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-[#008de4] group-hover:text-white transition-colors">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
}
