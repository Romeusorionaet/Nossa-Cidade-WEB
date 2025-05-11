"use client";

import { MAX_TAGS } from "@/constants/max-tags";
import { ManageTagsForBusinessPointContext } from "@/contexts/manage-tags-for-business-point.context";
import { useContext } from "react";
import "@/assets/styles/utilities/scrollbar.css";

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
          placeholder="Digite sua tag aqui"
          data-value={String(tags.length === MAX_TAGS)}
          className="border-b p-1 data-[value=true]:cursor-not-allowed"
        />

        <div className="scrollbar h-32 w-full overflow-auto rounded-md border-b border-black p-2">
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
