"use client";

import { FormUpdateStepOneBusinessPointContextProvider } from "@/contexts/form-update-step-one-business-point.context";

export default function UpdateBusinessPointLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FormUpdateStepOneBusinessPointContextProvider>
      {children}
    </FormUpdateStepOneBusinessPointContextProvider>
  );
}
