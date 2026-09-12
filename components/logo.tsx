type LogoProps = {
  className?: string;
};

const STAR_POINTS =
  "20,5 23.88,14.66 34.27,15.36 26.28,22.04 28.82,32.14 20,26.6 11.18,32.14 13.72,22.04 5.73,15.36 16.12,14.66";

export function LogoMark({ className }: LogoProps) {
  return (
    <span
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-950 ring-1 ring-navy-800 shadow-md ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 40 40"
        className="h-6 w-6"
        fill="none"
      >
        <desc>Logo placeholder: estrela amarela sobre azul escuro</desc>
        <polygon points={STAR_POINTS} className="fill-gold-400" />
      </svg>
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