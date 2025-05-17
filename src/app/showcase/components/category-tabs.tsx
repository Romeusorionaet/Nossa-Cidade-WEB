import { useGetBusinessPointCategories } from "@/hooks/use-app-queries/use-get-business-point-categories";

export function CategoryTabs({
  onSelect,
}: {
  selected: string;
  onSelect: (cat: string) => void;
}) {
  const {
    data: categories,
    error,
    isLoading,
  } = useGetBusinessPointCategories();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex gap-2 overflow-x-auto">
      {categories?.map((cat) => (
        <button
          type="button"
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className="rounded-md p-1 duration-300 hover:bg-blue-500 hover:text-white"
        >
          {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
        </button>
      ))}
    </div>
  );
}
