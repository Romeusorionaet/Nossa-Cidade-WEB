"use client";

import { MAX_TAGS } from "@/constants/max-tags";
import { ManageTagsForBusinessPointContext } from "@/contexts/manage-tags-for-business-point.context";
import { useContext } from "react";

export function ManageTags() {
  const {
    handleKeyDown,
    handleRemove,
    tags,
    inputValue,
    onChangeSetValueInput,
  } = useContext(ManageTagsForBusinessPointContext);

  return (
    <div className="space-y-6">
      <label htmlFor="react-tags" className="inline-block">
        <span className="mb-4 inline-block">
          Adicione suas tags caso tenha alguma em específico, isso irá facilitar
          a pesquisa para que os clientes encontre resultados mais rápidos.
        </span>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => onChangeSetValueInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma tag..."
          data-value={String(tags.length === MAX_TAGS)}
          className="data-[value=true]:cursor-not-allowed"
        />

        <div className="h-44 w-full max-w-sm overflow-auto rounded-md border border-black p-2">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={tag}
                className="flex items-center gap-1 rounded bg-blue-500 px-2 py-1 text-white"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </label>
    </div>
  );
}
