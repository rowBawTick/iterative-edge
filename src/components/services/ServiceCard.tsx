import { Container } from '@/components/ui/DaisyUI';
import { PrimaryButton } from '@/components/ui/buttons';
import { ServiceProps } from '@/data/services';

interface ServiceCardProps {
  service: ServiceProps;
  id: string;
}

export const ServiceCard = ({ service, id }: ServiceCardProps) => {
  return (
    <div id={id} className="service-section py-16">
      <Container>
        <div className="service-grid">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-full bg-base-200">{service.icon}</div>
              <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
            </div>
            <p className="text-lg text-gray-300 mb-8">{service.description}</p>
            <PrimaryButton>Learn More</PrimaryButton>
          </div>
          <div className="order-1 lg:order-2">
            <div className="service-image-container">
              <div className="service-image-overlay" />
              <div 
                className="service-image"
                style={{ 
                  backgroundImage: `url(${service.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
