import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { SITE } from "~/config";
import "~/styles/globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

const geistSans = localFont({
  src: [
    {
      path: "../assets/fonts/geist-sans/regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../assets/fonts/geist-sans/medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../assets/fonts/geist-sans/bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-geist-sans",
});

const title = SITE.name;
const description = SITE.description;
const author = SITE.author;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s - ${title}`,
  },
  description,
  applicationName: title,
  generator: "Next.js",
  authors: [{ name: author.name, url: author.url }],
  creator: author.name,
  publisher: author.name,
  metadataBase: new URL(SITE.url),
  keywords: ["Go", "Golang", "Next.js"],
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title,
    description,
    siteName: title,
    images: {
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: title,
    },
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: {
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: title,
    },
    creator: author.twitterId,
    site: author.twitterId,
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
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistSans.variable}>
        <ThemeProvider defaultTheme="system" disableTransitionOnChange={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
