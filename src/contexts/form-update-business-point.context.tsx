"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { createContext, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  UpdateBusinessPointFormDataType,
  updateBusinessPointSchema,
} from "@/schemas/update-business-point.schema";
import { useParams, useRouter } from "next/navigation";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { APP_ROUTES } from "@/constants/app-routes";
import { businessPointRequestUpdate } from "@/actions/put/business-point/business-point-request-update";

interface FormUpdateBusinessPointContextType {
  register: UseFormRegister<UpdateBusinessPointFormDataType>;
  handleSubmit: UseFormHandleSubmit<UpdateBusinessPointFormDataType>;
  handleUpdateBusinessPointForm: (
    businessPointData: UpdateBusinessPointFormDataType,
  ) => Promise<void>;
  errors: FieldErrors<UpdateBusinessPointFormDataType>;
  isLoadingForm: boolean;
  setValue: UseFormSetValue<UpdateBusinessPointFormDataType>;
  getValues: UseFormGetValues<UpdateBusinessPointFormDataType>;
}

interface FormUpdateBusinessPointContextProps {
  children: React.ReactNode;
}

export const FormUpdateBusinessPointContext = createContext(
  {} as FormUpdateBusinessPointContextType,
);

export function FormUpdateBusinessPointContextProvider({
  children,
}: FormUpdateBusinessPointContextProps) {
  const { id } = useParams();
  const businessPointId = id as string;

  const router = useRouter();

  const queryClient = useQueryClient();
  const businessPointData =
    queryClient.getQueryData<UpdateBusinessPointFormDataType>([
      QUERY_KEY_CACHE.BPD,
    ]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isLoading: isLoadingForm },
  } = useForm<UpdateBusinessPointFormDataType>({
    resolver: zodResolver(updateBusinessPointSchema),
  });

  const handleUpdateBusinessPointForm = async (
    baseData: UpdateBusinessPointFormDataType,
  ) => {
    const { messageError, messageSuccess } = await businessPointRequestUpdate({
      businessPoint: baseData,
      businessPointId,
    });

    if (messageSuccess) {
      alert(messageSuccess);
      router.push(APP_ROUTES.public.user.myBusinessPoints);
      return;
    }

    alert(messageError);
  };

  useEffect(() => {
    if (businessPointData) {
      reset(businessPointData);
    }
    reset();
  }, [businessPointData]);

  return (
    <FormUpdateBusinessPointContext.Provider
      value={{
        register,
        handleSubmit,
        handleUpdateBusinessPointForm,
        errors,
        isLoadingForm,
        setValue,
        getValues,
      }}
    >
      {children}
    </FormUpdateBusinessPointContext.Provider>
  );
}
