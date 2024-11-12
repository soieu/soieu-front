"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const jwtToken = localStorage.getItem("jwt");
  const router = useRouter();
  return (
    <div className="flex flex-row justify-around items-end w-full">
      <div className="m-2 text-3xl">Hello!</div>
      <div className="flex flex-row justify-around">
        <div className="m-2 text-xl">INSIGHT</div>
        <div className="m-2 text-xl">SCHEDULE</div>
        <div className="m-2 text-xl">MEMO</div>
        <div className="m-2 text-xl">MONEY</div>
        <div className="m-2 text-xl">
          <Link href="/community">COMMUNITY</Link>
        </div>
        <div className="m-2 text-xl">
          {jwtToken ? (
            <button
              onClick={() => {
                localStorage.removeItem("jwt");
                router.refresh();
              }}
            >
              LOGOUT
            </button>
          ) : (
            <Link href="/login">LOGIN</Link>
          )}
        </div>
      </div>
    </div>
  );
}
