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
      <ContentBusinessPointDetails id={id} />
    </main>
  );
}
