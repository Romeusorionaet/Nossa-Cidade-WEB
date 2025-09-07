"use client";

import { FormUpdateBusinessPointContextProvider } from "@/contexts/form-update-business-point.context";

export default function UpdateBusinessPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FormUpdateBusinessPointContextProvider>
      {children}
    </FormUpdateBusinessPointContextProvider>
  );
}
