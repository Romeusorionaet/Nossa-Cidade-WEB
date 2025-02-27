export type businessPointDetailsType = {
  id: string;
  categoryId: string;
  name: string;
  censorship: boolean;
  description: string | null;
  highlight: string;
  images: string[];
  openingHours: Record<string, any>;
  location: {
    latitude: number;
    longitude: number;
  };
  ownerId: string;
  status: string;
  website: string | null;
};
