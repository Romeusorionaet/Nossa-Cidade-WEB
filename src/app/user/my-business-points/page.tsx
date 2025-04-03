import { BusinessPointsPreview } from "../components/business-points-preview";

export default function MyBusinessPoints() {
  return (
    <main className="pt-28">
      <h1>Pontos comerciais</h1>

      <p>
        Exibir os pontos comerciais do usuário, e ser capaz de atualizar. Se o
        usuário atualizar a localização irá ficar em análise mas o seu ponto
        comercial ainda continuará sendo mostrado na antiga localização.
      </p>

      <BusinessPointsPreview />
    </main>
  );
}
