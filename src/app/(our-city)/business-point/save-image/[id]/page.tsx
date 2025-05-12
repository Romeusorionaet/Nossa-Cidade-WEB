import { BackNavigation } from "@/components/back-navigation";
import { ContentImagesSaved } from "../../components/content-images-saved";
import { SaveImageBusinessPoint } from "../../components/save-image-business-point";

interface ParamsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RegisterImage({ params }: ParamsProps) {
  const { id } = await params;

  return (
    <main className="mx-4 pt-32 md:mx-10">
      <BackNavigation />

      <h1 className="mt-10">Registrar imagem</h1>

      <SaveImageBusinessPoint businessPointId={id} />

      <h3 className="mt-10">images salvas</h3>

      <div className="my-10">
        <ContentImagesSaved id={id} />
      </div>
    </main>
  );
}
