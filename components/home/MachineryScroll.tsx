import Image from "next/image";
import { Cog } from "lucide-react";
import Reveal from "@/components/Reveal";

const machines = [
  { img: "/images/machine_offset.png", title: "Máy In Offset Heidelberg 6 Màu", desc: "Máy in đời mới nhập khẩu nguyên chiếc. Đảm bảo bản in sắc nét, chồng màu chính xác tuyệt đối.", tag: "In Ấn Cao Cấp" },
  { img: "/images/machine_diecut.png", title: "Dàn Máy Bế Dập Liên Hợp Tự Động", desc: "Bế, dập lỗ liên hoàn không sai lệch trên carton đa lớp. Tăng công suất gấp 10 lần thủ công.", tag: "Tự Động Hóa" },
  { img: "/images/machine_glue.png", title: "Máy Dán Thùng Xếp Tự Động Siêu Tốc", desc: "Hệ thống phun băng keo siêu tốc, gia cố tức thì các mép góc, khung xương hộp vững chãi.", tag: "Đóng Gói" },
  { img: "/images/machine_extruder.png", title: "Dây Chuyền Thổi Màng PE Rộng 3M", desc: "Công nghệ đùn phim 3 lớp có đầu dò laser. Kháng đâm thủng cực đại trên màng mỏng.", tag: "Màng PE" },
];

export default function MachineryScroll() {
  return (
    <section id="machinery" className="overflow-hidden bg-navy-900 py-24">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <div className="tag-label"><Cog size={14} /> Thiết Bị</div>
            <h2 className="mb-2 text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-white">
              Hệ Thống Máy Móc &amp; Thiết Bị
            </h2>
            <p className="text-white/55">Trang thiết bị tự động hóa tiên tiến nhập khẩu từ Đức &amp; Nhật Bản.</p>
          </div>
        </Reveal>

        <div className="machine-scroll flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {machines.map((m) => (
            <article key={m.title} className="snap-start shrink-0 basis-[340px] overflow-hidden rounded-md border border-white/10 bg-white/5 transition-all hover:-translate-y-1.5 hover:border-orange-500/40">
              <div className="relative h-[220px] overflow-hidden">
                <Image src={m.img} alt={m.title} fill sizes="340px" className="object-cover brightness-90 transition-all hover:brightness-100" />
              </div>
              <div className="p-6 text-white">
                <h3 className="mb-2.5 text-[1.05rem] font-bold">{m.title}</h3>
                <p className="text-[0.9rem] leading-[1.65] text-white/55">{m.desc}</p>
                <span className="mt-3.5 inline-block rounded-full border border-orange-500/25 bg-orange-500/15 px-3 py-1 text-[0.75rem] font-bold text-orange-400">
                  {m.tag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
