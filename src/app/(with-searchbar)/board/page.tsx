import BoardPreviewColumn from "@/components/board-preview-column";

export default async function Home() {
  const boardsPreview = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/boards`
  ).then((res) => res.json());
  return (
    <div>
      {boardsPreview.map((boradPreview, i) => (
        <BoardPreviewColumn key={i} {...boradPreview} />
      ))}
    </div>
  );
}
