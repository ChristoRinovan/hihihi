import "./globals.css";

export const metadata = {
  title: "Mischievous Love — a little game for you 💗",
  description: "A tiny, silly love note disguised as a little game.",
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff7fb",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
