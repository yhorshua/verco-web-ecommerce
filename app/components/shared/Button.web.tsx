'use client';

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
  const baseClasses =
    'inline-flex items-center justify-center font-black uppercase tracking-widest text-xs rounded-full transition-all duration-300 cursor-pointer select-none active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#E70033]/35 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-[#283E6A] hover:bg-[#E70033] text-white shadow-[0_4px_16px_rgba(40,62,106,0.18)] hover:shadow-[0_6px_22px_rgba(231,0,51,0.25)]',

    secondary:
      'bg-white text-[#283E6A] border border-[#283E6A]/20 hover:bg-[#283E6A] hover:text-white hover:border-[#283E6A] shadow-sm',

    outline:
      'bg-transparent text-[#283E6A] border border-[#283E6A] hover:bg-[#283E6A] hover:text-white',

    ghost:
      'bg-transparent text-[#283E6A] hover:bg-[#283E6A]/5 hover:text-[#E70033]',

    danger:
      'bg-[#E70033] hover:bg-[#b80028] text-white shadow-md',
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