
import { products } from "@/lib/products";
import ProductDetailsClient from "./ProductDetailsClient";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductDetailsClient id={id} />;
}
