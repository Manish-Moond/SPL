import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://superpremierleague.xyz"),
    title: "Super Premier League (SPL) — Khandwa",
    description:
        "Khandwa's own cricket league. Register as a player, enter the auction, and play under the lights. Open to rural and urban players across Khandwa district.",
    icons: {
        icon: "/icon.svg",
    },
    openGraph: {
        title: "Super Premier League (SPL) — Khandwa",
        description:
            "Khandwa's own cricket league. Register as a player, enter the auction, and play under the lights.",
        url: "https://superpremierleague.xyz",
        siteName: "Super Premier League",
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Super Premier League (SPL) — Khandwa",
        description:
            "Khandwa's own cricket league. Register as a player, enter the auction, and play under the lights.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
            >
                <Header />
                {children}
                <Toaster />
            </body>
        </html>
    );
}
