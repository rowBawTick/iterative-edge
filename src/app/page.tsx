"use client";

import { useRef } from "react";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import OurServices from "@/components/OurServices";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

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
            <PrimaryButton onClick={scrollToServices}>
              Our Services
            </PrimaryButton>
            
            <SecondaryButton>
              Contact Us
            </SecondaryButton>
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
