// app/layout.tsx
import type { Metadata as NextMetadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

// Extend the existing Metadata type
interface Metadata extends NextMetadata {
  X?: {
    card: string;
    title: string;
    description: string;
    images: string[];
    creator: string;
  };
}

const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:
      "Lucy W. Mwangi | Next.js & React Developer | AI Integration Specialist",
    template: "%s | Lucy W. Mwangi",
  },
  description:
    "Senior Full Stack Developer specializing in Next.js, React, and AI Integration. Expert in building high-performance web applications with modern technologies.",
  keywords: [
    "Next.js Developer",
    "React Developer",
    "AI Integration",
    "Full Stack Developer",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Frontend Developer",
    "Software Engineer",
    "Web Applications",
    "Performance Optimization",
    "Lucy W. Mwangi",
  ],
  authors: [{ name: "Lucy W. Mwangi" }],
  creator: "Lucy W. Mwangi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lucy-wanjiru-mwangi.vercel.app",
    siteName: "Lucy W. Mwangi Portfolio",
    title: "Lucy W. Mwangi | Next.js & React Developer",
    description:
      "Senior Full Stack Developer specializing in Next.js, React, and AI Integration. Building high-performance web applications.",
    images: [
      {
        url: "/imgs/website.png",
        width: 1200,
        height: 630,
        alt: "Lucy W. Mwangi - Next.js & React Developer",
      },
    ],
  },
  X: { // Now this is valid
    card: "summary_large_image",
    title: "Lucy W. Mwangi | Next.js & React Developer",
    description:
      "Junior Full Stack Developer specializing in Next.js, React, and AI Integration",
    images: ["/imgs/website.png"],
    creator: "@lucy-sees",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://lucy-wanjiru-mwangi.vercel.app",
  },
  icons: {
    icon: "/imgs/logo.png",
    apple: "/imgs/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={firaCode.className}>{children}</body>
    </html>
  );
}