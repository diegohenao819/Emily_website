import type { Metadata, Viewport } from "next";
import { Andika, Lilita_One } from "next/font/google";
import "./globals.css";

// Andika was designed for children learning to read: clear letter shapes, single-story "a".
const andika = Andika({
  variable: "--font-andika",
  weight: ["400", "700"],
  subsets: ["latin"],
});

// Chunky letters that look cut out of construction paper.
const lilita = Lilita_One({
  variable: "--font-lilita",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Emily's Learning Garden",
    template: "%s · Emily's Learning Garden",
  },
  description: "Play, learn and watch your garden bloom! Times tables and English games made for Emily.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#a8e0ff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${andika.variable} ${lilita.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
