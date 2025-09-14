type ImageBusinessPointType = { id: string; url: string };

type BusinessPointOverviewType = {
  id: string;
  categoryId: string;
  name: string;
  censorship: boolean;
  description: string | null;
  highlight: string;
  neighborhood: string;
  houseNumber: string;
  street: string;
  imageUrls: ImageBusinessPointType[] | null;
  openingHours: Record<string, any>;
  location: {
    latitude: number;
    longitude: number;
  };
  ownerId: string;
  status: string;
  website: string | null;
};
