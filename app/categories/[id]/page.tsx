import { GET, Product } from "@/app/api/categories/[id]/products/route";
import Categories from "@/lib/components/categories/categories";
import ProductCardVertical from "@/lib/components/product-card-vertical/product-card-vertical";

export default async function Category({ params }: { params: { id: string } }) {
  const productsResponse = await GET({} as any, { params });
  const products: Product[] = await productsResponse.json();

  return (
    <>
      <div className="flex">
        <div className="w-1/4 py-4 px-8">
          <Categories />
        </div>

        <div className="w-3/4 p-4">
          <h2 className="font-bold text-xl mb-4">Category {params.id}</h2>

          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCardVertical key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
