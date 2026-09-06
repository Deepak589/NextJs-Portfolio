import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono, Manrope, Syne } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deepak Katukuri | Portfolio",
  description:
    "Backend engineer and data science graduate student building enterprise systems, ML projects, and AI-powered workflows.",
  applicationName: "Deepak Katukuri Portfolio",
  authors: [{ name: "Deepak Katukuri" }],
  creator: "Deepak Katukuri",
  keywords: [
    "Deepak Katukuri",
    "backend developer",
    "data scientist",
    "machine learning engineer",
    "portfolio",
    "Next.js",
    "PL/SQL",
    "Java",
  ],
  openGraph: {
    title: "Deepak Katukuri | Portfolio",
    description:
      "Backend engineer and data science graduate student building enterprise systems, ML projects, and AI-powered workflows.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak Katukuri | Portfolio",
    description:
      "Backend engineer and data science graduate student building enterprise systems, ML projects, and AI-powered workflows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${syne.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
