"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";

type Props = {
  userName: string;
  role: string;
};

export function UserMenu({ userName, role }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full bg-navy-800 px-3 py-1.5 text-sm font-medium text-gold-400 transition hover:bg-navy-700"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-navy-950">
          {userName.charAt(0).toUpperCase()}
        </span>
        <span className="hidden sm:inline">{userName.split(" ")[0]}</span>
        <svg className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="currentColor"><path d="M4.47 6.47a.75.75 0 011.06 0L8 8.94l2.47-2.47a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 010-1.06z"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-navy-700 bg-navy-900 py-2 shadow-xl">
          <div className="border-b border-navy-700 px-4 pb-2 pt-1">
            <p className="text-sm font-semibold text-white truncate">{userName}</p>
            {role === "admin" && (
              <span className="mt-0.5 inline-block rounded bg-gold-400 px-1.5 py-0.5 text-[10px] font-bold uppercase text-navy-950">Admin</span>
            )}
          </div>
          <Link href="/criar" className="block px-4 py-2 text-sm hover:bg-navy-800 text-navy-100">Criar vídeo</Link>
          <Link href="/meus-videos" className="block px-4 py-2 text-sm hover:bg-navy-800 text-navy-100">Meus vídeos</Link>
          <Link href="/perfil" className="block px-4 py-2 text-sm hover:bg-navy-800 text-navy-100">Perfil</Link>
          {role === "admin" && (
            <Link href="/admin" className="block px-4 py-2 text-sm font-semibold text-gold-400 hover:bg-navy-800">Painel admin</Link>
          )}
          <div className="border-t border-navy-700 mt-1 pt-1 px-4">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}