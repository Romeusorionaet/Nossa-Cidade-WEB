"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { NotFoundTokenError } from "./not-found-token-error";
import { useState } from "react";
import { confirmationEmail } from "@/actions/auth/confirmation-email";
import { sendNewTokenConfirmation } from "@/actions/auth/send-new-token-confirmation";

export function HandleConfirmEmail() {
  const [tokenExpired, setTokenExpired] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token) {
    return <NotFoundTokenError />;
  }

  const handleConfirmEmailAndNavigateToSignIn = async () => {
    const { messageSuccess, messageError } = await confirmationEmail({ token });

    if (messageSuccess) {
      alert(messageSuccess);
      router.push("/sign-in");
    }

    if (messageError) {
      setTokenExpired(true);
      alert(messageError);
    }
  };

  const handleSendNewTokenConfirmationAndNavigateToHome = async () => {
    if (!email) {
      return alert(
        "Houve um problema com o acesso ao email, por favor, repita novamente o passo realizado anteiormente.",
      );
    }

    const { messageSuccess, messageError } = await sendNewTokenConfirmation({
      email,
    });

    if (messageSuccess) {
      alert(messageSuccess);
      router.push("/sign-in");
    }

    if (messageError) {
      alert(messageError);
    }
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        disabled={!token || tokenExpired}
        onClick={handleConfirmEmailAndNavigateToSignIn}
        className="border border-black p-1 disabled:cursor-not-allowed disabled:opacity-50 max-md:mt-8"
      >
        Confirmar
      </button>

      <button
        type="button"
        data-value={tokenExpired}
        onClick={handleSendNewTokenConfirmationAndNavigateToHome}
        className="border border-black p-1 data-[value=false]:hidden"
      >
        Reenviar token de confirmação para: <br />
        <span>{email}</span>
      </button>
    </div>
  );
}
