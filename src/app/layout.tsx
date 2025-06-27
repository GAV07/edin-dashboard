import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import Script from "next/script";
import { AuthProvider } from "@/components/AuthProvider";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";
import { ConditionalLayout } from "@/components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Edin Capital",
  description:
    "A new beginning for venture capital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-60LQ571T8N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-60LQ571T8N', {
              send_page_view: false // We'll handle page views manually with user context
            });
          `}
        </Script>
      </head>
      <body
        className={twMerge(
          inter.className,
          "flex antialiased h-screen overflow-hidden bg-gray-100"
        )}
      >
        <AuthProvider>
          <AnalyticsWrapper>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </AnalyticsWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
