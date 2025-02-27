import Link from "next/link";
import { ContentBusinessPointDetails } from "../../components/content-business-point-details";

interface ParamsProps {
  params: {
    id: string;
  };
}

export default async function Details({ params }: ParamsProps) {
  const { id } = await params;

  return (
    <main className="mx-auto w-full max-w-[1080px] pt-28">
      <Link href="/map-city" className="ml-4 text-black hover:underline">
        Voltar
      </Link>

      <ContentBusinessPointDetails id={id} />
    </main>
  );
}
