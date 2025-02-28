"use client";

import { api } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { NotFoundTokenError } from "./not-found-token-error";

export function HandleConfirmEmail() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return <NotFoundTokenError />;
  }

  const handleConfirmEmailAndNavigateToSignIn = async () => {
    try {
      const response = await api.post(
        "/auth/confirm-email",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      router.push("/sign-in");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <button
      type="button"
      className="hover:text-base_color_text_top max-md:mt-8"
      disabled={!token}
      onClick={handleConfirmEmailAndNavigateToSignIn}
    >
      Confirmar
    </button>
  );
}
