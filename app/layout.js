import "./globals.css";

export const metadata = {
  title: "Kejar Aku — Hihihii 💗",
  description: "Buat kamu yang lagi bete, cemberut, atau entahlah.",
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit:"cover",
  themeColor: "#fff7fb",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
