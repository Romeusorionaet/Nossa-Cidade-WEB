type ItemType = {
  id: string;
  name: string;
};

export type ListItemsForBusinessPointDetailsType = {
  pets: ItemType[];
  planning: ItemType[];
  accessibility: ItemType[];
  parking: ItemType[];
  payments: ItemType[];
  audience: ItemType[];
  amenities: ItemType[];
  menu: ItemType[];
  serviceOptions: ItemType[];
  environments: ItemType[];
};
