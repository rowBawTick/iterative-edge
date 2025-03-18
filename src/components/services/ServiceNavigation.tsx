import { useState, useEffect } from 'react';
import { services } from '@/data/services';

interface ServiceNavigationProps {
  activeIndex: number;
}

export const ServiceNavigation = ({ activeIndex }: ServiceNavigationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const shouldBeVisible = window.scrollY > viewportHeight * 0.9;
      
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);
        if (!shouldBeVisible) {
          setTimeout(() => setIsHidden(true), 300);
        } else {
          setIsHidden(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  if (isHidden) return null;

  return (
    <nav 
      aria-label="Services navigation"
      className={`service-nav hidden sm:block ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex flex-col gap-4" role="list">
        {services.map((service, index) => (
          <a
            key={service.id}
            href={`#service-${index}`}
            className={
              `service-nav-dot ${activeIndex === index ? 'service-nav-dot-active' : 'service-nav-dot-inactive'}`}
            aria-label={`Navigate to ${service.title} section`}
            aria-current={activeIndex === index ? 'true' : 'false'}
            role="listitem"
          />
        ))}
      </div>
    </nav>
  );
};
