import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] bg-offwhite py-24">
      <div className="container-x text-center">
        <div className="tag-label">404</div>
        <h1 className="mb-4 text-4xl font-extrabold text-navy-900">Không tìm thấy trang</h1>
        <p className="mb-8 text-grayline-600">Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.</p>
        <Link href="/" className="btn btn-primary">Về Trang Chủ</Link>
      </div>
    </main>
  );
}
