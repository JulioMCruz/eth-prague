import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import localFont from "next/font/local";
import { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Web3Provider from "./providers";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const clashGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/ClashGrotesk-Extralight.otf",
      weight: "200",
    },
    {
      path: "../public/fonts/ClashGrotesk-Light.otf",
      weight: "300",
    },
    {
      path: "../public/fonts/ClashGrotesk-Regular.otf",
      weight: "400",
    },
    {
      path: "../public/fonts/ClashGrotesk-Medium.otf",
      weight: "500",
    },
    {
      path: "../public/fonts/ClashGrotesk-Semibold.otf",
      weight: "600",
    },
    {
      path: "../public/fonts/ClashGrotesk-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--font-clash-grotesk",
});

export const metadata: Metadata = {
  title: "Kairos",
  description: "Unite Your DeFi Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashGrotesk.variable} ${geistMono.variable}  antialiased`}
      >
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
