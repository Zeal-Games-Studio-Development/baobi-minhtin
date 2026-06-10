export const site = {
  name: "Minh Tín Plastics",
  shortName: "MTP",
  tagline: "Giải Pháp Bao Bì B2B Toàn Diện",
  description:
    "Minh Tín Plastics (MTP) - Nhà sản xuất bao bì, thùng carton, túi giấy, màng nhựa PE hàng đầu cho doanh nghiệp B2B tại Việt Nam.",
  url: "https://minhtinjsc.com",
  email: "sales@minhtinjsc.com",
  contactEmail: "sales@minhtinjsc.com",
  hotline: "0812 021 610",
  hotlineHref: "tel:0812021610",
  zaloHref: "https://zalo.me/0812021610",
  messengerHref: "",
  factoryAddress: "34 Ấp 7B, xã Mỹ Yên, Tỉnh Tây Ninh, Việt Nam",
  factoryAddressFull: "34 Ấp 7B, xã Mỹ Yên, Tỉnh Tây Ninh, Việt Nam",
  officeAddress: "34 Ấp 7B, xã Mỹ Yên, Tỉnh Tây Ninh, Việt Nam",
  mapEmbedSrc:
    "https://www.google.com/maps?q=34%20%E1%BA%A4p%207B%2C%20x%C3%A3%20M%E1%BB%B9%20Y%C3%AAn%2C%20T%E1%BB%89nh%20T%C3%A2y%20Ninh%2C%20Vi%E1%BB%87t%20Nam&output=embed",
} as const;

export const routes = {
  home: "/",
  about: "/nang-luc",
  products: "/san-pham",
  product: (slug: string) => `/san-pham/${slug}`,
  news: "/tin-tuc",
  article: (slug: string) => `/tin-tuc/${slug}`,
  contact: "/lien-he",
} as const;

export const navLinks = [
  { href: routes.home, label: "Trang Chủ" },
  { href: routes.products, label: "Sản Phẩm", hasMegaMenu: true },
  { href: routes.about, label: "Năng Lực" },
  { href: routes.news, label: "Tin Tức" },
  { href: routes.contact, label: "Liên Hệ" },
] as const;
