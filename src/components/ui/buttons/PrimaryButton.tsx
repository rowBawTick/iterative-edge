import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const PrimaryButton = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button 
      className={`btn-primary-custom ${className}`}
      {...props}
    >
      <span className="btn-content">{children}</span>
      <span className="btn-hover-primary"></span>
    </button>
  );
};
