export type businessPointOverviewType = {
  id: string;
  categoryId: string;
  name: string;
  censorship: boolean;
  description: string | null;
  highlight: string;
  address: string;
  images: string[] | null;
  openingHours: Record<string, any>;
  location: {
    latitude: number;
    longitude: number;
  };
  ownerId: string;
  status: string;
  website: string | null;
};
