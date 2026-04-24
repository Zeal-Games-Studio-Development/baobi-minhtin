import type { NewsArticle } from "@/lib/news/types";

/**
 * Seed news data. Replace with a CMS / REST adapter by swapping
 * implementation in `lib/news/repository.ts`.
 */
export const news: NewsArticle[] = [
  {
    slug: "nang-cap-10-day-chuyen-be-dap-2026",
    title:
      "Minh Tín Plastics tự hào nâng cấp 10 dây chuyền bế dập Carton hiện đại từ Đức",
    publishedAt: "2026-11-25",
    displayDate: "25/11/2026",
    tag: "Vận Hành",
    image: {
      src: "/images/banner_workflow_1774519717141.png",
      alt: "Dây chuyền bế dập carton hiện đại",
      width: 1200,
      height: 630,
    },
    excerpt:
      "Đầu tư 10 dàn máy bế dập tự động nhập khẩu nguyên chiếc từ Đức, nâng công suất xưởng lên gấp 3 lần và rút ngắn thời gian giao hàng cho khách B2B.",
    bodyHtml: `
      <p>Sau hơn 6 tháng chuẩn bị, Minh Tín Plastics chính thức đưa vào vận hành <strong>10 dàn máy bế dập tự động liên hợp</strong> nhập khẩu nguyên chiếc từ Đức. Đây là bước nhảy lớn về năng lực sản xuất của xưởng, đặc biệt cho các dòng thùng carton chịu lực 5-7 lớp xuất khẩu.</p>
      <p>Hệ thống mới sử dụng cảm biến laser kiểm soát vị trí bế chính xác đến 0.1mm, loại bỏ sai số khi gia công thùng carton kích thước lớn — một vấn đề thường gặp với dây chuyền cũ.</p>
      <h3>Tác động đến khách hàng B2B</h3>
      <ul>
        <li>Công suất tăng 3 lần — nhận được đơn hàng lớn (1.000.000+ thùng/tháng).</li>
        <li>Rút ngắn thời gian giao hàng từ 15 ngày xuống 7-10 ngày.</li>
        <li>Đáp ứng được tiêu chuẩn ISTA 2A cho hàng xuất khẩu thị trường Mỹ, EU.</li>
      </ul>
      <p>Khách hàng quan tâm có thể liên hệ bộ phận B2B qua hotline để được khảo sát và báo giá miễn phí.</p>
    `,
    author: { name: "Phòng Truyền Thông MTP", role: "Editor" },
    listingOrder: 1,
    seo: {
      title: "MTP nâng cấp 10 dây chuyền bế dập từ Đức",
      description:
        "Minh Tín Plastics vận hành 10 dàn máy bế dập carton tự động nhập từ Đức — tăng công suất 3 lần, rút ngắn thời gian giao hàng B2B.",
    },
  },
  {
    slug: "ra-mat-mang-pe-xanh-reu-thong-minh",
    title:
      "Ra mắt dòng Màng PE xanh rêu thông minh: Tiết kiệm tối đa, độ đàn hồi cực đại",
    publishedAt: "2026-10-18",
    displayDate: "18/10/2026",
    tag: "Sản Phẩm",
    image: {
      src: "/images/mang_pe.png",
      alt: "Màng PE xanh rêu mới",
      width: 1200,
      height: 630,
    },
    excerpt:
      "Dòng màng PE thế hệ mới với công nghệ đùn 5 lớp, độ co giãn 350%, chống tia UV và tiết kiệm 25% trọng lượng so với sản phẩm cùng độ dày.",
    bodyHtml: `
      <p>Minh Tín Plastics chính thức giới thiệu <strong>dòng Màng PE xanh rêu thông minh</strong> ứng dụng công nghệ đùn phim 5 lớp tiên tiến nhất hiện nay.</p>
      <h3>Đặc tính nổi bật</h3>
      <ul>
        <li>Độ co giãn lên đến <strong>350%</strong> (cao hơn 50% so với màng PE truyền thống).</li>
        <li>Tiết kiệm <strong>25% trọng lượng</strong> trên cùng kiện hàng.</li>
        <li>Khả năng chống tia UV, phù hợp lưu kho ngoài trời và vận chuyển đường biển.</li>
        <li>Màu xanh rêu giúp phân biệt nhanh khi quấn pallet trong kho lớn.</li>
      </ul>
      <p>Sản phẩm hiện đã có sẵn trong kho với MOQ từ 500 cuộn. Liên hệ để nhận mẫu thử miễn phí.</p>
    `,
    author: { name: "Phòng R&D MTP" },
    listingOrder: 2,
    seo: {
      title: "Ra mắt Màng PE xanh rêu thông minh — đùn 5 lớp",
      description:
        "Màng PE thế hệ mới của MTP: co giãn 350%, tiết kiệm 25% trọng lượng, chống UV. MOQ 500 cuộn, có mẫu thử miễn phí.",
    },
  },
  {
    slug: "chung-nhan-than-thien-moi-truong-2026",
    title:
      "Minh Tín Plastics đạt chứng nhận chuẩn đánh giá thân thiện môi trường năm 2026",
    publishedAt: "2026-09-05",
    displayDate: "05/09/2026",
    tag: "Hoạt Động",
    image: {
      src: "/images/banner_factory_outside_1774519666223.png",
      alt: "Nhà máy MTP đạt chuẩn xanh",
      width: 1200,
      height: 630,
    },
    excerpt:
      "MTP được trao chứng nhận Green Manufacturing 2026 nhờ hệ thống xử lý nước thải kín và sử dụng 100% hạt nhựa tái chế cho dòng sản phẩm Eco.",
    bodyHtml: `
      <p>Tháng 9 vừa qua, Minh Tín Plastics chính thức được trao chứng nhận <strong>Green Manufacturing 2026</strong> bởi Hiệp hội Bao bì Việt Nam.</p>
      <p>Chứng nhận ghi nhận các nỗ lực:</p>
      <ul>
        <li>Hệ thống xử lý nước thải khép kín, tái sử dụng 90% lượng nước trong quy trình sản xuất.</li>
        <li>Sử dụng 100% hạt nhựa tái chế cho dòng sản phẩm Eco.</li>
        <li>Lắp đặt 1.200m² pin năng lượng mặt trời trên mái nhà xưởng.</li>
        <li>Chương trình thu hồi và tái chế bao bì sau sử dụng cho khách hàng B2B lớn.</li>
      </ul>
      <p>Đây là bước đệm quan trọng để MTP đáp ứng các tiêu chuẩn ESG ngày càng khắt khe của thị trường EU.</p>
    `,
    author: { name: "Phòng Truyền Thông MTP" },
    listingOrder: 3,
    seo: {
      title: "MTP đạt chứng nhận Green Manufacturing 2026",
      description:
        "Minh Tín Plastics được trao chứng nhận Green Manufacturing 2026 — xử lý nước thải khép kín, 100% hạt nhựa tái chế dòng Eco.",
    },
  },
];
