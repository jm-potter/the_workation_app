'use client'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'rounded-xl font-semibold transition-all disabled:opacity-40'

  const variants = {
    primary:   'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-[#F1F5F9] text-[#0F172A] hover:bg-[#2e3f56] border border-[#E2E8F0]',
    ghost:     'bg-transparent text-[#475569] hover:text-[#0F172A] hover:bg-white',
    danger:    'bg-red-500 text-white hover:bg-red-600',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
