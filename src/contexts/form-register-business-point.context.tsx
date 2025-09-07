"use client";

import {
  BusinessPointFormData,
  businessPointSchema,
} from "@/schemas/business-point.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { createContext, useContext, useState } from "react";
import { ManageTagsForBusinessPointContext } from "./manage-tags-for-business-point.context";
import { registerBusinessPoint } from "@/actions/post/business-point/register-business-point";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";

interface FormRegisterBusinessPointContextType {
  register: UseFormRegister<BusinessPointFormData>;
  handleSubmit: UseFormHandleSubmit<BusinessPointFormData>;
  handleBusinessPointForm: (
    businessPointData: BusinessPointFormData,
  ) => Promise<void>;
  setValue: UseFormSetValue<BusinessPointFormData>;
  handleSelect: (categoryId: string) => void;
  errors: FieldErrors<BusinessPointFormData>;
  isLoadingForm: boolean;
  selectedCategories: string[];
}

interface FormRegisterBusinessPointContextProps {
  children: React.ReactNode;
}

export const FormRegisterBusinessPointContext = createContext(
  {} as FormRegisterBusinessPointContextType,
);

export function FormRegisterBusinessPointContextProvider({
  children,
}: FormRegisterBusinessPointContextProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading: isLoadingForm },
  } = useForm<BusinessPointFormData>({
    resolver: zodResolver(businessPointSchema),
  });

  const { tags } = useContext(ManageTagsForBusinessPointContext);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const router = useRouter();

  const handleBusinessPointForm = async (baseData: BusinessPointFormData) => {
    const { messageError, messageSuccess } = await registerBusinessPoint({
      baseData,
      customTags: tags,
      categoriesAssociate: selectedCategories,
    });

    if (messageSuccess) {
      alert(messageSuccess);
      router.push(APP_ROUTES.public.user.myBusinessPoints);
    } else {
      alert(messageError);
    }
  };

  const handleSelect = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  return (
    <FormRegisterBusinessPointContext.Provider
      value={{
        register,
        handleSubmit,
        handleBusinessPointForm,
        setValue,
        handleSelect,
        errors,
        isLoadingForm,
        selectedCategories,
      }}
    >
      {children}
    </FormRegisterBusinessPointContext.Provider>
  );
}
