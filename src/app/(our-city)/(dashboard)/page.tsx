import Link from 'next/link'

export default function Dashboard() {
  return (
    <div>
      <header>Header</header>

      <main className="mt-44 text-center">
        <h1>Dashboard</h1>
        <p>Aprentação do projeto</p>

        <div className="mt-44 flex flex-col items-center justify-center gap-10">
          <Link href="/map-city" className="inline-block w-44 border p-1">
            Ir para mapa
          </Link>

          <Link href="/sign-in" className="inline-block w-44 border p-1">
            Fazer Login
          </Link>
        </div>
      </main>
    </div>
  )
}
