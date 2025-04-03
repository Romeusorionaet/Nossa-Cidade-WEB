"use client";

import { Header } from "@/components/header/index";
import { ControlLocationForBusinessPointContextProvider } from "@/contexts/control-location-for-business-point.context";
import { FormBusinessPointContextProvider } from "@/contexts/form-business-point.context";
import { ManageTagsForBusinessPointContextProvider } from "@/contexts/manage-tags-for-business-point.context";
import { MobileSideMenuFormContextProvider } from "@/contexts/mobile-side-menu-provider";

export default function BusinessPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ControlLocationForBusinessPointContextProvider>
      <ManageTagsForBusinessPointContextProvider>
        <FormBusinessPointContextProvider>
          <MobileSideMenuFormContextProvider>
            <Header />
            {children}
          </MobileSideMenuFormContextProvider>
        </FormBusinessPointContextProvider>
      </ManageTagsForBusinessPointContextProvider>
    </ControlLocationForBusinessPointContextProvider>
  );
}
