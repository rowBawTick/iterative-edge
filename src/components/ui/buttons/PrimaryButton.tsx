import { ButtonHTMLAttributes } from 'react';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: ButtonSize;
}

export const PrimaryButton = ({ children, className = '', size = 'md', ...props }: ButtonProps) => {
  return (
    <button 
      className={`btn-primary-custom btn-${size} ${className}`}
      {...props}
    >
      <span className="btn-content">{children}</span>
      <span className="btn-hover-primary"></span>
    </button>
  );
};
