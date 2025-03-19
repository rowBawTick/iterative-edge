import { Container } from '@/components/ui/DaisyUI';
import { PrimaryButton } from '@/components/ui/buttons';
import { ServiceProps } from '@/data/services';

interface ServiceCardProps {
  service: ServiceProps;
  id: string;
  index: number;
  onLearnMore?: () => void;
}

export const ServiceCard = ({ service, id, index, onLearnMore }: ServiceCardProps) => {
  return (
    <div id={id} className="service-section py-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-8xl mx-auto">
          <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} space-y-8`}>
            <div className="flex items-center gap-6">
              <div className="p-5 rounded-2xl bg-base-200 flex items-center justify-center shrink-0">
                <div className="w-14 h-14 flex items-center justify-center">{service.icon}</div>
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">{service.title}</h2>
            </div>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">{service.description}</p>
            <div className="pt-4 flex sm:block justify-center">
              <PrimaryButton size="lg" onClick={onLearnMore}>Learn More</PrimaryButton>
            </div>
          </div>
          <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-base-200">
              <img
                src={service.imageUrl}
                alt={`${service.title} service illustration`}
                className="w-full h-full object-cover"
                width={1024}
                height={1024}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
