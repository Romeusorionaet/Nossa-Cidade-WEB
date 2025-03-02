"use client";

import { UserContext } from "@/contexts/user.context";
import { useContext, useState } from "react";
import Image from "next/image";
import { forgotPassword } from "@/actions/auth/forgot-password";
import { changePassword } from "@/actions/auth/change-password";

export function ProfileContent() {
  const { profile, isLoadingDataUserProfile } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  if (isLoadingDataUserProfile) {
    return <p>Carrregando</p>;
  }

  if (!profile.publicId) {
    return <p>Faça login</p>;
  }

  const handleForgotPassword = async () => {
    const { message } = await forgotPassword();

    alert(message);
  };

  const handleChangePassword = async () => {
    const { message } = await changePassword({ newPassword, currentPassword });

    alert(message);
  };

  return (
    <section>
      <h2>{profile.username}</h2>
      <p>{profile.email}</p>
      {profile.avatar && (
        <div className="h-28 w-28">
          <Image
            src={profile.avatar}
            alt="avatar"
            width={500}
            height={500}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      )}

      <h3>Esqueceu a senha</h3>
      <button
        type="button"
        onClick={() => handleForgotPassword()}
        className="cursor-pointer border border-black p-1"
      >
        Recuperar senha
      </button>
      <h3>Trocar senha</h3>
      <input
        type="text"
        placeholder="senha atual"
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="border border-black p-1"
      />
      <input
        type="text"
        placeholder="nova senha"
        onChange={(e) => setNewPassword(e.target.value)}
        className="border border-black p-1"
      />
      <button
        type="button"
        onClick={() => handleChangePassword()}
        className="cursor-pointer border border-black p-1"
      >
        Mudar senha
      </button>
    </section>
  );
}
