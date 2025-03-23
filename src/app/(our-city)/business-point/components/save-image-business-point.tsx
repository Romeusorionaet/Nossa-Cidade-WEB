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
      <p>Escolha até 2 imagens (máx. 500KB cada)</p>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {selectedFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>

      <button type="button" onClick={handleSaveImage}>
        Salvar
      </button>
    </section>
  );
}
