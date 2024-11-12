"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [memberId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const onLogin = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/permit/api/member/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId,
          password,
        }),
      }
    );

    if (!response.ok) {
      alert("로그인 실패");
      return;
    }

    const data = await response.json();
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt); // JWT 토큰을 로컬 스토리지에 저장
      alert("로그인 성공");
      router.back();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-3xl">HELLO!</div>
      <input
        value={memberId}
        className="w-80 h-10 mx-4 my-2 border-black border-2 appearance-none p-4 focus:outline-none "
        placeholder="아이디"
        onChange={(e) => setUserId(e.target.value)}
      ></input>
      <input
        value={password}
        className="w-80 h-10 mx-4 my-2 border-black border-2 appearance-none p-4 focus:outline-none "
        placeholder="비밀번호"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button
        onClick={onLogin}
        className="w-80 h-10 mx-4 my-2  border-black border-2 appearance-none p-4 focus:outline-none bg-black text-white text-center font-bold flex items-center justify-center"
      >
        로그인
      </button>
      <Link href="/signup">
        <button className="w-80 h-10 mx-4 my-2  border-black border-2 appearance-none p-4 focus:outline-none bg-gray-300 text-black text-center font-bold flex items-center justify-center">
          회원가입
        </button>
      </Link>
    </div>
  );
}
