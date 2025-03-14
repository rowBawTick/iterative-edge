import { ButtonProps } from './PrimaryButton';

export const SecondaryButton = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button 
      className={`btn btn-outline btn-lg relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] active:scale-95 ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-primary/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
    </button>
  );
};
