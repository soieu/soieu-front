"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/permit/api/member/logout", { method: "POST" });
    setIsAuthenticated(false);
    router.refresh();
  };

  return (
    <div className="flex flex-wrap justify-around items-center w-full p-4">
      <h1 className="text-6xl">
        <Link href="/">HELLO!</Link>
      </h1>
      <h2 className="text-3xl flex flex-wrap gap-4">
        <Link href="/insight">INSIGHT</Link>
        <Link href="/schedule">SCHEDULE</Link>
        <Link href="/memo">MEMO</Link>
        <Link href="/money">MONEY</Link>
        <Link href="/community">COMMUNITY</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout}>LOGOUT</button>
        ) : (
          <Link href="/login">LOGIN</Link>
        )}
      </h2>
    </div>
  );
}
