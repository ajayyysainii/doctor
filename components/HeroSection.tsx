import React from 'react';
import { Menu, Phone, ArrowUpRight, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative min-h-[90vh] w-full flex flex-col overflow-hidden bg-[#031d2e] font-sans">
      {/* Top Navigation */}
      <nav className="absolute top-0 w-full px-6 py-6 flex justify-between items-center z-50">
        <button className="bg-white px-5 py-2.5 rounded-md font-bold text-sm flex items-center gap-2 shadow-lg hover:bg-gray-50 transition-colors">
          MENU <Menu className="w-5 h-5" />
        </button>
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="text-white text-3xl font-extrabold flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-md backdrop-blur-sm group-hover:bg-white/30 transition-colors">
               <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full rotate-45 flex items-center justify-center relative">
                 <div className="absolute w-2 h-4 bg-white rotate-45 rounded-sm" />
               </div>
            </div>
            Whhub
          </div>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-6 hidden sm:flex">
          <button className="flex items-center text-white gap-2 font-semibold hover:text-gray-200 transition-colors">
            <Phone className="w-5 h-5 fill-white" />
            Call Us
          </button>
          <button className="bg-[#008de4] text-white px-6 py-2.5 rounded-sm font-bold text-sm shadow-lg hover:bg-blue-500 transition-colors">
            LET'S TALK
          </button>
        </div>
      </nav>

      {/* Hero Content Area */}
      <div className="flex-1 w-full relative flex items-center">
        {/* Background Image Wrapper */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />

        {/* Dark Gradient Overlay & Graph Grid Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#021825] via-[#021825]/90 to-[#021825]/30 mix-blend-multiply" />
        <div className="absolute inset-0 z-0 opacity-15" style={{ 
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
        }} />
        
        {/* Floating Contact Card (Left) */}
        <div className="hidden lg:flex absolute left-[8%] top-[35%] bg-white rounded-2xl p-3 items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] -rotate-6 transform hover:rotate-0 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] z-20 cursor-default">
          <div className="w-12 h-12 rounded-full bg-[#008de4] flex items-center justify-center text-white shrink-0 shadow-inner">
            <Phone className="w-6 h-6 fill-current" />
          </div>
          <div className="pr-2">
            <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">123-456-7890</h3>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">24/7 Emergency Services</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="container mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 pt-24 pb-32 items-center">
          
          {/* Left Column Text */}
          <div className="flex flex-col items-start pt-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white leading-[1.05] mb-10 tracking-tight drop-shadow-lg">
              Together for <br /> Better Health
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center w-full sm:w-auto">
              <button className="bg-[#008de4] text-white px-8 py-4 rounded font-bold hover:bg-blue-500 hover:-translate-y-1 transition-all shadow-[0_10px_20px_rgba(0,141,228,0.3)] w-full sm:w-auto text-center">
                BOOK A CALL
              </button>
              <button className="bg-white/5 border border-white/20 backdrop-blur-md text-white px-8 py-4 rounded font-bold flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 transition-all w-full sm:w-auto">
                OUR SERVICES <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column Info Box */}
          <div className="flex items-end justify-start lg:justify-end h-full">
            <div className="mt-12 lg:mt-56 max-w-lg lg:max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl hover:bg-white/10 transition-colors">
              <p className="text-gray-100 text-[17px] mb-8 leading-relaxed font-medium">
                Providing world-class healthcare services with advanced facilities, expert doctors, and compassionate care.
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
                    4.9<span className="text-xl text-gray-300 font-semibold ml-1">/4.9</span>
                  </div>
                </div>

                <div className="hidden sm:block h-16 w-px bg-white/20"></div>

                {/* Avatars */}
                <div>
                  <div className="flex -space-x-3 mb-3">
                    <img className="w-12 h-12 rounded-full border-[3px] border-[#031d2e] object-cover shadow-md" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" alt="Avatar 1" />
                    <img className="w-12 h-12 rounded-full border-[3px] border-[#031d2e] object-cover shadow-md" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150" alt="Avatar 2" />
                    <img className="w-12 h-12 rounded-full border-[3px] border-[#031d2e] object-cover shadow-md" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150" alt="Avatar 3" />
                    <div className="w-12 h-12 rounded-full border-[3px] border-[#021825] bg-[#008de4] flex items-center justify-center text-white font-bold text-xl shadow-md transform hover:scale-110 transition-transform cursor-pointer">
                      +
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-200">Trusted by <span className="font-bold text-white">500+</span> Brands Globally</p>
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
