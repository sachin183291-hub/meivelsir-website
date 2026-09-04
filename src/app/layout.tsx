import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Dr. Meivel S | Professor & Researcher",
  description: "Portfolio website of Dr. Meivel S, Professor, Researcher, and Inventor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${playfair.variable} font-sans flex flex-col min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary tracking-wide`} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow pb-20 lg:pb-0">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
