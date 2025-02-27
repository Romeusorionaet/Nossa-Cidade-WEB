import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 z-20 w-full bg-white">
      <div className="mx-auto w-full max-w-[1680px] bg-white p-6">
        <nav>
          <ul className="flex gap-4 text-black">
            <li>
              <Link href="/sign-in">Dashboard</Link>
            </li>
            <li>
              <Link href="/sign-in">Sign in</Link>
            </li>
            <Link href="/sign-up">Sign up</Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}
