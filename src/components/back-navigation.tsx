"use client";

import { useRouter } from "next/navigation";

export function BackNavigation() {
  const router = useRouter();

  const handleBackNavigation = () => {
    router.back();
  };

  return (
    <div className="px-10 py-6">
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
