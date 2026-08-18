import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Baskerville, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Salman Khan S. — Founder. Builder. AI Entrepreneur.",
  description:
    "Salman Khan S. — Founder & CEO of Yumaris Agency. Building AI-powered products, software systems, EdTech platforms, and business automation. Problem first. Technology second. Impact always.",
  keywords: [
    "Salman Khan S.",
    "Founder",
    "AI Entrepreneur",
    "Yumaris Agency",
    "AI Agents",
    "RAG",
    "EdTech",
    "Business Automation",
    "Software Development",
    "Chennai",
    "Portfolio",
  ],
  authors: [{ name: "Salman Khan S." }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Salman Khan S. — Founder. Builder. AI Entrepreneur.",
    description:
      "Founder & CEO of Yumaris Agency. Building AI-powered products, software systems, EdTech platforms, and business automation that transform real-world problems into scalable technology.",
    siteName: "Salman Khan S. Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman Khan S. — Founder. Builder. AI Entrepreneur.",
    description:
      "Founder & CEO of Yumaris Agency. Building AI, software, EdTech, and automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} ${poppins.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SonnerToaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
