"use client";

import { ProductCard } from "./product-card";
import { useGetProducts } from "@/hooks/use-app-queries/use-get-products";

export function SectionProducts() {
  const { data: products, error, isLoading } = useGetProducts("1");

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <section className="mt-2 flex flex-wrap justify-center gap-2">
      {products?.map((p) => (
        <ProductCard
          key={p.id}
          imageUrls={p.imageUrls}
          title={p.title}
          price={p.price}
          merchants={p.businessPointName}
        />
      ))}
    </section>
  );
}
