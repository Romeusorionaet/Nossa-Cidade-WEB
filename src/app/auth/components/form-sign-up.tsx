"use client";

import { signUp } from "@/actions/auth/sign-up";
import { signUpFormSchema } from "@/schemas/form-sign-up.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { FormError } from "./form-error";

type LoginFormData = z.infer<typeof signUpFormSchema>;

export function FormSignUp() {
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
      picture: "https://avatar.example.com",
    });

    if (!response.success) {
      console.log(response.message);
    }

    if (response.success && !isSubmitting) {
      handleNavigateToSignIn();
    }
  }

  const handleNavigateToSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <motion.div
      className="bg-base_color_text_top mx-auto mt-28 w-[90vw] max-w-[450px] rounded-xl p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
      }}
    >
      <h1 className="text-base_one_reference_header mb-4 text-center font-bold uppercase">
        Criar conta
      </h1>

      <form className="space-y-8" onSubmit={handleSubmit(handleSignInForm)}>
        <div className="flex items-center justify-center gap-4">
          <p>local avatar</p>

          <div>
            <p>local upload button</p>
          </div>
        </div>

        <fieldset className="flex flex-col gap-6">
          <label className="flex flex-col" htmlFor="username">
            Nome completo
            <input
              id="username"
              placeholder="Nome e sobrenome"
              className="p-2"
              {...register("username")}
            />
            <FormError errors={errors.username?.message} />
          </label>

          <label className="flex flex-col" htmlFor="email">
            Email
            <input
              id="email"
              placeholder="pedro@gmail.com"
              className="p-2"
              {...register("email")}
            />
            <FormError errors={errors.email?.message} />
          </label>

          <label className="flex flex-col" htmlFor="password">
            Senha
            <input
              type="password"
              id="password"
              placeholder="******"
              className="p-2"
              {...register("password")}
            />
            <FormError errors={errors.password?.message} />
          </label>

          <label className="flex flex-col" htmlFor="passwordRepeat">
            Repetir senha
            <input
              type="password"
              id="passwordRepeat"
              placeholder="******"
              className="p-2"
              {...register("passwordRepeat")}
            />
            <FormError errors={errors.passwordRepeat?.message} />
          </label>
        </fieldset>

        <div className="flex justify-center">
          <button
            type="submit"
            className="hover:bg-base_one_reference_header hover:text-base_color_text_top group w-60 gap-4 font-semibold"
          >
            {isSubmitting ? <p>Carregando...</p> : <p>Criar</p>}
          </button>
        </div>
      </form>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={handleNavigateToSignIn}
          className="hover:bg-base_one_reference_header hover:text-base_color_text_top w-full gap-4 font-semibold"
        >
          Voltar a tela de login
        </button>
      </div>
    </motion.div>
  );
}
