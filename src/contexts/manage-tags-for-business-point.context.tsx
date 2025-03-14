"use client";

import { MAX_TAGS } from "@/constants/max-tags";
import { createContext, useState } from "react";

interface ManageTagsForBusinessPointContextType {
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleRemove: (index: number) => void;
  tags: string[];
  inputValue: string;
  onChangeSetValueInput: (value: string) => void;
}

interface ManageTagsForBusinessPointContextProps {
  children: React.ReactNode;
}

export const ManageTagsForBusinessPointContext = createContext(
  {} as ManageTagsForBusinessPointContextType,
);

export function ManageTagsForBusinessPointContextProvider({
  children,
}: ManageTagsForBusinessPointContextProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const onChangeSetValueInput = (value: string) => {
    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "Comma", "Space"].includes(e.code) && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();

      if (tags.length >= MAX_TAGS) return;
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      onChangeSetValueInput("");
    }
  };

  const handleRemove = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <ManageTagsForBusinessPointContext.Provider
      value={{
        handleKeyDown,
        handleRemove,
        onChangeSetValueInput,
        tags,
        inputValue,
      }}
    >
      {children}
    </ManageTagsForBusinessPointContext.Provider>
  );
}
