"use client";

import { signUp } from "@/actions/auth/sign-up";
import { signUpFormSchema } from "@/schemas/form-sign-up.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { FormError } from "./form-error";
import { APP_ROUTES } from "@/constants/app-routes";
import { useState } from "react";
import { User } from "lucide-react";
import Image from "next/image";

type LoginFormData = z.infer<typeof signUpFormSchema>;

export function FormSignUp() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const router = useRouter();

  async function handleSignInForm(data: LoginFormData) {
    const { username, email, password } = data;

    const response = await signUp({
      username,
      email,
      password,
      file,
    });

    if (!response.success) {
      console.log(response.message);
    }

    if (response.success && !isSubmitting) {
      handleNavigateToSignIn();
    }
  }

  const handleNavigateToSignIn = () => {
    router.push(APP_ROUTES.public.auth.signIn);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  return (
    <motion.div
      className="mx-auto w-[90vw] max-w-[450px] rounded-xl p-4 text-slate-800 drop-shadow-2xl focus:outline-hidden lg:mt-28"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
      }}
    >
      <h1 className="mb-4 text-center font-bold uppercase">Criar conta</h1>

      <form className="space-y-8" onSubmit={handleSubmit(handleSignInForm)}>
        <div className="flex items-center justify-center gap-4">
          <div>
            <label htmlFor="dropzone-file">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800">
                {file ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User className="text-white/50" />
                )}
              </div>

              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <fieldset className="flex flex-col gap-6">
          <label className="flex flex-col gap-1" htmlFor="username">
            Nome completo
            <input
              id="username"
              placeholder="Romeu Soares de Souto"
              className="rounded-md bg-slate-200 p-2"
              {...register("username")}
            />
            <FormError errors={errors.username?.message} />
          </label>

          <label className="flex flex-col gap-1" htmlFor="email">
            Email
            <input
              id="email"
              placeholder="romeu@gmail.com"
              className="rounded-md bg-slate-200 p-2"
              {...register("email")}
            />
            <FormError errors={errors.email?.message} />
          </label>

          <label className="flex flex-col gap-1" htmlFor="password">
            Senha
            <input
              type="password"
              id="password"
              placeholder="******"
              className="rounded-md bg-slate-200 p-2"
              {...register("password")}
            />
            <FormError errors={errors.password?.message} />
          </label>

          <label className="flex flex-col gap-1" htmlFor="passwordRepeat">
            Repetir senha
            <input
              type="password"
              id="passwordRepeat"
              placeholder="******"
              className="rounded-md bg-slate-200 p-2"
              {...register("passwordRepeat")}
            />
            <FormError errors={errors.passwordRepeat?.message} />
          </label>
        </fieldset>

        <div className="flex justify-center">
          <button
            type="submit"
            className="group w-32 gap-4 rounded-md bg-blue-400 p-1 text-white hover:bg-blue-500 hover:duration-300"
          >
            {isSubmitting ? <p>Carregando...</p> : <p>Criar</p>}
          </button>
        </div>
      </form>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={handleNavigateToSignIn}
          className="w-full gap-4 font-semibold hover:underline"
        >
          Voltar a tela de login
        </button>
      </div>
    </motion.div>
  );
}
