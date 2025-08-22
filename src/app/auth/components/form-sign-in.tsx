"use client";

import { signInWithEmailAndPassword } from "@/actions/auth/signIn";
import { UserContext } from "@/contexts/user.context";
import { signInFormSchema } from "@/schemas/form-sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { FormError } from "./form-error";
import { APP_ROUTES } from "@/constants/app-routes";
import Image from "next/image";

type LoginFormData = z.infer<typeof signInFormSchema>;

export function FormSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const { refetchUserProfile } = useContext(UserContext);

  const router = useRouter();

  async function handleSignInForm(data: LoginFormData) {
    const { email, password } = data;

    const response = await signInWithEmailAndPassword({ email, password });

    if (!response.success) {
      console.log(response.message);
      return;
    }

    if (response.success && !isSubmitting) {
      await refetchUserProfile();

      router.push(APP_ROUTES.public.mapCity);
    }
  }

  function handleNavigateToSignUp() {
    router.push(APP_ROUTES.public.auth.signUp);
  }

  const handleLoginWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: APP_ROUTES.public.dashboard });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <motion.div
      className="mx-auto mt-10 w-[90vw] max-w-[450px] p-4 text-slate-800 drop-shadow-2xl focus:outline-hidden md:mt-28"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
      }}
    >
      <h1 className="mb-4 text-center font-bold uppercase">Fazer login</h1>

      <form className="space-y-8" onSubmit={handleSubmit(handleSignInForm)}>
        <fieldset className="flex flex-col gap-6">
          <label className="flex flex-col gap-1" htmlFor="email">
            Email
            <input
              id="email"
              placeholder="pedro@gmail.com"
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
        </fieldset>

        <div className="flex justify-center">
          <button
            type="submit"
            className="group w-32 gap-4 rounded-md bg-blue-400 p-1 text-white hover:bg-blue-500 hover:duration-300"
          >
            {isSubmitting ? <p>Carregando...</p> : <p>Entrar</p>}
          </button>
        </div>
      </form>

      <div className="mt-6 flex justify-center">
        <button
          type={"button"}
          onClick={handleLoginWithGoogle}
          className="h-10 w-10 gap-4 hover:scale-110"
        >
          <Image
            src="/imgs/logos/google-logo.png"
            alt="logo google"
            width={100}
            height={100}
          />
        </button>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleNavigateToSignUp}
          className="w-32 gap-4 rounded-md bg-blue-400 p-1 text-white hover:bg-blue-500 hover:duration-300"
        >
          Criar conta
        </button>
      </div>
    </motion.div>
  );
}
