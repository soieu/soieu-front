import Link from "next/link";

export default function Page() {
  return (
    <div>
      <button>
        <Link href="/login">로그인</Link>
      </button>
    </div>
  );
}
