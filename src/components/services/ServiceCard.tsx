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
            <div className="flex items-center gap-4 mb-2">
              <div className="p-4 rounded-full bg-base-200 flex items-center justify-center">
                <div className="w-12 h-12 flex items-center justify-center">{service.icon}</div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
            </div>
            <p className="text-lg text-gray-300 mb-8">{service.description}</p>
            <PrimaryButton>Learn More</PrimaryButton>
          </div>
          <div className="order-1 lg:order-2">
            <div className="service-image-container">
              <div className="service-image-overlay" />
              <img
                src={service.imageUrl}
                alt={`${service.title} service illustration`}
                className="service-image"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
