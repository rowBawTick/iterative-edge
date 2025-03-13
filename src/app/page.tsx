"use client";

import InteractiveBackground from "@/components/ui/InteractiveBackground";

export default function Home() {
  return (
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
          <button className="btn btn-primary btn-lg">Our Services</button>
          <button className="btn btn-outline btn-lg">Contact Us</button>
        </div>
      </div>
    </div>
  );
}
