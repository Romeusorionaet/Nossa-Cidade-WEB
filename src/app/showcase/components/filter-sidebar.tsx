import { useGetBusinessPointCategories } from "@/hooks/use-app-queries/use-get-business-point-categories";

const merchantExample = ["Loja X", "Loja Y", "Loja Z"];
const pricesExample = ["Até R$50", "R$50 a R$100", "Acima de R$100"];

export function FilterSidebar() {
  const {
    data: categories,
    error,
    isLoading,
  } = useGetBusinessPointCategories();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="space-y-2">
      <div>
        <h4 className="mb-2 text-lg">Pontos comerciais</h4>
        <div className="ml-2 space-y-1">
          {categories?.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <input type="checkbox" id={category.name} />
              <label htmlFor={category.name}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-lg">Faixa de Preço</h4>
        <div className="ml-2 space-y-1">
          {pricesExample.map((price) => (
            <div key={price} className="flex items-center gap-2">
              <input type="checkbox" id={price} />
              <label htmlFor={price}>{price}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
