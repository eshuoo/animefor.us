import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ApolloClientWrapper from "@/lib/apolloClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime For Us",
  description: "Website that suggests anime for both of you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloClientWrapper>{children}</ApolloClientWrapper>
      </body>
    </html>
  );
}
