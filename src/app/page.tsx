"use client";

import { useRef } from "react";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import OurServices from "@/components/OurServices";

export default function Home() {
  const servicesRef = useRef<HTMLDivElement>(null);

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        <InteractiveBackground />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-gradient text-shadow-sm pb-4">
            Iterative Edge
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mb-8 text-gray-300 text-center">
            Transforming ideas into exceptional software solutions through innovative development and strategic iteration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button 
              onClick={scrollToServices}
              className="btn btn-primary btn-lg relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] active:scale-95"
            >
              <span className="relative z-10">Our Services</span>
              <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
            </button>
            
            <button className="btn btn-outline btn-lg relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] active:scale-95">
              <span className="relative z-10">Contact Us</span>
              <span className="absolute inset-0 bg-primary/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef}>
        <OurServices />
      </div>
    </main>
  );
}
