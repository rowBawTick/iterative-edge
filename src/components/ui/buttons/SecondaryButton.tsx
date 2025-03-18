import { ButtonProps } from './PrimaryButton';

export const SecondaryButton = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button 
      className={`btn-secondary-custom ${className}`}
      {...props}
    >
      <span className="btn-content">{children}</span>
      <span className="btn-hover-secondary"></span>
    </button>
  );
};
