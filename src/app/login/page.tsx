"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const router = useRouter();

  const onLogin = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            userPassword,
          }),
        }
      );
      const data = await response.json();
      if (data.result === true) {
        alert("로그인 성공");
        router.push(`/boards`);
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      alert("로그인 중 오류가 발생했습니다. 관리자에게 문의하세요");
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div>SOIEU</div>
      <input
        value={userId}
        className="w-80 h-10 mx-4 my-2 border-gray-300 border rounded-md appearance-none p-4 focus:outline-none focus:border-lime-600"
        placeholder="아이디"
        onChange={(e) => setUserId(e.target.value)}
      ></input>
      <input
        value={userPassword}
        className="w-80 h-10 mx-4 my-2 border-gray-300 border rounded-md appearance-none p-4 focus:outline-none focus:border-lime-600"
        placeholder="비밀번호"
        type="password"
        onChange={(e) => setUserPassword(e.target.value)}
      ></input>
      <button
        onClick={onLogin}
        className="w-80 h-10 mx-4 my-2 rounded-md appearance-none p-4 focus:outline-none bg-lime-600 text-white text-center font-bold flex items-center justify-center"
      >
        로그인
      </button>
      <Link href="/signup">
        <button className="w-80 h-10 mx-4 my-2 rounded-md appearance-none p-4 focus:outline-none bg-gray-100 text-black text-center font-bold flex items-center justify-center">
          회원가입
        </button>
      </Link>
    </div>
  );
}
