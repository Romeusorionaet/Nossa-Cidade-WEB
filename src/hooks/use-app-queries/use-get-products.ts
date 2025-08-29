import { ProductType } from "@/@types/product-type";
import { getProducts } from "@/actions/get/product/get-products";
import { QUERY_KEY_CACHE } from "@/constants/query-key-cache";
import { useQuery } from "@tanstack/react-query";

export function useGetProducts(page: string) {
  const { data, isLoading, error } = useQuery<ProductType[]>({
    queryKey: [QUERY_KEY_CACHE.PRODUCTS],
    queryFn: () => getProducts(page),
    staleTime: 1000 * 60 * 60,
  });

  return { data, isLoading, error };
}
