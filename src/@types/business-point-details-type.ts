export type businessPointDetailsType = {
  id: string;
  categoryId: string;
  name: string;
  censorship: boolean;
  description: string | null;
  highlights: string | null;
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
