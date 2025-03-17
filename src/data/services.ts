import React from 'react';
import { FaLaptopCode, FaRobot, FaTools, FaLightbulb } from 'react-icons/fa';

export interface ServiceProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  imageUrl: string;
}

export const services: ServiceProps[] = [
  {
    id: 'bespoke-applications',
    title: 'Bespoke Applications',
    description: 'Custom web and mobile applications tailored to your specific business needs. Our team specializes ' +
      'in creating responsive, user-friendly e-commerce platforms, enterprise solutions, and innovative digital ' +
      'products that drive growth and enhance user experience.',
    icon: React.createElement(FaLaptopCode, { className: 'w-12 h-12' }),
    imageUrl: '/images/bespoke-app.webp'
  },
  {
    id: 'integrations',
    title: 'Integrations: AI and ML Solutions',
    description: 'Seamlessly integrate cutting-edge AI and machine learning technologies with your existing systems. ' +
      'We help businesses leverage the power of data through intelligent automation, predictive analytics, and smart ' +
      'decision-making tools that transform operations and create competitive advantages.',
    icon: React.createElement(FaRobot, { className: 'w-12 h-12' }),
    imageUrl: '/images/ai-integration.webp'
  },
  {
    id: 'maintenance',
    title: 'Software Maintenance and Support',
    description: 'Comprehensive maintenance and support services to ensure your software remains secure, efficient, ' +
      'and up-to-date. Our dedicated team provides regular updates, performance optimization, bug fixes, and 24/7 ' +
      'technical support to keep your digital assets running smoothly.',
    icon: React.createElement(FaTools, { className: 'w-12 h-12' }),
    imageUrl: '/images/maintenance.webp'
  },
  {
    id: 'consultancy',
    title: 'Consultancy',
    description: 'Expert technology consulting to guide your digital transformation journey. Our consultants ' +
      'work closely with your team to develop strategic roadmaps, optimize processes, and implement best practices ' +
      'that align technology investments with business objectives for maximum ROI.',
    icon: React.createElement(FaLightbulb, { className: 'w-12 h-12' }),
    imageUrl: '/images/consultancy.webp'
  }
];
