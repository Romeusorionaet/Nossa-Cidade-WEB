import { ContentBusinessPointDetails } from "../../components/content-business-point-details";

interface ParamsProps {
  params: {
    id: string;
  };
}

export default function Details({ params }: ParamsProps) {
  const { id } = params;

  return (
    <main>
      <h1>hello world!</h1>

      <ContentBusinessPointDetails id={id} />
    </main>
  );
}
