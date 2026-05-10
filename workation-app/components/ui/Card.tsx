interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-[#1E293B] border border-[#334155] rounded-xl p-6 ${onClick ? 'cursor-pointer hover:border-blue-500/50 transition-all' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
