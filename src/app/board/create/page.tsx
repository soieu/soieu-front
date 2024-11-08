"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const createBoard = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/board`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        }
      );

      if (!response.ok) {
        throw new Error("게시글 생성에 실패했습니다.");
      }

      const result = await response.json();
      console.log("게시글 생성 성공:", result);
      router.back();
    } catch (error) {
      console.error("게시글 생성 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <textarea
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>
      <textarea
        placeholder="콘텐츠를 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={createBoard}>Click</button>
    </div>
  );
}
