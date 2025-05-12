"use client";

import { saveImageBusinessPoint } from "@/actions/post/business-point/save-image-business-point";
import { useState } from "react";

interface Props {
  businessPointId: string;
}

export function SaveImageBusinessPoint({ businessPointId }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    const files = Array.from(event.target.files || []);

    if (files.length + selectedFiles.length > 2) {
      setError("Você pode enviar no máximo 2 imagens.");
      return;
    }

    const validFiles = files.filter((file) => file.size <= 500 * 1024);
    if (validFiles.length !== files.length) {
      setError("Cada imagem deve ter no máximo 500KB.");
      return;
    }

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleSaveImage = async () => {
    const { messageError, messageSuccess } = await saveImageBusinessPoint({
      businessPointId,
      files: selectedFiles,
    });

    if (messageSuccess) {
      alert(messageSuccess);
      setSelectedFiles([]);
      return;
    }

    alert(messageError);
  };

  return (
    <section>
      <div className="mt-10">
        <p>Escolha até 2 imagens (máx. 500KB cada)</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="rounded-md border border-zinc-500 p-1"
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <ul>
        {selectedFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handleSaveImage}
        className="mt-2 rounded-md bg-green-400 p-1 font-light text-white duration-300 hover:bg-green-500"
      >
        Salvar
      </button>
    </section>
  );
}
