import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: "Tin Tức Công Nghiệp",
  description:
    "Cập nhật xu hướng bao bì, hoạt động doanh nghiệp và công nghệ mới tại Minh Tín Plastics.",
};

export default function NewsPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-navy-700 to-navy-900 py-20 text-center text-white">
        <div className="container-x">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
            Tin Tức &amp; Hoạt Động Doanh Nghiệp
          </h1>
          <p className="text-lg opacity-90">
            Cập nhật xu hướng bao bì và thông tin nội bộ của Minh Tín Plastics
          </p>
        </div>
      </section>

      <section className="bg-offwhite py-20">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col overflow-hidden rounded-xl border border-grayline-200 bg-white transition-all hover:-translate-y-2 hover:border-navy-400 hover:shadow-lgnavy"
              >
                <div className="relative h-[220px] w-full overflow-hidden border-b-[3px] border-orange-500">
                  <Image src={article.image.src} alt={article.image.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2.5 flex items-center gap-3 text-[0.9rem] text-grayline-600">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</span>
                    <span className="flex items-center gap-1.5"><Tag size={14} /> {article.tag}</span>
                  </div>
                  <h3 className="mb-4 flex-1 text-[1.3rem] font-bold leading-snug text-navy-900 transition-colors group-hover:text-navy-700">
                    {article.title}
                  </h3>
                  <Link href="#" className="mt-auto inline-flex items-center gap-2 font-semibold text-orange-500 transition-all hover:gap-3 hover:text-orange-600">
                    Đọc chi tiết <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
