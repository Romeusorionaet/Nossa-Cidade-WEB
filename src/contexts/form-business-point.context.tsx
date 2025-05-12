"use client";

import {
  BusinessPointFormData,
  businessPointSchema,
} from "@/schemas/business-point.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldErrors,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { createContext, useContext, useState } from "react";
import { ManageTagsForBusinessPointContext } from "./manage-tags-for-business-point.context";
import { registerBusinessPoint } from "@/actions/post/business-point/register-business-point";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";

interface FormBusinessPointContextType {
  register: UseFormRegister<BusinessPointFormData>;
  handleSubmit: UseFormHandleSubmit<BusinessPointFormData>;
  handleBusinessPointForm: (
    businessPointData: BusinessPointFormData,
  ) => Promise<void>;
  setValue: UseFormSetValue<BusinessPointFormData>;
  getValues: UseFormGetValues<BusinessPointFormData>;
  handleSelect: (categoryId: string) => void;
  errors: FieldErrors<BusinessPointFormData>;
  isLoadingForm: boolean;
  selectedCategories: string[];
}

interface FormBusinessPointContextProps {
  children: React.ReactNode;
}

export const FormBusinessPointContext = createContext(
  {} as FormBusinessPointContextType,
);

export function FormBusinessPointContextProvider({
  children,
}: FormBusinessPointContextProps) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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
    <FormBusinessPointContext.Provider
      value={{
        register,
        handleSubmit,
        handleBusinessPointForm,
        setValue,
        getValues,
        handleSelect,
        errors,
        isLoadingForm,
        selectedCategories,
      }}
    >
      {children}
    </FormBusinessPointContext.Provider>
  );
}
