import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { APP_ROUTES } from "@/constants/app-routes";
import Link from "next/link";

interface Props {
  image: string;
  hoverImage?: string;
  name: string;
  price: number;
  merchants: string;
  slug: string;
}

export function ProductCard({
  image,
  hoverImage,
  merchants,
  name,
  price,
  slug,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const imageAction = isHovered && hoverImage ? hoverImage : image;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex overflow-hidden rounded-2xl shadow-md md:flex-col md:items-center lg:shadow-lg">
        <div className="h-48 w-48">
          <Image
            src={imageAction}
            alt={name}
            width={1000}
            height={1000}
            data-value={isHovered}
            className="h-full w-full object-contain data-[value=true]:object-cover"
          />
        </div>

        <div className="flex flex-col gap-2 p-4">
          <h3 className="text-lg font-light">{name}</h3>
          <p className="text-muted-foreground text-sm">{merchants}</p>
          <p className="text-primary font-bold">R$ {price.toFixed(2)}</p>

          <Link
            href={`${APP_ROUTES.public.mapCity.slugBusinessPoint}/${slug}`}
            className="absolute right-4 bottom-2 underline"
          >
            Mapa
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
