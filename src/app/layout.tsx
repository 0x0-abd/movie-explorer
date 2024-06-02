"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google";
import { MovieProvider } from "./movie-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <title>Movie Explorer</title>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MovieProvider>
            {children}
          </MovieProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
