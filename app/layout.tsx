import type { Metadata } from "next";
import "./globals.css";
import "../styles/Markdown.css"
import AppContextProvider from "@/components/AppContext";
import EventContextProvider from "@/components/EventBusContext";


export const metadata: Metadata = {
  title: "AI-helper",
  description: "AI-helper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <EventContextProvider>
            {children}
          </EventContextProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
