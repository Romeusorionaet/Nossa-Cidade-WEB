export type BusinessPointOverviewType = {
  id: string;
  categoryId: string;
  name: string;
  censorship: boolean;
  description: string | null;
  highlight: string;
  address: string;
  imageUrls: { id: string; url: string }[] | null;
  openingHours: Record<string, any>;
  location: {
    latitude: number;
    longitude: number;
  };
  ownerId: string;
  status: string;
  website: string | null;
};
