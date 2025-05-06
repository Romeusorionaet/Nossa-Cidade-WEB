import Link from "next/link";

type ItemsType = {
  label: string;
  href: string;
};

interface Props {
  title: string;
  items: ItemsType[];
}

export const SubMenuItem = ({ title, items }: Props) => (
  <li className="w-full">
    <p className="group inline-block text-[clamp(0.80rem,1.1vw,1.2rem)] font-medium">
      {title}
      <span className="ml-1.5 inline-block whitespace-nowrap duration-300 group-hover:translate-x-1 group-focus:translate-x-1 after:content-['->'] group-hover:after:text-blue-500" />
    </p>

    <ul
      className="submenu mt-[clamp(1rem,1.9vw,2.5rem)] flex w-full max-w-72 min-w-32 flex-col gap-[clamp(0.60rem,0.80vw,1.2rem)]"
      role="menu"
    >
      {items.map((item, index) => (
        <li
          key={index}
          className="text-clamp(0.65rem,0.75vw,0.90rem) opacity-50 duration-300 focus-within:opacity-100 hover:text-blue-500 hover:opacity-100"
        >
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  </li>
);
