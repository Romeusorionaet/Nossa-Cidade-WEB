"use client";

import { UserContext } from "@/contexts/user.context";
import { useContext, useState } from "react";
import Image from "next/image";
import { forgotPassword } from "@/actions/auth/forgot-password";
import { changePassword } from "@/actions/auth/change-password";
import { useCountdown } from "@/hooks/use-count-down";
import { KEY_LOCAL_STORAGE } from "@/constants/key-local-storage";
import { BackNavigation } from "@/components/back-navigation";

export function ProfileContent() {
  const { profile, isLoadingDataUserProfile } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isLoadingForgotPasswordRequest, setIsLoadingForgotPasswordRequest] =
    useState(false);
  const { countdown, startCountdown, formatTime } = useCountdown({
    storageKey: KEY_LOCAL_STORAGE.FORGOT_PASSWORD_EXPIRY,
    durationSeconds: 300,
  });

  const isCountdownActive = countdown > 0;

  if (isLoadingDataUserProfile) {
    return <p>Carrregando</p>;
  }

  if (!profile.publicId) {
    return <p>Faça login</p>;
  }

  const handleForgotPassword = async () => {
    setIsLoadingForgotPasswordRequest(true);
    const { message } = await forgotPassword();

    startCountdown();
    alert(message);
    setIsLoadingForgotPasswordRequest(false);
  };

  const handleChangePassword = async () => {
    const { message } = await changePassword({ newPassword, currentPassword });

    alert(message);
  };

  const avatar = profile?.avatar ? profile.avatar : "/imgs/others/bg-user.png";

  return (
    <section>
      <BackNavigation />

      <div className="mx-auto mt-10 max-w-xl space-y-6 rounded-2xl bg-white p-6 shadow-md">
        <h1 className="text-center">Profile</h1>

        <div className="flex flex-col items-center space-y-4">
          <div className="h-28 w-28">
            {/* TODO Upload image here */}
            <Image
              src={avatar}
              alt="avatar"
              width={500}
              height={500}
              className="h-full w-full rounded-full object-cover shadow"
            />
          </div>
          <h2 className="font- text-2xl uppercase">{profile.username}</h2>
          <p className="text-gray-400">{profile.email}</p>
        </div>

        <div className="space-y-4">
          <h3>Esqueceu a senha</h3>

          <div>
            <button
              type="button"
              onClick={() => handleForgotPassword()}
              disabled={isCountdownActive}
              data-value={isLoadingForgotPasswordRequest}
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 disabled:pointer-events-none disabled:opacity-50 data-[value=true]:pointer-events-none data-[value=true]:opacity-50"
            >
              {isCountdownActive
                ? `Enviar novamente ${formatTime(countdown)}`
                : "Recuperar senha"}
            </button>

            <div className="h-5">
              <p
                data-value={isCountdownActive}
                className="opacity-50 data-[value=false]:hidden"
              >
                Um email foi enviado, por favor check sua caixa de entrada ou
                spam.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3>Trocar senha</h3>
          <input
            type="password"
            placeholder="Senha atual"
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Nova senha"
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => handleChangePassword()}
            className="w-full rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
          >
            Mudar senha
          </button>
        </div>
      </div>
    </section>
  );
}
