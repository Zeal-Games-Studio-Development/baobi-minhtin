export interface NewsArticle {
  slug: string;
  title: string;
  date: string; // display string, e.g. "25/11/2026"
  tag: string;
  image: { src: string; alt: string };
  excerpt?: string;
}

export const news: NewsArticle[] = [
  {
    slug: "nang-cap-10-day-chuyen-be-dap",
    title:
      "Minh Tín Plastics tự hào nâng cấp 10 dây chuyền bế dập Carton hiện đại từ Đức",
    date: "25/11/2026",
    tag: "Vận Hành",
    image: {
      src: "/images/banner_workflow_1774519717141.png",
      alt: "Dây chuyền bế dập",
    },
  },
  {
    slug: "mang-pe-xanh-reu-thong-minh",
    title:
      "Ra mắt dòng Màng PE xanh rêu thông minh: Tiết kiệm tối đa, độ đàn hồi cực đại",
    date: "18/10/2026",
    tag: "Sản Phẩm",
    image: { src: "/images/mang_pe.png", alt: "Màng PE" },
  },
  {
    slug: "chung-nhan-than-thien-moi-truong-2026",
    title:
      "Minh Tín Plastics đạt chứng nhận chuẩn đánh giá thân thiện môi trường năm 2026",
    date: "05/09/2026",
    tag: "Hoạt Động",
    image: {
      src: "/images/banner_factory_outside_1774519666223.png",
      alt: "Nhà máy",
    },
  },
];
