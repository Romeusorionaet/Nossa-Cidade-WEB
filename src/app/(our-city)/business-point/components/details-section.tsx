interface DetailsSectionProps {
  title: string;
  items: string[];
}

export function DetailsSection({ title, items }: DetailsSectionProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold text-zinc-100">{title}</h4>
      <ul className="list-inside list-disc space-y-1 text-zinc-300">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
