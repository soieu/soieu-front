import Link from "next/link";

export default function BoardPreviewColumn({
  id,
  title,
  createdDate,
}: BoardPreviewData) {
  return (
    <div className="flex flex-row justify-between">
      <div className="board-preview-column-title">{id}</div>
      <div className="board-preview-column-title">
        <Link href={`/board/${id}`}>{title}</Link>
      </div>
      <div className="board-preview-column-date">{createdDate}</div>
    </div>
  );
}
