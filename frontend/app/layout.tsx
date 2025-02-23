'use client'

import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/react-query";
import { useEffect } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    document.title = "Gestão de Pedidos";
  }, []);

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
