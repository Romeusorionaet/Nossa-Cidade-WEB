import { ListItemsForBusinessPointDetailsType } from "@/@types/list-items-for-business-point-details-type";

export const filterAssociateItems = (
  items: Record<string, string[]>,
  listItemsAssociated: ListItemsForBusinessPointDetailsType,
  condition: (itemId: string, associatedItems: { id: string }[]) => boolean,
) => {
  const filteredItems: Record<string, string[]> = {};

  if (Object.keys(listItemsAssociated).length === 0) {
    return items;
  }

  for (const category in items) {
    const categoryKey = category as keyof ListItemsForBusinessPointDetailsType;

    if (categoryKey in listItemsAssociated) {
      const associatedItems = listItemsAssociated[categoryKey] || [];
      const categoryItems = items[categoryKey] || [];

      if (associatedItems.length === 0) {
        filteredItems[categoryKey] = categoryItems;
      } else if (categoryItems.length > 0) {
        const validItems = categoryItems.filter((itemId) =>
          condition(itemId, associatedItems),
        );

        if (validItems.length > 0) {
          filteredItems[categoryKey] = validItems;
        }
      }
    }
  }

  return filteredItems;
};
