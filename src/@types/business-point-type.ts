type businessPointType = {
  id: string;
  categoryId: string;
  name: string;
  openingHours: Record<string, any>;
  location: {
    latitude: number;
    longitude: number;
  };
};
