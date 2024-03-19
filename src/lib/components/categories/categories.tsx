import { Category, GET } from "@/app/api/categories/route";
import { Facet } from "@/app/api/facets/categories/route";
import Link from "next/link";

export default async function Categories() {
  const categoriesRes = await fetch(
    `http://localhost:3000/api/facets/categories`
  );
  const categories: Facet[] = await categoriesRes.json();

  const sizesRes = await fetch(`http://localhost:3000/api/facets/sizes`);
  const sizes: Facet[] = await sizesRes.json();

  const colorsRes = await fetch(`http://localhost:3000/api/facets/colors`);
  const colors: Facet[] = await colorsRes.json();

  const renderFacet = (facet: Facet) => (
    <li key={facet.value} className="text-gray-600 space-y-2">
      <Link href={`/categories/${facet.value}`}>
        {facet.value} {facet.count}
      </Link>
    </li>
  );

  return (
    <>
      <h2 className="font-bold text-xl mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category: Facet) => renderFacet(category))}
      </ul>
      <h2 className="font-bold text-xl mb-4">Sizes</h2>
      <ul className="space-y-2">
        {sizes.map((size: Facet) => renderFacet(size))}
      </ul>
      <h2 className="font-bold text-xl mb-4">Colors</h2>
      <ul className="space-y-2">
        {colors.map((color: Facet) => renderFacet(color))}
      </ul>
    </>
  );
}
