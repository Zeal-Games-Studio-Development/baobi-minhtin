"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LiveReloader() {
  const router = useRouter();

  useEffect(() => {
    // Chỉ kích hoạt ở môi trường dev để tránh spam server thật
    if (process.env.NODE_ENV !== "development") return;

    const intervalId = setInterval(() => {
      // Hàm router.refresh() sẽ tự động tải lại dữ liệu từ Server 
      // mà không làm F5 chớp màn hình.
      router.refresh();
    }, 10000); // Mỗi 10 giây kiểm tra 1 lần

    return () => clearInterval(intervalId);
  }, [router]);

  return null; // Component này chỉ chạy ngầm, không render ra UI
}
