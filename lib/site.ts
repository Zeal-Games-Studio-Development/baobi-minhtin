export const site = {
  name: "Minh Tín Plastics",
  shortName: "MTP",
  tagline: "Giải Pháp Bao Bì B2B Toàn Diện",
  description:
    "Minh Tín Plastics (MTP) - Nhà sản xuất bao bì, thùng carton, túi giấy, màng nhựa PE hàng đầu cho doanh nghiệp B2B tại Việt Nam.",
  url: "https://minhtinjsc.com",
  email: "b2b@mtplastics.com",
  contactEmail: "contact@mtplastics.com",
  hotline: "090 000 0000",
  hotlineHref: "tel:090000000",
  zaloHref: "https://zalo.me/090000000",
  messengerHref: "",
  factoryAddress: "Lô A2, KCN Tân Bình, TP.HCM",
  factoryAddressFull: "Lô A2, KCN Tân Bình, Phường 15, TP.HCM",
  officeAddress: "Tầng 5, Tòa Nhà Bitexco, TP.HCM",
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.04948791995!2d106.62646391480111!3d10.80665499230554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752be3511eb9ab%3A0x6bba410b2716a50b!2zS0NOIFTDom4gQsOsbmgsIFBow7Dhu51uZyAxNSwgVMOibiBCw6xuaCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1689650000000!5m2!1svi!2s",
} as const;

export const routes = {
  home: "/",
  about: "/#about",
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
