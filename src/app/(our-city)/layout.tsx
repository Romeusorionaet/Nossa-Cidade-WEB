"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header/index";
import { FormRegisterBusinessPointContextProvider } from "@/contexts/form-register-business-point.context";
import { ManageTagsForBusinessPointContextProvider } from "@/contexts/manage-tags-for-business-point.context";
import { MobileSideMenuFormContextProvider } from "@/contexts/mobile-side-menu-provider";

export default function BusinessPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ManageTagsForBusinessPointContextProvider>
      <FormRegisterBusinessPointContextProvider>
        <MobileSideMenuFormContextProvider>
          <Header />
          {children}
          <Footer />
        </MobileSideMenuFormContextProvider>
      </FormRegisterBusinessPointContextProvider>
    </ManageTagsForBusinessPointContextProvider>
  );
}
