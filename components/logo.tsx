type LogoProps = {
  className?: string;
};

export function LogoMark({ className }: LogoProps) {
  return (
    <span
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-950 ring-1 ring-navy-800 shadow-md ${className ?? ""}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.jpeg"
        alt=""
        width={36}
        height={36}
        className="h-7 w-7 rounded object-contain"
      />
    </span>
  );
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark />
      <span className="leading-none">
        <span className="block font-display text-base font-normal tracking-tight text-white uppercase">
          Thiago Cicinho
        </span>
        <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
          Tropa do Bem
        </span>
      </span>
    </span>
  );
}

export function LogoDark({ className }: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark />
      <span className="leading-none">
        <span className="block font-display text-base font-normal tracking-tight text-navy-950 uppercase">
          Thiago Cicinho
        </span>
        <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600">
          Tropa do Bem
        </span>
      </span>
    </span>
  );
}