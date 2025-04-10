import Link from "next/link";
import { ContentBusinessPointDetails } from "../../components/content-business-point-details";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Details({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto w-full max-w-[1080px] pt-28">
      <Link href="/map-city" className="ml-4 hover:underline">
        Voltar
      </Link>

      <ContentBusinessPointDetails id={id} />
    </main>
  );
}
