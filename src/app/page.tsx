"use client";

import InteractiveBackground from "@/components/ui/InteractiveBackground";
import {Button} from "@chakra-ui/react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <InteractiveBackground />
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center py-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-gradient text-shadow-sm pb-4">
            Iterative Edge
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mb-8 text-gray-300">
            Transforming ideas into exceptional software solutions through innovative development and strategic iteration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="px-8 py-4 rounded-full font-medium border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors">
              Our Services
            </button>
            <button className="px-8 py-4 rounded-full font-medium border-2 border-white/30 text-white hover:bg-white/10 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
