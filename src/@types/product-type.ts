import { ProductImageType } from "./product-image-type";

export type ProductType = {
  id: string;
  businessPointId: string;
  businessPointName: string;
  title: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  imageUrls: ProductImageType[];
};
