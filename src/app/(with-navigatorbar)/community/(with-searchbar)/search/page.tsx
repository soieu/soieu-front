import { BoardPreviewData } from "@/app/types";
import BoardPreviewColumn from "@/components/board-preview-column";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const boardsPreview = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/boards/search?query=${query}`
  ).then((res) => res.json());
  return (
    <div>
      {boardsPreview.map((boardPreview: BoardPreviewData, i: number) => (
        <BoardPreviewColumn key={i} {...boardPreview}></BoardPreviewColumn>
      ))}
    </div>
  );
}
