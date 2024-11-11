import BoardPreviewColumn from "@/components/board-preview-column";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/boards?page=${page}`
    );

    console.log("응답 상태:", response.status); // 상태 코드를 출력
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return (
      <div>
        {data.map((boardPreview: BoardPreviewData, i: number) => (
          <BoardPreviewColumn key={i} {...boardPreview} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return <div>게시글을 불러오는 중 오류가 발생했습니다.</div>;
  }
}
