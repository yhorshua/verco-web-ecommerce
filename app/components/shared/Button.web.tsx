import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  // Base classes for a premium rounded-full style button
  const baseClasses = 'inline-flex items-center justify-center font-black uppercase tracking-widest text-xs rounded-full transition-all duration-350 cursor-pointer select-none active:scale-95 focus:outline-none';

  // Premium cobalt & bone styling mapping
  const variants = {
    // Primary: Deep cobalt blue `#1a3e6a` with white text
    primary: 'bg-[#1a3e6a] hover:bg-[#132f52] text-white shadow-[0_4px_16px_rgba(26,62,106,0.18)] hover:shadow-[0_6px_22px_rgba(26,62,106,0.3)]',
    
    // Secondary: Pure bone `#faf9f6` with cobalt blue `#1a3e6a` text and border
    secondary: 'bg-[#faf9f6] text-[#1a3e6a] border border-[#1a3e6a]/20 hover:bg-[#f1efe9] hover:border-[#1a3e6a]/40 shadow-sm',
    
    // Outline: Transparent background, cobalt border, cobalt text
    outline: 'bg-transparent text-[#1a3e6a] border border-[#1a3e6a] hover:bg-[#1a3e6a]/5',
    
    // Ghost: Subtle hover state
    ghost: 'bg-transparent text-[#1a3e6a] hover:bg-[#faf9f6] hover:text-[#132f52]',
    
    // Danger: Precision red
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-5 py-3.5 text-[11px]',
    lg: 'px-8 py-5 text-xs',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
