import Link from "next/link";

export function buttonClass(variant: "primary" | "outline" | "ghost" | "gold" = "gold", size: "md" | "lg" | "sm" = "md") {
  const sizes = {
    sm: "px-3.5 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  const variants = {
    gold: "bg-gold-400 text-navy-950 font-bold hover:bg-gold-300 shadow-sm",
    primary: "bg-navy-900 text-white font-bold hover:bg-navy-800 shadow-sm",
    outline: "border border-navy-900 text-navy-900 font-bold hover:bg-navy-50",
    ghost: "text-navy-900 font-semibold hover:bg-navy-50",
  };
  return `inline-flex items-center justify-center gap-2 rounded-full transition disabled:opacity-60 ${variants[variant]} ${sizes[size]}`;
}

export function Button({
  variant = "gold",
  size = "md",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" | "gold"; size?: "md" | "lg" | "sm" }) {
  return <button className={`${buttonClass(variant, size)} ${className}`} {...props} />;
}

export function ButtonLink({
  href,
  variant = "gold",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: "primary" | "outline" | "ghost" | "gold";
  size?: "md" | "lg" | "sm";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${buttonClass(variant, size)} ${className}`}>
      {children}
    </Link>
  );
}

const inputClass =
  "w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-950 placeholder:text-navy-300 outline-none transition focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10";

export function Input({
  label,
  hint,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-semibold text-navy-900">{label}</span>}
      <input className={inputClass} {...props} />
      {hint && <span className="mt-1 block text-xs text-navy-400">{hint}</span>}
    </label>
  );
}

export function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-semibold text-navy-900">{label}</span>}
      <textarea className={`${inputClass} min-h-24 resize-y`} {...props} />
    </label>
  );
}

export function Select({
  label,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-semibold text-navy-900">{label}</span>}
      <select className={`${inputClass} cursor-pointer`} {...props}>
        {children}
      </select>
    </label>
  );
}

export function Field({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label && <span className="mb-1.5 block text-sm font-semibold text-navy-900">{label}</span>}
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy-100 ${className}`}>{children}</div>;
}

export function Badge({ tone = "navy", children }: { tone?: "navy" | "gold" | "green" | "red" | "gray"; children: React.ReactNode }) {
  const tones = {
    navy: "bg-navy-100 text-navy-900",
    gold: "bg-gold-100 text-gold-800",
    green: "bg-emerald-100 text-emerald-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-gray-700",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}