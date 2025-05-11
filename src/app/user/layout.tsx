"use client";

import { Header } from "@/components/header/index";
import { MobileSideMenuFormContextProvider } from "@/contexts/mobile-side-menu-provider";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MobileSideMenuFormContextProvider>
      <Header />
      {children}
    </MobileSideMenuFormContextProvider>
  );
}
