interface BadgeProps {
  children: React.ReactNode
  variant?: 'hr' | 'emp' | 'adm' | 'prt' | 'gov' | 'pending' | 'confirmed' | 'cancelled' | 'default'
}

const styles = {
  hr:        'bg-blue-500/20 text-blue-300 border-blue-500/30',
  emp:       'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  adm:       'bg-red-500/20 text-red-300 border-red-500/30',
  prt:       'bg-pink-500/20 text-pink-300 border-pink-500/30',
  gov:       'bg-amber-500/20 text-amber-300 border-amber-500/30',
  pending:   'bg-amber-500/20 text-amber-300 border-amber-500/30',
  confirmed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
  default:   'bg-[#263548] text-[#94A3B8] border-[#334155]',
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded border ${styles[variant]}`}>
      {children}
    </span>
  )
}
