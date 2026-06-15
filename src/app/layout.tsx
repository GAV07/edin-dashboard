import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { AuthProvider } from "@/components/AuthProvider";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";
import { ConditionalLayout } from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: "Edin Capital",
  description: "A new beginning for venture capital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
              send_page_view: false
            });
          `}
        </Script>
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-base)",
          lineHeight: "var(--leading-normal)",
          color: "var(--text-primary)",
          background: "var(--surface-app)",
          WebkitFontSmoothing: "antialiased",
        }}
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
