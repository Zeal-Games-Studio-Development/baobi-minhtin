import Image from "next/image";
import { ArrowRight, CheckCircle2, Factory, Layers, ListOrdered, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

type Stage = {
  code: string;
  phase: string;
  title: string;
  desc: string;
  note: string;
  image: string;
  alt: string;
  caption: string;
};

/** Tên ảnh đặt theo đúng nội dung ảnh, không theo thứ tự công đoạn. */
const stages: Stage[] = [
  {
    code: "01",
    phase: "Chuẩn bị nguyên liệu",
    title: "Kho và kiểm tra nguyên liệu",
    desc: "Hạt nhựa được nhập theo từng lô, có nhãn ghi rõ chủng loại và số batch. Trước khi đưa vào sản xuất, nguyên liệu được đối chiếu với lệnh sản xuất để bảo đảm đúng grade, đúng lô và còn trong hạn sử dụng.",
    note: "Nguyên liệu không khớp chủng loại hoặc lô phải tách riêng, không cấp vào máy.",
    image: "kho-nguyen-lieu-hat-nhua.jpg",
    alt: "Các pallet hạt nhựa polyethylene trong kho nguyên liệu",
    caption: "Kho hạt nhựa nguyên liệu",
  },
  {
    code: "02",
    phase: "Phối trộn và cấp liệu",
    title: "Cân định lượng và cấp liệu 3 lớp",
    desc: "Nguyên liệu được định lượng theo công thức của từng lớp rồi cấp riêng về cụm đùn A, B và C. Tuyến cấp liệu có nhãn nhận diện từng nhánh để tránh nhầm lẫn giữa các loại nhựa nền và phụ gia.",
    note: "Kiểm soát cả thành phần trong mỗi lớp lẫn tỷ lệ đóng góp của ba lớp theo mã hàng.",
    image: "cap-lieu-nguyen-lieu-3-lop.jpg",
    alt: "Hệ thống ống cấp liệu chia nhánh cho ba lớp A, B và C",
    caption: "Cấp liệu riêng cho lớp A, B và C",
  },
  {
    code: "03",
    phase: "Sản xuất màng",
    title: "Đồng đùn và thổi màng 3 lớp",
    desc: "Ba dòng nhựa nóng chảy được đồng đùn qua một đầu khuôn chung để tạo màng nhiều lớp. Bọt màng sau khi thổi được làm mát bằng vòng gió, kéo lên tháp và ép xẹp thành màng phẳng trước khi thu cuộn.",
    note: "Thông số vận hành được thiết lập theo hướng dẫn của nhà sản xuất máy và tiêu chuẩn mã hàng.",
    image: "day-chuyen-thoi-mang-3-lop-rajoo.jpg",
    alt: "Ba cụm thiết bị: cấp liệu, tháp kéo và đầu đùn thổi màng",
    caption: "Dây chuyền thổi màng 3 lớp Rajoo",
  },
  {
    code: "04",
    phase: "Xử lý bề mặt",
    title: "Xử lý Corona",
    desc: "Bề mặt màng được xử lý corona để tăng năng lượng bề mặt, giúp mực in và keo ghép bám dính tốt hơn. Công suất và liều xử lý được theo dõi trên màn hình điều khiển của bộ phát corona.",
    note: "Mức xử lý được kiểm tra lại bằng dung dịch thử bề mặt theo yêu cầu của từng mã hàng.",
    image: "man-hinh-may-corona.jpg",
    alt: "Màn hình điều khiển bộ phát corona hiển thị công suất và liều xử lý",
    caption: "Màn hình điều khiển bộ phát corona",
  },
  {
    code: "05",
    phase: "Thu cuộn",
    title: "Vận hành cuộn màng",
    desc: "Màng được thu cuộn theo khổ, đường kính và chiều dài quy định. Người vận hành theo dõi độ căng, độ phẳng bề mặt, tình trạng mép màng và độ đồng đều của cuộn trong suốt quá trình chạy.",
    note: "Cuộn lỗi mép, nhăn hoặc lệch tâm được đánh dấu và xử lý riêng.",
    image: "van-hanh-cuon-mang.jpg",
    alt: "Tháp kéo và cụm thu cuộn màng trong nhà xưởng",
    caption: "Cụm thu cuộn màng",
  },
  {
    code: "06",
    phase: "Kiểm tra xuyên suốt",
    title: "Kiểm soát chất lượng",
    desc: "Mẫu màng được đo độ dày, kiểm tra ngoại quan và các chỉ tiêu cơ lý tại khu vực kiểm tra chất lượng. Kết quả được ghi nhận theo từng lô để làm cơ sở giải phóng hàng.",
    note: "QC diễn ra trong suốt quá trình sản xuất và khi hoàn thiện, không chỉ ở công đoạn cuối.",
    image: "khu-vuc-kiem-tra-chat-luong.jpg",
    alt: "Kỹ thuật viên vận hành thiết bị đo tại khu vực kiểm tra chất lượng",
    caption: "Khu vực kiểm tra chất lượng",
  },
  {
    code: "07",
    phase: "Hoàn thiện và xuất hàng",
    title: "Cân, ghi nhận và giao hàng",
    desc: "Cuộn thành phẩm được cân, in tem và ghi nhận thông tin mã hàng, số lô, khối lượng. Hàng đã được xác nhận đạt mới được chuyển sang khu vực xuất hàng để đối chiếu với đơn đặt hàng.",
    note: "Hàng còn chờ kết quả kiểm tra không được xuất khỏi nhà máy.",
    image: "tram-can-thanh-pham.jpg",
    alt: "Trạm cân thành phẩm có màn hình nhập thông tin và máy in tem",
    caption: "Trạm cân thành phẩm",
  },
];

const gallery = [
  { image: "thanh-pham-cuon-mang-lldpe.jpg", alt: "Các cuộn màng thành phẩm buộc đai và dán tem trên pallet", caption: "Cuộn màng thành phẩm đã dán tem" },
  { image: "khu-vuc-xuat-hang.jpg", alt: "Cửa cuốn khu vực xuất hàng của nhà máy", caption: "Khu vực xuất hàng" },
];

const checkpoints = [
  { title: "Đúng nguyên liệu", desc: "Nhận diện grade, số lô và công thức riêng cho từng lớp A/B/C." },
  { title: "Đúng quy cách", desc: "Độ dày, khổ và chỉ tiêu kiểm tra theo tiêu chuẩn mã hàng đã thống nhất." },
  { title: "Đúng trạng thái QC", desc: "Tách biệt hàng chờ kiểm tra; chỉ giải phóng lô đã được xác nhận đạt." },
];

const traceChain = ["Lô nguyên liệu", "Công thức & lệnh sản xuất", "Máy / ca sản xuất", "Kết quả QC", "Mã cuộn & giao hàng"];

export default function CapacityProcess() {
  return (
    <section id="process" aria-labelledby="capacity-process-title" className="relative overflow-hidden bg-offwhite py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <div className="tag-label inline-flex">
              <ListOrdered size={14} /> Quy trình sản xuất
            </div>
            <h2 id="capacity-process-title" className="mb-3 text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-navy-900">
              Quy trình sản xuất màng LLDPE 3 lớp
            </h2>
            <p className="text-grayline-600">
              Bảy công đoạn từ nguyên liệu đến xuất hàng, với chất lượng được kiểm soát xuyên suốt chứ không chỉ ở bước cuối.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.82rem] font-semibold text-navy-700">
              <span className="inline-flex items-center gap-2 rounded-full border border-grayline-200 bg-white px-4 py-1.5">
                <Factory size={13} className="text-orange-500" /> Dây chuyền Rajoo
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-grayline-200 bg-white px-4 py-1.5">
                <Layers size={13} className="text-orange-500" /> Màng 3 lớp A/B/C
              </span>
            </div>
          </div>
        </Reveal>

        {/* ── TIMELINE DẠNG CÂY ── */}
        <div className="relative">
          <span className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-orange-500/40 via-grayline-200 to-navy-500/40 lg:block" />

          <ol className="space-y-10 lg:space-y-16">
            {stages.map((stage, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={stage.code}>
                  <Reveal delay={i * 40}>
                    <div className="relative grid items-center gap-6 lg:grid-cols-2 lg:gap-14">
                      <span className="absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-offwhite bg-orange-500 shadow-glow lg:block" />

                      {/* ẢNH */}
                      <figure className={flip ? "lg:order-2" : ""}>
                        <div className="overflow-hidden rounded-lg border border-grayline-200 bg-white shadow-lgnavy">
                          <div className="relative aspect-[4/3] w-full bg-white">
                            <Image
                              src={`/images/process/${stage.image}`}
                              alt={stage.alt}
                              fill
                              sizes="(max-width:1024px) 100vw, 45vw"
                              className="object-contain p-3"
                            />
                          </div>
                          <figcaption className="border-t border-grayline-200 px-5 py-3 text-sm text-grayline-600">
                            {stage.caption}
                          </figcaption>
                        </div>
                      </figure>

                      {/* NỘI DUNG */}
                      <div className={flip ? "lg:order-1 lg:text-right" : ""}>
                        <div className={`mb-4 flex items-center gap-3 ${flip ? "lg:flex-row-reverse" : ""}`}>
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-navy-900 text-sm font-extrabold text-orange-400">
                            {stage.code}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-[0.14em] text-orange-600">
                            {stage.phase}
                          </span>
                        </div>
                        <h3 className="mb-3 text-xl font-extrabold leading-snug text-navy-900 md:text-2xl">
                          {stage.title}
                        </h3>
                        <p className="text-[0.95rem] leading-[1.8] text-grayline-600">{stage.desc}</p>
                        <div className={`mt-5 flex items-start gap-2.5 border-t border-grayline-200 pt-4 text-sm leading-relaxed text-navy-700 ${flip ? "lg:flex-row-reverse lg:text-right" : ""}`}>
                          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-orange-500" />
                          <p>{stage.note}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ── ẢNH BỔ SUNG ── */}
        <Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14">
            {gallery.map((item) => (
              <figure key={item.image} className="overflow-hidden rounded-lg border border-grayline-200 bg-white shadow-card">
                <div className="relative aspect-[3/2] w-full bg-white">
                  <Image
                    src={`/images/process/${item.image}`}
                    alt={item.alt}
                    fill
                    sizes="(max-width:640px) 100vw, 45vw"
                    className="object-contain p-3"
                  />
                </div>
                <figcaption className="border-t border-grayline-200 px-5 py-3 text-sm text-grayline-600">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        {/* ── KIỂM SOÁT & TRUY XUẤT ── */}
        <Reveal>
          <div className="mt-14 rounded-lg bg-navy-900 p-6 text-white md:mt-20 md:p-10">
            <div className="mb-7 flex items-center gap-3">
              <ShieldCheck size={24} className="shrink-0 text-orange-400" />
              <h3 className="text-xl font-extrabold md:text-2xl">Kiểm soát xuyên suốt từng lô sản xuất</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {checkpoints.map((point) => (
                <div key={point.title} className="border-l-2 border-orange-500 pl-4">
                  <h4 className="mb-2 font-bold">{point.title}</h4>
                  <p className="text-sm leading-relaxed text-white/70">{point.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/15 pt-6 text-sm text-white/80" aria-label="Chuỗi thông tin truy xuất">
              {traceChain.map((label, index) => (
                <span key={label} className="inline-flex items-center gap-2">
                  {index > 0 && <ArrowRight size={14} aria-hidden="true" className="text-orange-400" />}
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-grayline-600">
            Nội dung giới thiệu tổng quan quy trình sản xuất. Công thức, thông số máy, dung sai và phương pháp kiểm tra cụ thể được xác định trong tài liệu kỹ thuật áp dụng cho từng mã hàng.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
