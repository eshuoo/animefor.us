import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import ApolloClientWrapper from "@/lib/apolloClientWrapper";
import Header from "@/components/ui/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Anime For Us",
    description: "Website that suggests anime for both of you.",
    keywords: ["anime", "suggestions", "anilist", "watch", "together"],
    icons: {
        icon: [
            { url: "favicon/favicon.ico" },
            {
                url: "favicon/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "favicon/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
        ],
        apple: [
            {
                url: "favicon/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
        other: [
            {
                rel: "icon",
                url: "favicon/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                rel: "icon",
                url: "favicon/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                rel: "manifest",
                url: "favicon/site.webmanifest",
            },
        ],
    },
    authors: [
        { name: "@eshuoo", url: "https://github.com/eshuoo/animefor.us" },
    ],
    robots: "index, follow",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <ApolloClientWrapper>{children}</ApolloClientWrapper>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
