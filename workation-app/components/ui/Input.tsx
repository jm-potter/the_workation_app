interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#94A3B8]">{label}</label>}
      <input
        className={`w-full bg-[#263548] border border-[#334155] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#64748B]
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
