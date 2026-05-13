interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#475569]">{label}</label>}
      <input
        className={`w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm text-[#0F172A] placeholder-[#64748B]
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
