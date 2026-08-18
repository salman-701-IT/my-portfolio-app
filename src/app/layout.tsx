import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Salman Khan S. — AI Engineer & Full-Stack Developer",
  description:
    "Salman Khan S. is a Chennai-based IT student, AI/ML & computer-vision engineer, full-stack developer, and Founder & CEO of Yumaris Agency — building browser-first AI, web apps, and premium 3D experiences.",
  keywords: [
    "Salman Khan S.",
    "AI Engineer",
    "Computer Vision",
    "Full-Stack Developer",
    "TensorFlow.js",
    "Three.js",
    "React",
    "Chennai",
    "Yumaris Agency",
    "Portfolio",
  ],
  authors: [{ name: "Salman Khan S." }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Salman Khan S. — AI Engineer & Full-Stack Developer",
    description:
      "Chennai-based AI/CV engineer and full-stack developer. Founder & CEO of Yumaris Agency. Building browser-first AI, web apps, and premium 3D experiences.",
    siteName: "Salman Khan S. Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman Khan S. — AI Engineer & Full-Stack Developer",
    description:
      "Chennai-based AI/CV engineer and full-stack developer. Founder & CEO of Yumaris Agency.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
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
