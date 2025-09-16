import { BackNavigation } from "@/components/back-navigation";
import { PickListDetails } from "../../components/pick-list-details";

interface ParamsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RegisterDetails({ params }: ParamsProps) {
  const { id } = await params;

  return (
    <main className="space-y-10 pt-28 lg:pt-36">
      <BackNavigation />

      <div className="px-4 md:px-10">
        <h1 className="mb-6">
          Adicione mais detalhes sobre o ponto comercial.
        </h1>

        <PickListDetails businessPointId={id} />
      </div>
    </main>
  );
}
