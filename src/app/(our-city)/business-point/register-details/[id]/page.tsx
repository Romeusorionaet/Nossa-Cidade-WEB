import { PickListDetails } from "../../components/pick-list-details";

interface ParamsProps {
  params: {
    id: string;
  };
}

export default async function RegisterDetails({ params }: ParamsProps) {
  const { id } = await params;

  return (
    <main className="pt-28">
      <h1>Adicione mais detalhes sobre o ponto comercial.</h1>

      <PickListDetails businessPointId={id} />
    </main>
  );
}
