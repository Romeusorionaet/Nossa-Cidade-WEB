interface CheckboxListAssociateProps {
  title: string;
  items: { id: string; name: string }[];
  selectedItems: { id: string }[];
  category: string;
  onSelect: (category: string, id: string, checked: boolean) => void;
}

export function CheckboxListAssociateItems({
  title,
  items,
  selectedItems,
  category,
  onSelect,
}: CheckboxListAssociateProps) {
  return (
    <div>
      <h3>{title}</h3>
      <ul className="list-inside list-disc">
        {items.map((item) => (
          <li
            key={`${category}-${item.id}`}
            className="flex items-center space-x-2"
          >
            <input
              type="checkbox"
              id={`${category}-${item.id}`}
              defaultChecked={selectedItems.some(
                (associated) => associated.id === item.id,
              )}
              onChange={(e) => onSelect(category, item.id, e.target.checked)}
              className="h-4 w-4 cursor-pointer"
            />
            <label
              htmlFor={`${category}-${item.id}`}
              className="cursor-pointer"
            >
              {item.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
