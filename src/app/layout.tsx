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
  title: "Salman Khan — Full-Stack Developer & Designer",
  description:
    "Salman Khan is a full-stack developer and UI designer based in Bengaluru, India, crafting performant web apps, design systems, and cloud-native products.",
  keywords: [
    "Salman Khan",
    "Full-Stack Developer",
    "UI Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Cloud",
    "Portfolio",
  ],
  authors: [{ name: "Salman Khan" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Salman Khan — Full-Stack Developer & Designer",
    description:
      "Crafting performant web apps, design systems, and cloud-native products from Bengaluru, India.",
    siteName: "Salman Khan Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman Khan — Full-Stack Developer & Designer",
    description:
      "Crafting performant web apps, design systems, and cloud-native products from Bengaluru, India.",
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
