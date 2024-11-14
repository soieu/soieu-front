"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function BodyWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const bodyClass = pathname === "/insight" ? "bg-yellow-50" : "bg-white";

  return (
    <div
      className={`transition-colors duration-500 min-h-screen w-full ${bodyClass}`}
    >
      {children}
    </div>
  );
}
