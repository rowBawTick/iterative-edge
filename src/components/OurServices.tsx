'use client';

import { useState, useRef, useEffect } from 'react';
import { Section } from '@/components/ui/DaisyUI';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceNavigation } from '@/components/services/ServiceNavigation';
import { services } from '@/data/services';

export default function OurServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const serviceElements = document.querySelectorAll('[id^="service-"]');
      let mostVisibleIndex = 0;
      let maxVisibility = 0;
      
      serviceElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const visibilityRatio = visibleHeight / viewportHeight;
        
        if (visibilityRatio > maxVisibility) {
          maxVisibility = visibilityRatio;
          mostVisibleIndex = index;
        }
      });
      
      setActiveIndex(mostVisibleIndex);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Section className="relative bg-base-300" id="our-services">
      <div ref={sectionRef} className="relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center pt-16 pb-8">Our Services</h2>
        
        {services.map((service, index) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            id={`service-${index}`}
          />
        ))}
        
        <ServiceNavigation activeIndex={activeIndex} />
      </div>
    </Section>
  );
}
