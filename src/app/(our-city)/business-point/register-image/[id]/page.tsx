import { SaveImageBusinessPoint } from "../../components/save-image-business-point";

interface ParamsProps {
  params: {
    id: string;
  };
}

export default async function RegisterImage({ params }: ParamsProps) {
  const { id } = await params;

  return (
    <main className="pt-32">
      <h1>Registrar imagem</h1>

      <SaveImageBusinessPoint businessPointId={id} />
    </main>
  );
}
