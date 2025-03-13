'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Section, Container } from '@/components/ui/DaisyUI';
import { FaLaptopCode, FaRobot, FaTools, FaLightbulb } from 'react-icons/fa';

interface ServiceProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
}

const services: ServiceProps[] = [
  {
    id: 'bespoke-applications',
    title: 'Bespoke Applications',
    description: 'Custom web and mobile applications tailored to your specific business needs. Our team specializes ' +
      'in creating responsive, user-friendly e-commerce platforms, enterprise solutions, and innovative digital ' +
      'products that drive growth and enhance user experience.',
    icon: <FaLaptopCode className="w-12 h-12" />,
    imageUrl: '/images/bespoke-app.jpg'
  },
  {
    id: 'integrations',
    title: 'Integrations: AI and ML Solutions',
    description: 'Seamlessly integrate cutting-edge AI and machine learning technologies with your existing systems. ' +
      'We help businesses leverage the power of data through intelligent automation, predictive analytics, and smart ' +
      'decision-making tools that transform operations and create competitive advantages.',
    icon: <FaRobot className="w-12 h-12" />,
    imageUrl: '/images/ai-integration.jpg'
  },
  {
    id: 'maintenance',
    title: 'Software Maintenance and Support',
    description: 'Comprehensive maintenance and support services to ensure your software remains secure, efficient, ' +
      'and up-to-date. Our dedicated team provides regular updates, performance optimization, bug fixes, and 24/7 ' +
      'technical support to keep your digital assets running smoothly.',
    icon: <FaTools className="w-12 h-12" />,
    imageUrl: '/images/maintenance.jpg'
  },
  {
    id: 'consultancy',
    title: 'Consultancy',
    description: 'Expert technology consulting to guide your digital transformation journey. Our consultants ' +
      'work closely with your team to develop strategic roadmaps, optimize processes, and implement best practices ' +
      'that align technology investments with business objectives for maximum ROI.',
    icon: <FaLightbulb className="w-12 h-12" />,
    imageUrl: '/images/consultancy.jpg'
  }
];

const ServiceCard = ({ service, id }: { service: ServiceProps, id: string }) => {
  return (
    <div 
      id={id}
      className="min-h-screen flex items-center py-16 w-full scroll-mt-16"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-4 rounded-full text-primary">
                {service.icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
            </div>
            <p className="text-lg text-gray-300 mb-8">{service.description}</p>
            <button className="btn btn-primary btn-lg group relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] active:scale-95">
              <span className="relative z-10">Learn More</span>
              <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
            </button>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 mix-blend-overlay z-10"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
                style={{ 
                  backgroundImage: `url(${service.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const ServiceNavigation = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col gap-4">
        {services.map((service, index) => (
          <a
            key={service.id}
            href={`#service-${index}`}
            className={`w-4 h-4 rounded-full transition-all duration-300 block ${
              activeIndex === index 
                ? 'bg-primary scale-125' 
                : 'bg-gray-500 hover:bg-gray-400'
            }`}
            aria-label={`Go to ${service.title}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function OurServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Update active index based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      // Check which service is most visible in the viewport
      const serviceElements = document.querySelectorAll('[id^="service-"]');
      let mostVisibleIndex = 0;
      let maxVisibility = 0;
      
      serviceElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate how much of the element is visible in the viewport
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
      <div 
        ref={sectionRef} 
        className="relative"
      >
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
