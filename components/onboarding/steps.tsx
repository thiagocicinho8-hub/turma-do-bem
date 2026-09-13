const STEPS = ["Telefone", "Instagram"] as const;

export function OnboardingSteps({ current }: { current: 1 | 2 }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((label, i) => {
        const step = (i + 1) as 1 | 2;
        const done = step < current;
        const active = step === current;
        return (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                done
                  ? "bg-green-600 text-white"
                  : active
                    ? "bg-blue-700 text-white"
                    : "bg-navy-100 text-navy-400"
              }`}
            >
              {done ? (
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 8.5l3.5 3.5L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                `0${step}`
              )}
            </span>
            <span
              className={`text-xs font-bold uppercase tracking-wide ${
                active || done ? "text-navy-900" : "text-navy-400"
              }`}
            >
              {label}
            </span>
            {step < STEPS.length && <span className="mx-1 text-navy-300">—</span>}
          </div>
        );
      })}
    </div>
  );
}