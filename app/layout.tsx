import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Moravy Oum, interactive résumé";
const description =
  "A software engineer’s record you can talk to. Eight months at Xero: incidents owned, full-stack features shipped, production noise cut in half, with AI as a force-multiplier. Don’t take his word for it. Ask the page.";

export const metadata: Metadata = {
  // TODO: set to your real domain once deployed (e.g. https://moravyoum.com)
  metadataBase: new URL("https://moravy.github.io"),
  title,
  description,
  authors: [{ name: "Moravy Oum" }],
  openGraph: { title, description, type: "website", siteName: "Moravy Oum" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#f3eee3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <div className="paper-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
