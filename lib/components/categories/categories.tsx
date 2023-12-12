import { Category, GET } from "@/app/api/categories/route";
import Link from "next/link";

export default async function Categories() {
  const categoriesRes = await GET();
  const categories: Category[] = await categoriesRes.json();

  const renderCategory = (category: Category) => (
    <li key={category.id} className="text-gray-600 space-y-2">
      <Link href={`/categories/${category.id}`}>{category.name}</Link>
      {/* {category.subcategories?.length > 0 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 inline ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
      {category.subcategories?.length > 0 && (
        <ul className="space-y-2 ml-4">
          {category.subcategories.map((subcat: any) => renderCategory(subcat))}
        </ul>
      )} */}
    </li>
  );

  return (
    <>
      <h2 className="font-bold text-xl mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories
          .filter((category) => category.parent?.id)
          .map((category: Category) => renderCategory(category))}
      </ul>
    </>
  );
}
