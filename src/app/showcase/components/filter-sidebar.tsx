const merchantExample = ["Loja X", "Loja Y", "Loja Z"];
const pricesExample = ["Até R$50", "R$50 a R$100", "Acima de R$100"];

export function FilterSidebar() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2 text-lg">Comerciantes</h4>
        <div className="space-y-2">
          {merchantExample.map((merchant) => (
            <div key={merchant} className="flex items-center gap-2">
              <input type="checkbox" id={merchant} />
              <label htmlFor={merchant}>{merchant}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-lg">Faixa de Preço</h4>
        <div className="space-y-2">
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
