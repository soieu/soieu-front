"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [memberId, setMemberId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkUserPassword, setCheckUserPassword] = useState<string>("");
  const [isPasswordMismatch, setIsPasswordMismatch] = useState<boolean>(false);
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setCheckUserPassword(value);
    setIsPasswordMismatch(password !== value);
  };

  const router = useRouter();

  const signup = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/permit/api/member/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            memberId,
            password,
            isPasswordMismatch,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error from server:", errorText);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        return;
      }
      // TODO 상태로 성공했는지 그런거 체크하기 지금 실패해도 걍 성공했다 나올걸
      const data = await response.json();
      console.log(data);
      alert("회원가입이 성공했습니다.");
      router.push("/login");
    } catch (error) {
      console.error("Network error:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center content-center">
      <div className="text-3xl">HELLO!</div>
      <input
        value={memberId}
        className="w-80 h-10 mx-4 my-2 border-black border-2 appearance-none p-4 focus:outline-none"
        placeholder="아이디"
        onChange={(e) => setMemberId(e.target.value)}
      ></input>
      <input
        value={password}
        className="w-80 h-10 mx-4 my-2 border-black border-2 appearance-none p-4 focus:outline-none"
        placeholder="비밀번호"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <input
        value={checkUserPassword}
        className={`w-80 h-10 mx-4 my-2 ${
          isPasswordMismatch ? "border-red-500" : "border-black border-2"
        } border-2 appearance-none p-4 focus:outline-none focus:${
          isPasswordMismatch ? "border-red-500" : "border-black border-2"
        }`}
        placeholder="비밀번호 확인"
        type="password"
        onChange={handlePasswordChange}
      ></input>

      {/* 불일치 안내 문구 */}
      {isPasswordMismatch && (
        <p className="text-red-500 mx-4">비밀번호가 일치하지 않습니다.</p>
      )}

      {isPasswordMismatch ? (
        <button
          className="w-80 h-10 mx-4 my-2  border-black border-2 appearance-none p-4 focus:outline-none bg-gray-300 text-black text-center font-bold flex items-center justify-center"
          disabled
        >
          회원가입
        </button>
      ) : (
        <button
          onClick={signup}
          className="w-80 h-10 mx-4 my-2  border-black border-2 appearance-none p-4 focus:outline-none bg-gray-300 text-black text-center font-bold flex items-center justify-center"
        >
          회원가입
        </button>
      )}
    </div>
  );
}
