"use client";

import { resetPassword } from "@/actions/auth/reset-password";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  searchParams: { token: string };
}

export default function ForgotPassword() {
  const [newPassword, setNewPassword] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const handleSaveNewPassword = async () => {
    const { message } = await resetPassword({
      newPassword,
      token,
    });

    alert(message);
  };

  return (
    <main>
      <h1>Recuperar senha</h1>

      <input
        type="text"
        placeholder="nova senha"
        onChange={(e) => setNewPassword(e.target.value)}
        className="border border-black p-1"
      />

      <button
        type="button"
        onClick={() => handleSaveNewPassword()}
        className="border border-black p-1"
      >
        Salvar
      </button>
    </main>
  );
}
