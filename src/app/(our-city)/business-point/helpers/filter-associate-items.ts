import { ListItemsForBusinessPointDetailsType } from "@/@types/list-items-for-business-point-details-type";

export const filterAssociateItems = (
  items: Record<string, string[]>,
  listItemsAssociated: ListItemsForBusinessPointDetailsType,
  condition: (itemId: string, associatedItems: { id: string }[]) => boolean,
) => {
  const filteredItems: Record<string, string[]> = {};

  for (const category in items) {
    const categoryKey = category as keyof ListItemsForBusinessPointDetailsType;

    if (categoryKey in listItemsAssociated) {
      const associatedItems = listItemsAssociated[categoryKey] || [];
      const validItems = items[categoryKey].filter((itemId) =>
        condition(itemId, associatedItems),
      );

      if (validItems.length > 0) {
        filteredItems[categoryKey] = validItems;
      }
    }
  }

  return filteredItems;
};
