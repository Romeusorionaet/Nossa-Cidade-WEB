export type CheckboxListAssociateType = {
  title: string;
  items: { id: string; name: string }[];
  selectedItems: { id: string }[];
  category: string;
  onSelect: (category: string, id: string, checked: boolean) => void;
};
