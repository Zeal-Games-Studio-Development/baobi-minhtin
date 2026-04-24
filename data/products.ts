import type { Product } from "@/lib/products/types";

/**
 * Seed product data. Preserves Vietnamese copy & specs from the legacy
 * static pages. Replace this with a CMS adapter by swapping the
 * implementation in `lib/products/repository.ts`.
 */
export const products: Product[] = [
  {
    slug: "mang-pe-stretch",
    name: "Màng Quấn Pallet (PE Stretch Film) Công Nghiệp",
    category: "pe-film",
    categoryLabel: "Màng PE / Nilon",
    shortDescription: "Màng Quấn Pallet (PE Stretch)",
    priceLabel: "Liên Hệ Báo Giá Xưởng",
    images: [
      { src: "/images/mang_pe.png", alt: "Màng PE Stretch Film" },
      { src: "/images/mang_pe.png", alt: "Màng PE Stretch Film — góc 2" },
      { src: "/images/mang_pe.png", alt: "Màng PE Stretch Film — góc 3" },
    ],
    specs: [
      { label: "Chất liệu", value: "100% Hạt nhựa LLDPE nguyên sinh nhập khẩu" },
      { label: "Độ dày", value: "12 mic - 25 mic (Tùy chỉnh theo yêu cầu)" },
      { label: "Công Nghệ Cán", value: "Film đùn 3 lớp siêu dai" },
      { label: "Màu Sắc", value: "Trắng trong suốt, Đen, Xanh (chống UV)" },
      { label: "MOQ (Số lượng tối thiểu)", value: "Từ 500 Cuộn" },
    ],
    ctas: [
      { label: "Yêu Cầu Báo Giá", href: "/contact", variant: "primary", icon: "paper-plane" },
      { label: "Gọi Tư Vấn: 090 000 0000", href: "tel:090000000", variant: "outline", icon: "phone" },
    ],
    longDescription:
      "Giải pháp màng chít bọc hàng hoá (PE Stretch Film) chuyên dụng cho công nghiệp B2B với tỷ lệ co giãn tối đa lên đến 300%. Đảm bảo tuyệt đối an toàn cho hàng hóa trong quá trình lưu kho và vận chuyển đường biển, hàng không.",
    longDescriptionHtml: `
      <p>Màng quấn Pallet của Minh Tín Plastics tự hào sở hữu độ dai và kết dính vượt trội, được sản xuất dưới quy trình công nghệ khử tĩnh điện hiện đại. Nhờ đó, sản phẩm không chỉ loại trừ bụi bẩn hiệu quả mà còn ôm sát chặt chẽ mọi kiện hàng bất kể góc cạnh sắc nhọn.</p>
      <p><strong>Ưu điểm nổi bật:</strong></p>
      <ul>
        <li>Khả năng kháng đâm thủng vượt trội, tiết kiệm 30% trọng lượng màng sử dụng so với các loại thông thường.</li>
        <li>Độ trong suốt cực cao, dễ dàng đọc mã vạch và phân biệt hàng hoá trực tiếp không cần tháo màng.</li>
        <li>Không chứa chất phụ gia độc hại, an toàn tuyệt đối ngay cả với hệ thống đóng gói kho lạnh thực phẩm.</li>
      </ul>
      <p>Sản phẩm đã đồng hành cùng hơn 300 doanh nghiệp tại nhiều cụm Khu công nghiệp, bảo vệ hàng triệu tỷ kiện hàng hóa giá trị trên toàn cầu.</p>
    `,
    featured: true,
    listingOrder: 1,
    seo: {
      title: "Màng Quấn Pallet PE Stretch Film",
      description:
        "Màng PE Stretch Film công nghiệp — LLDPE nguyên sinh, đùn 3 lớp, độ dày 12-25 mic. Liên hệ báo giá xưởng.",
    },
  },
  {
    slug: "thung-carton-5-7-lop",
    name: "Thùng Carton 5-7 Lớp Chịu Lực B2B",
    category: "carton",
    categoryLabel: "Thùng Carton",
    shortDescription: "Thùng Carton 5 Lớp Trợ Lực",
    priceLabel: "Liên Hệ Báo Giá Xưởng",
    images: [{ src: "/images/thung_carton.png", alt: "Thùng Carton 5 Lớp" }],
    specs: [
      { label: "Chất liệu Giấy", value: "Giấy Kraft nhập khẩu định lượng cao (150-175gsm)" },
      { label: "Độ dày sóng", value: "Sóng BC (5 lớp) hoặc BCE (7 lớp)" },
      { label: "Khả Năng Chịu Lực (BCT)", value: "Lên đến 120kg (có thể xếp chồng 6 lớp)" },
      { label: "Công Nghệ In", value: "In Flexo (1-4 màu) / In Offset sắc nét" },
      { label: "MOQ (Số lượng tối thiểu)", value: "Từ 1,000 Thùng" },
    ],
    ctas: [
      { label: "Yêu Cầu Báo Giá Nhóm Phân Khúc Này", href: "/contact", variant: "primary", icon: "paper-plane" },
    ],
    longDescription:
      "Giải pháp thùng carton siêu cứng cáp chuyên dùng để đóng gói hàng hóa siêu trọng, thiết bị kỹ thuật hay hàng hóa xuất khẩu vận chuyển đường biển dài ngày. Chống va đập và bục vỡ tuyệt đối.",
    longDescriptionHtml: `
      <h3>Chi tiết thiết kế Thùng Carton Trợ lực</h3>
      <p>Thùng carton 5-7 lớp của Minh Tín Plastics sử dụng cấu trúc sóng kép đặc thù giúp giảm tối đa sự rung chấn. Với việc thử nghiệm va đập và rung lắc tại phòng Lab nội bộ, thiết kế thùng luôn đạt chuẩn quốc tế (ISTA 2A) dành cho hàng hóa xuất khẩu thị trường Mỹ, châu Âu.</p>
    `,
    featured: true,
    listingOrder: 2,
  },
  {
    slug: "hop-cod-ship",
    name: "Hộp Cứng Ship COD Thương Mại Điện Tử",
    category: "cod-box",
    categoryLabel: "Hộp COD / Ship",
    shortDescription: "Hộp Ship COD Sàn TMĐT",
    priceLabel: "Liên Hệ Báo Giá Xưởng",
    images: [{ src: "/images/hop_cod.png", alt: "Hộp Ship COD" }],
    specs: [
      { label: "Phân loại", value: "Sóng E (dày 1.5 - 2mm), Bế cài thông minh không cần băng dính" },
      { label: "Chất Liệu", value: "Giấy Trắng 1 mặt / Mặt Nâu Kraft" },
      { label: "Kích Thước Sẵn Có", value: "Gần 15 size chuẩn (10x10x5cm, 20x15x10cm...)" },
      { label: "Đóng Gói Khuyên Dùng", value: "Thời trang, Mỹ phẩm, Phụ kiện công nghệ, Đồ gia dụng nhỏ" },
      { label: "In Ấn Theo Yêu Cầu (Custom)", value: "Hỗ trợ in Logo, Thank You Card bên trong hộp" },
    ],
    ctas: [{ label: "Yêu Cầu Báo Giá Sỉ", href: "/contact", variant: "primary", icon: "paper-plane" }],
    longDescription:
      "Hộp carton bế nắp gài tối ưu hóa thời gian đóng gói. Kích thước chuẩn các đơn vị vận chuyển (GHTK, GHN, Shopee, TikTok Shop...). Tăng trải nghiệm đập hộp của khách hàng, chống móp méo vượt trội.",
    featured: true,
    listingOrder: 3,
  },
  {
    slug: "tui-giay-cao-cap",
    name: "Túi Giấy Cao Cấp Ép Kim, Dập Nổi",
    category: "paper-bag",
    categoryLabel: "Túi Giấy B2B",
    shortDescription: "Túi Giấy Kraft Thân Thiện",
    priceLabel: "Liên Hệ Báo Giá Xưởng",
    images: [{ src: "/images/tui_giay.png", alt: "Túi Giấy Cao Cấp" }],
    specs: [
      { label: "Chất liệu Giấy", value: "Ivory (250-300gsm), Couche, Mỹ thuật, Kraft" },
      { label: "Kỹ Thúật Gia Công Phụ", value: "Ép kim vàng/bạc, Phủ UV Định hình, Cán mờ, Dập Nổi" },
      { label: "Loại Quai Mặc Định", value: "Quai Ruy Băng lụa, Quai xoắn giấy, Quai lụa tơ tằm" },
      { label: "Tải Trọng Tối Đa", value: "Lên đến 15kg không đứt rách quai (tuỳ định lượng)" },
      { label: "MOQ (Số lượng tối thiểu)", value: "Từ 1,000 Sản phẩm gia công" },
    ],
    ctas: [{ label: "Yêu Cầu Tư Vấn Mẫu", href: "/contact", variant: "primary", icon: "paper-plane" }],
    longDescription:
      "Giải pháp hoàn hảo để nâng tầm trải nghiệm đập hộp và định vị thương hiệu xa xỉ. Túi giấy công nghiệp dành cho ngành Thời trang, Mỹ phẩm và Quà tặng doanh nghiệp B2B với tỷ lệ sắc nét tối đa trên từng đường in Offset.",
    featured: true,
    listingOrder: 4,
  },
  {
    slug: "mang-co-nhiet-pof",
    name: "Màng Co Nhiệt POF",
    category: "pe-film",
    categoryLabel: "Màng PE / Nilon",
    shortDescription: "Màng Co Nhiệt POF",
    priceLabel: "Liên Hệ Báo Giá Xưởng",
    images: [{ src: "/images/mang_pe.png", alt: "Màng Co Nhiệt POF" }],
    specs: [
      { label: "Chất liệu", value: "POF cao cấp, trong suốt, không chứa Chlorine" },
      { label: "Độ dày", value: "12 - 19 mic" },
      { label: "Ứng dụng", value: "Đóng gói mỹ phẩm, thực phẩm, sản phẩm trưng bày" },
    ],
    ctas: [{ label: "Yêu Cầu Báo Giá", href: "/contact", variant: "primary", icon: "paper-plane" }],
    longDescription:
      "Màng co nhiệt POF độ trong suốt cao, thân thiện môi trường, thay thế tối ưu cho PVC trong ngành bao gói bán lẻ.",
    listingOrder: 5,
  },
  {
    slug: "thung-giay-am-duong",
    name: "Thùng Giấy Nắp Âm Dương",
    category: "carton",
    categoryLabel: "Thùng Carton",
    shortDescription: "Thùng Giấy Nắp Âm Dương",
    priceLabel: "Liên Hệ Báo Giá Xưởng",
    images: [{ src: "/images/thung_carton.png", alt: "Thùng Giấy Nắp Âm Dương" }],
    specs: [
      { label: "Cấu trúc", value: "Hộp 2 mảnh (nắp – đáy) tách rời" },
      { label: "Chất liệu", value: "Duplex bồi sóng E, phủ màng BOPP" },
      { label: "Ứng dụng", value: "Hộp quà tặng doanh nghiệp, mỹ phẩm cao cấp" },
    ],
    ctas: [{ label: "Yêu Cầu Báo Giá", href: "/contact", variant: "primary", icon: "paper-plane" }],
    longDescription:
      "Thùng nắp âm dương mang lại vẻ sang trọng tối giản, phù hợp định vị thương hiệu premium.",
    listingOrder: 6,
  },
  {
    slug: "hop-carton-pizza",
    name: "Hộp Carton Pizza F&B",
    category: "cod-box",
    categoryLabel: "Hộp COD / Ship",
    shortDescription: "Hộp Carton Pizza F&B",
    priceLabel: "Liên Hệ Báo Giá Xưởng",
    images: [{ src: "/images/hop_cod.png", alt: "Hộp Carton Pizza" }],
    specs: [
      { label: "Kích thước", value: "6 / 7 / 9 / 12 inch" },
      { label: "Chất liệu", value: "Giấy Kraft chống dầu, an toàn thực phẩm" },
      { label: "In ấn", value: "Flexo 1-2 màu, in Offset theo yêu cầu" },
    ],
    ctas: [{ label: "Yêu Cầu Báo Giá", href: "/contact", variant: "primary", icon: "paper-plane" }],
    longDescription:
      "Hộp pizza chuyên dụng cho ngành F&B, giữ nhiệt tốt và an toàn thực phẩm theo tiêu chuẩn FDA.",
    listingOrder: 7,
  },
  {
    slug: "tui-giay-kraft",
    name: "Túi Giấy Kraft Tái Chế",
    category: "paper-bag",
    categoryLabel: "Túi Giấy B2B",
    shortDescription: "Túi Giấy Kraft Tái Chế",
    priceLabel: "Liên Hệ Báo Giá Xưởng",
    images: [{ src: "/images/tui_giay.png", alt: "Túi Giấy Kraft" }],
    specs: [
      { label: "Chất liệu", value: "Kraft 100gsm - 180gsm, tái chế 100%" },
      { label: "Quai", value: "Quai xoắn giấy hoặc dây cói" },
      { label: "In ấn", value: "In Flexo 1-2 màu, thân thiện môi trường" },
    ],
    ctas: [{ label: "Yêu Cầu Báo Giá", href: "/contact", variant: "primary", icon: "paper-plane" }],
    longDescription:
      "Túi Kraft tái chế thân thiện môi trường, phù hợp ngành thời trang, F&B và các thương hiệu xanh.",
    listingOrder: 8,
  },
  {
    slug: "cuon-xop-hoi",
    name: "Cuộn Xốp Hơi Bong Bóng",
    category: "other",
    categoryLabel: "Phụ Kiện Đóng Gói",
    shortDescription: "Cuộn Xốp Hơi Bong Bóng",
    priceLabel: "Liên Hệ Báo Giá Xưởng",
    images: [{ src: "/images/mang_pe.png", alt: "Cuộn Xốp Hơi" }],
    specs: [
      { label: "Kích thước bóng", value: "10mm / 25mm" },
      { label: "Khổ cuộn", value: "50cm / 1m / 1.2m / 1.5m" },
      { label: "Chất liệu", value: "PE nguyên sinh trong suốt, chống sốc" },
    ],
    ctas: [{ label: "Yêu Cầu Báo Giá", href: "/contact", variant: "primary", icon: "paper-plane" }],
    longDescription:
      "Xốp hơi bong bóng đa công dụng, chống sốc cho hàng điện tử, đồ dễ vỡ và thiết bị công nghiệp.",
    listingOrder: 9,
  },
  {
    slug: "khay-giay-dinh-hinh",
    name: "Khay Giấy Định Hình",
    category: "other",
    categoryLabel: "Phụ Kiện Đóng Gói",
    shortDescription: "Khay Giấy Định Hình",
    priceLabel: "Liên Hệ Báo Giá Xưởng",
    images: [{ src: "/images/thung_carton.png", alt: "Khay Giấy Định Hình" }],
    specs: [
      { label: "Công nghệ", value: "Dập khuôn định hình (moulded pulp)" },
      { label: "Chất liệu", value: "Bột giấy tái chế, phân huỷ sinh học" },
      { label: "Ứng dụng", value: "Khay trứng, khay điện tử, khay linh kiện" },
    ],
    ctas: [{ label: "Yêu Cầu Báo Giá", href: "/contact", variant: "primary", icon: "paper-plane" }],
    longDescription:
      "Khay giấy định hình thay thế xốp EPS truyền thống, đạt chuẩn xuất khẩu EU và phân huỷ sinh học.",
    listingOrder: 10,
  },
];
