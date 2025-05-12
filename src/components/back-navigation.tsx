"use client";

import { useRouter } from "next/navigation";

export function BackNavigation() {
  const router = useRouter();

  const handleBackNavigation = () => {
    router.back();
  };

  return (
    <div className="px-4 md:px-10">
      <button
        type="button"
        onClick={() => handleBackNavigation()}
        className="hover:underline"
      >
        Voltar
      </button>
    </div>
  );
}
