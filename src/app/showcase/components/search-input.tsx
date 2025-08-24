export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <input
      placeholder="Buscar produto..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4 rounded-md border p-1"
    />
  );
}
