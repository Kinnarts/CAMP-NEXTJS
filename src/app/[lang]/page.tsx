import Categories from "@/lib/components/categories/categories";
import ProductCardVertical from "@/lib/components/product-card-vertical/product-card-vertical";

export default function Home() {
  return (
    <>
      <div className="flex">
        <div className="w-1/4 py-4 px-8">
          <Categories />
        </div>

        <div className="w-3/4 p-4">
          <h2 className="font-bold text-xl mb-4">Products</h2>

          <div className="grid grid-cols-3 gap-4">
            <ProductCardVertical />
            <ProductCardVertical />
            <ProductCardVertical />
            <ProductCardVertical />
            <ProductCardVertical />
            <ProductCardVertical />
          </div>
        </div>
      </div>
    </>
  );
}
