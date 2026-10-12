import Image from "next/image";
import { ListOrdered, Layers, ShieldCheck, GitBranch, Package, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";

type Step = {
  code: string;
  title: string;
  desc: string;
  img: string | null;
  alt?: string;
};

const steps: Step[] = [
  {
    code: "B1 – B2",
    title: "Kiểm Tra & Định Lượng Tự Động",
    desc: "Kiểm tra tem nhãn, Lot nguyên liệu; hệ thống tự động cân định lượng theo đúng Recipe/Formula. Nghiêm cấm tự ý đổi tỷ lệ phối trộn.",
    img: "/images/process/04-kho-nguyen-lieu.jpg",
    alt: "Kho nguyên liệu hạt nhựa Minh Tín",
  },
  {
    code: "B3",
    title: "Đùn Thổi 3 Lớp & IBC",
    desc: "Gia nhiệt nóng chảy nhựa qua khuôn 3 lớp (tỷ lệ 25/50/25). Hệ thống IBC làm lạnh và ổn định bóng màng từ bên trong.",
    img: "/images/process/07-may-chieu-dung.jpg",
    alt: "Tổ hợp tháp kéo và đầu đùn màng thổi",
  },
  {
    code: "B4",
    title: "Auto Air Ring",
    desc: "Vòng gió tự động điều chỉnh luồng khí dựa trên dữ liệu đo độ dày thực tế, giữ dải dung sai mục tiêu trong khoảng 3 – 7%.",
    img: "/images/process/01-day-chuyen-tong-the.jpg",
    alt: "Toàn cảnh dây chuyền Rajoo & Syncro",
  },
  {
    code: "B5",
    title: "Lô Ép / Kéo (Nip & Pull Roll)",
    desc: "Khung Collapsing Frame và lô kéo định hình bóng màng, triệt tiêu rung lắc, chống nhăn và lệch tâm.",
    img: null,
  },
  {
    code: "B6",
    title: "Xử Lý Bề Mặt Corona",
    desc: "Bắn phá bề mặt để gia tăng năng lượng bề mặt, giúp bám dính mực in và keo ghép màng phức hợp. Kiểm soát qua công suất (Set Power), suất liều (Set Dose) và test bằng bút Dyne.",
    img: "/images/process/03-man-hinh-corona.jpg",
    alt: "Màn hình điều khiển trạm Corona Generator",
  },
  {
    code: "B7",
    title: "Thu Cuộn (Rewinder A/B)",
    desc: "Cuộn màng tự động theo lực căng (tension), đường kính và chiều dài định trước. Cuộn phải phẳng đều, không bị telescope hay lệch mép.",
    img: null,
  },
  {
    code: "B8",
    title: "Kiểm Tra Chất Lượng (QC)",
    desc: "Đo độ dày, ngoại quan, kiểm tra Dyne test, thử đường hàn nhiệt (Heat Seal), đo kích thước và khối lượng cuộn.",
    img: "/images/process/06-phong-qc.jpg",
    alt: "Phòng kiểm tra chất lượng QC",
  },
  {
    code: "B9 – B10",
    title: "Cân, Đóng Gói & Nhập Kho",
    desc: "Dán nhãn thông tin truy xuất; lưu kho khô ráo, thoáng mát và luân chuyển theo nguyên tắc FIFO/FEFO.",
    img: "/images/process/05-cuon-thanh-pham.jpg",
    alt: "Kiện hàng cuộn màng LLDPE hoàn thiện",
  },
];

const layers = [
  {
    name: "Layer A",
    pct: "25%",
    branches: "A1 LLDPE · A2 LDPE · A3 mLLDPE · A4 PPA",
    color: "bg-orange-500",
  },
  {
    name: "Layer B",
    pct: "50%",
    branches: "B1 LLDPE · B2 LDPE · B3 mLLDPE — Lớp lõi giữa",
    color: "bg-navy-700",
  },
  {
    name: "Layer C",
    pct: "25%",
    branches: "C1 LLDPE · C2 LDPE · C3 mLLDPE · C4 PPA · C5 FUS",
    color: "bg-navy-500",
  },
];

const controlPoints = [
  { id: "CP1", name: "Nguyên liệu", desc: "Đúng chủng loại, đúng Lot, bao bì nguyên vẹn." },
  { id: "CP2", name: "Định lượng", desc: "Cấp chuẩn theo Formula/Recipe từng mã hàng." },
  { id: "CP3", name: "Độ dày", desc: "Auto Air Ring chạy ổn định, độ dày đạt dung sai thiết kế." },
  { id: "CP4", name: "Corona", desc: "Đạt chỉ số năng lượng bề mặt Dyne test theo chuẩn in/ghép." },
  { id: "CP5", name: "QC xuất xưởng", desc: "Đạt toàn bộ chỉ tiêu ngoại quan, cơ lý, kích thước và Heat Seal." },
  { id: "CP6", name: "Thành phẩm", desc: "Đạt trạng thái PASS, đủ tem nhãn và cân nặng tiêu chuẩn." },
];

const traceChain = [
  "Mã thành phẩm",
  "Lot sản xuất",
  "Formula",
  "Lot hạt nhựa",
  "Máy / Ca / Operator / QC",
  "Kho",
  "Khách hàng",
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="relative bg-offwhite py-24">
      <div className="container-x">
        {/* ── HEADER ── */}
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="tag-label inline-flex">
              <ListOrdered size={14} /> Quy Trình Sản Xuất
            </div>
            <h2 className="mb-3 text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-navy-900">
              Quy Trình Sản Xuất Màng LLDPE 3 Lớp
            </h2>
            <p className="text-grayline-600">
              Kiểm soát toàn diện từ khâu cấp hạt nhựa đến nhập kho — đảm bảo dung sai độ
              dày, độ bám dính Corona, độ bền hàn dán và truy xuất nguồn gốc theo từng Lot/Batch.
            </p>
            <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.82rem] font-semibold text-navy-700">
              <span className="rounded-full border border-grayline-200 bg-white px-4 py-1.5">
                Mã: QT-SX-LLDPE-01
              </span>
              <span className="rounded-full border border-grayline-200 bg-white px-4 py-1.5">
                Phiên bản 01 · 07/10/2026
              </span>
              <span className="rounded-full border border-grayline-200 bg-white px-4 py-1.5">
                Dây chuyền Rajoo &amp; Syncro
              </span>
            </div>
          </div>
        </Reveal>

        {/* ── NGUYÊN LIỆU & CẤU TRÚC 3 LỚP ── */}
        <Reveal>
          <div className="mb-20 grid items-stretch gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center rounded-lg border border-grayline-200 bg-white p-8 shadow-card md:p-10">
              <div className="tag-label mb-4">
                <Layers size={14} /> Nguyên Liệu &amp; Cấu Trúc Màng
              </div>
              <h3 className="mb-4 text-2xl font-extrabold text-navy-900">
                Màng 3 Lớp Với Tỷ Lệ 25 / 50 / 25
              </h3>
              <p className="mb-8 text-grayline-600">
                Nhựa nền (LLDPE, LDPE), nhựa tính năng (mLLDPE) và phụ gia công nghệ
                (Additives/PPA) được định lượng tự động theo công thức đã phê duyệt.
              </p>

              <div className="space-y-4">
                {layers.map((l) => (
                  <div key={l.name} className="rounded-md border border-grayline-200 bg-offwhite p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-bold text-navy-900">{l.name}</span>
                      <span className="text-sm font-extrabold text-orange-500">{l.pct}</span>
                    </div>
                    <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-grayline-200">
                      <div
                        className={`h-full ${l.color}`}
                        style={{ width: l.pct }}
                      />
                    </div>
                    <p className="text-[0.8rem] leading-snug text-grayline-600">{l.branches}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[340px] overflow-hidden rounded-lg shadow-lgnavy">
              <Image
                src="/images/process/02-cap-lieu-3-lop.jpg"
                alt="Hệ thống cấp liệu tự động chia 3 lớp Layer A/B/C"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/90 to-transparent p-6 pt-16">
                <p className="text-sm font-semibold text-white">
                  Hệ thống cấp/định lượng IBC Syncro chia hạt nhựa theo 3 lớp tự động.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── TIMELINE B1 – B10 ── */}
        <div className="relative">
          {/* đường trục dọc */}
          <span className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-orange-500/40 via-grayline-200 to-navy-500/40 lg:block" />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={s.code} delay={i * 40}>
                  <div className="relative grid items-center gap-6 lg:grid-cols-2 lg:gap-14">
                    {/* chấm mốc */}
                    <span className="absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-offwhite bg-orange-500 shadow-glow lg:block" />

                    {/* ẢNH */}
                    <div className={`${flip ? "lg:order-2" : ""}`}>
                      {s.img ? (
                        <div className="relative h-[260px] w-full overflow-hidden rounded-lg shadow-lgnavy sm:h-[320px]">
                          <Image
                            src={s.img}
                            alt={s.alt ?? s.title}
                            fill
                            sizes="(max-width:1024px) 100vw, 45vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="hidden h-[320px] w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-grayline-200 bg-gradient-to-br from-white to-offwhite lg:flex">
                          <div className="text-center">
                            <div className="text-5xl font-extrabold text-navy-900/10">
                              {s.code.split(" ")[0]}
                            </div>
                            <span className="mt-2 block text-[0.8rem] font-semibold uppercase tracking-[2px] text-grayline-400">
                              Công đoạn nội bộ
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* NỘI DUNG */}
                    <div className={`${flip ? "lg:order-1 lg:text-right" : ""}`}>
                      <span className="inline-block rounded-full bg-orange-500/10 px-3 py-1 text-[0.78rem] font-extrabold tracking-wide text-orange-600">
                        {s.code}
                      </span>
                      <h3 className="mb-3 mt-3 text-xl font-extrabold text-navy-900 md:text-2xl">
                        {s.title}
                      </h3>
                      <p className="text-[0.95rem] leading-[1.75] text-grayline-600">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ── ĐIỂM KIỂM SOÁT TỚI HẠN ── */}
        <Reveal>
          <div className="mt-20">
            <div className="mb-10 text-center">
              <div className="tag-label inline-flex">
                <ShieldCheck size={14} /> Điểm Kiểm Soát
              </div>
              <h3 className="text-2xl font-extrabold text-navy-900 md:text-3xl">
                6 Điểm Kiểm Soát Tới Hạn (CP)
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {controlPoints.map((cp) => (
                <div
                  key={cp.id}
                  className="group rounded-md border border-grayline-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-orange-400 hover:shadow-card"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy-900 text-[0.85rem] font-extrabold text-orange-400">
                      {cp.id}
                    </span>
                    <h4 className="font-bold text-navy-900">{cp.name}</h4>
                  </div>
                  <p className="text-[0.9rem] leading-relaxed text-grayline-600">{cp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── TRUY XUẤT NGUỒN GỐC ── */}
        <Reveal>
          <div className="mt-16 overflow-hidden rounded-lg bg-navy-900 p-8 text-white md:p-12">
            <div className="mb-8 flex items-center gap-3">
              <GitBranch size={22} className="text-orange-400" />
              <h3 className="text-xl font-extrabold md:text-2xl">Truy Xuất Nguồn Gốc</h3>
            </div>
            <p className="mb-8 max-w-2xl text-white/60">
              Toàn bộ thông tin được liên kết chặt chẽ theo chuỗi, cho phép truy xuất ngược
              từ thành phẩm về tận lô hạt nhựa và ca sản xuất.
            </p>
            <div className="flex flex-wrap items-center gap-y-3">
              {traceChain.map((node, i) => (
                <div key={node} className="flex items-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.82rem] font-semibold backdrop-blur-sm">
                    <CheckCircle2 size={14} className="text-orange-400" />
                    {node}
                  </span>
                  {i < traceChain.length - 1 && (
                    <span className="mx-2 hidden text-orange-400/70 sm:inline">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── ẢNH DÂY CHUYỀN TỔNG THỂ ── */}
        <Reveal>
          <div className="mt-16">
            <div className="relative h-[300px] w-full overflow-hidden rounded-lg shadow-lgnavy md:h-[420px]">
              <Image
                src="/images/process/01-day-chuyen-tong-the.jpg"
                alt="Toàn cảnh 3 cụm thiết bị chính: hệ cấp liệu, tháp kéo/cuộn và khuôn đùn thổi IBC"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/90 to-transparent p-6 pt-20">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Package size={16} className="text-orange-400" />
                  Dây chuyền Rajoo &amp; Syncro — hệ cấp liệu, tháp kéo/cuộn và khuôn đùn thổi IBC.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
