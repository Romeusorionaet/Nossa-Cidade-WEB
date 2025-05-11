import { BusinessPointsPreview } from "../components/business-points-preview";

export default function MyBusinessPoints() {
  return (
    <main className="px-4 pt-28 md:px-10">
      <h1>Pontos comerciais</h1>

      <p className="mt-10 mb-6 max-w-2xl text-zinc-700">
        Esta seção exibe todos os pontos comerciais cadastrados pelo usuário. Ao
        atualizar a localização de um ponto, ele entrará em fase de análise, mas
        continuará visível com a localização anterior até a nova ser aprovada.
      </p>

      <BusinessPointsPreview />
    </main>
  );
}
