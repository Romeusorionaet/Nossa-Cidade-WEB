"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { APP_ROUTES } from "@/constants/app-routes";
import Link from "next/link";
import { ProductImageType } from "@/@types/product-image-type";
import { BASE_URLS } from "@/constants/base-urls";
import { slugify } from "@/utils/slugfy";

interface Props {
  imageUrls: ProductImageType[];
  title: string;
  price: number;
  merchants: string;
}

export function ProductCard({ imageUrls, merchants, title, price }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const mainImage = imageUrls[0]?.url;
  const hoverImage = imageUrls[1]?.url;
  const activeImage = isHovered && hoverImage ? hoverImage : mainImage;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-80 max-md:w-40 md:h-40 md:w-80"
    >
      <div className="relative flex h-full overflow-hidden rounded-2xl shadow-md max-md:flex-col md:items-center lg:shadow-lg">
        <div className="mx-auto h-1/2 md:h-full md:w-1/2">
          <Image
            key={activeImage}
            src={`${BASE_URLS.img}/${activeImage}`}
            alt={title}
            width={1000}
            height={1000}
            data-value={isHovered}
            className="h-full w-full object-contain data-[value=true]:object-cover"
          />
        </div>

        <div className="flex h-1/2 flex-col gap-1 p-0.5 text-xs md:h-full md:w-1/2 md:text-sm">
          <h3 className="inline-block h-[45%] font-light tracking-wide md:leading-3.5">
            {title}
          </h3>
          <div className="h-[45%]">
            <span className="rounded-xs bg-green-400 px-0.5 text-xs">
              Vendido por:
            </span>
            <p className="text-muted-foreground tracking-wide md:leading-3.5">
              {merchants}
            </p>
          </div>

          <div className="flex h-[10%] items-center justify-between p-2 text-lg">
            <p className="text-primary inline-block">
              <span className="font-bold text-green-500">R$</span>{" "}
              {price.toFixed(2)}
            </p>

            <Link
              href={`${APP_ROUTES.public.mapCity}${slugify(title)}`}
              className="inline-block hover:underline"
            >
              Mapa
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
