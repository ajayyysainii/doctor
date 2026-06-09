"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ArrowUpRight, Star } from 'lucide-react';
import { clinic, heroContent, footerContent } from '@/utils/siteData';
import { BOOK_PATH } from '@/utils/siteUrl';

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      id="home"
      className="relative min-h-[90vh] w-full flex flex-col overflow-hidden bg-[#031d2e] font-sans scroll-mt-0"
    >

      {/* ── Slide-out Drawer Overlay ─────────────────────────────── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-90 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-[380px] bg-[#031d2e] z-[100] flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center bg-white/20 rounded-md">
              <div className="w-5 h-5 border-[3px] border-white border-t-transparent rounded-full rotate-45 relative flex items-center justify-center">
                <div className="absolute w-1.5 h-3 bg-white rotate-45 rounded-sm" />
              </div>
            </div>
            <span className="text-white font-extrabold text-lg leading-tight">
              {clinic.nameShort ?? clinic.name}
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex flex-col px-8 py-8 gap-1 flex-1">
          {footerContent.navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[17px] font-semibold text-white/80 hover:text-white hover:pl-2 transition-all duration-200 py-3.5 border-b border-white/5 flex items-center justify-between group"
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
            >
              {link.label}
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="px-8 py-8 border-t border-white/10 flex flex-col gap-4">
          <a
            href={`tel:${clinic.phone}`}
            className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            <Phone className="w-4 h-4 fill-current" />
            {clinic.phone}
          </a>
          <Link
            href={BOOK_PATH}
            onClick={() => setMenuOpen(false)}
            className="w-full bg-[#008de4] text-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-blue-500 transition-colors shadow-lg text-center"
          >
            Book Appointment
          </Link>
        </div>
      </div>
      {/* ── End Drawer ───────────────────────────────────────────── */}

      {/* Top Navigation */}
      <nav className="absolute top-0 w-full px-6 py-6 flex justify-between items-center z-50">

        {/* Mobile: Hamburger button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden bg-white px-5 py-2.5 rounded-md font-bold text-sm flex items-center gap-2 shadow-lg hover:bg-gray-50 transition-colors text-[#008de4]"
        >
          MENU <Menu className="w-5 h-5" />
        </button>

        {/* Desktop: Horizontal nav links */}
        <div className="hidden md:flex items-center gap-1">
          {footerContent.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* Right Nav */}
        <div className="hidden sm:flex items-center gap-6">
          <a
            href={`tel:${clinic.phone}`}
            className="flex items-center text-white gap-2 font-semibold hover:text-gray-200 transition-colors"
          >
            <Phone className="w-5 h-5 fill-white" />
            Call Us
          </a>
          <Link
            href={BOOK_PATH}
            className="bg-[#008de4] text-white px-6 py-2.5 rounded-sm font-bold text-sm shadow-lg hover:bg-blue-500 transition-colors"
          >
            LET&apos;S CONSULT
          </Link>
        </div>
      </nav>

      {/* Hero Content Area */}
      <div className="flex-1 w-full relative flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#021825] via-[#021825]/90 to-[#021825]/30 mix-blend-multiply" />
        <div className="absolute inset-0 z-0 opacity-15" style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
        }} />
        
        {/* Floating Contact Card */}
        <div className="hidden lg:flex absolute left-[8%] top-[15%] bg-white rounded-2xl p-3 items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] -rotate-6 transform hover:rotate-0 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] z-20 cursor-default">
          <div className="w-12 h-12 rounded-full bg-[#008de4] flex items-center justify-center text-white shrink-0 shadow-inner">
            <Phone className="w-6 h-6 fill-current" />
          </div>
          <div className="pr-2">
            <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">{clinic.phone}</h3>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">24/7 Emergency Services</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="container mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 pt-24 pb-32 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col items-start pt-16">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white leading-[1.05] mb-10 tracking-tight drop-shadow-lg">
              {heroContent.headline.split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
              ))}
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center w-full sm:w-auto">
              <Link
                href={BOOK_PATH}
                className="bg-[#008de4] text-white px-8 py-4 rounded font-bold hover:bg-blue-500 hover:-translate-y-1 transition-all shadow-[0_10px_20px_rgba(0,141,228,0.3)] w-full sm:w-auto text-center"
              >
                {heroContent.ctaPrimary}
              </Link>
              <a
                href="#services"
                className="bg-white/5 border border-white/20 backdrop-blur-md text-white px-8 py-4 rounded font-bold flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 transition-all w-full sm:w-auto"
              >
                {heroContent.ctaSecondary} <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </a>
            </div>
          </div>

          {/* Right Column Info Box */}
          <div className="flex items-end justify-start lg:justify-end h-full">
            <div className="mt-12 lg:mt-56 max-w-lg lg:max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl hover:bg-white/10 transition-colors">
              <p className="text-gray-100 text-[17px] mb-8 leading-relaxed font-medium">
                {heroContent.subtext}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                {/* Rating */}
                <div>
                  <div className="flex gap-1.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                    ))}
                  </div>
                  <div className="font-extrabold text-[#008de4] text-5xl flex items-baseline drop-shadow-sm">
                    {heroContent.rating}<span className="text-xl text-gray-300 font-semibold ml-1">/{heroContent.ratingMax}</span>
                  </div>
                </div>

                <div className="hidden sm:block h-16 w-px bg-white/20"></div>

                {/* Avatars */}
                <div>
                  <div className="flex -space-x-3 mb-3">
                    <img className="w-12 h-12 rounded-full border-[3px] border-[#031d2e] object-cover shadow-md" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" alt="Patient 1" />
                    <img className="w-12 h-12 rounded-full border-[3px] border-[#031d2e] object-cover shadow-md" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150" alt="Patient 2" />
                    <img className="w-12 h-12 rounded-full border-[3px] border-[#031d2e] object-cover shadow-md" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150" alt="Patient 3" />
                    <div className="w-12 h-12 rounded-full border-[3px] border-[#021825] bg-[#008de4] flex items-center justify-center text-white font-bold text-xl shadow-md transform hover:scale-110 transition-transform cursor-pointer">
                      +
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-200">Trusted by <span className="font-bold text-white">{heroContent.trustedCount}</span> Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkered Bottom Border */}
      <div 
        className="h-[20px] w-full z-20 relative shadow-[0_-5px_15px_rgba(0,0,0,0.2)]" 
        style={{ 
          backgroundImage: `repeating-linear-gradient(to right, white 0, white 24px, #1a1a1a 24px, #1a1a1a 48px)` 
        }} 
      />
    </div>
  );
}
