import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ApolloClientProvider from "@/lib/providers/ApolloClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FastBuy",
  description: "FastBuy - A product renting and buying/selling application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-lt-installed="true">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}
