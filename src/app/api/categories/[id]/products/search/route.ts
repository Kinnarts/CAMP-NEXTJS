import { NextRequest } from "next/server";
import { searchClient } from "@/lib/utils/algolia-client";
import { Category } from "../../../route";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data: {
    query?: string;
    params?: any;
  } = await request.json();

  const index = searchClient.initIndex(
    process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ""
  );
  index
    .searchForFacetValues("categories.name.en-US", "")
    .then(({ facetHits }) => {
      console.log(facetHits);
    });
  index
    .searchForFacetValues("variants.attributes.color.label", "")
    .then(({ facetHits }) => {
      console.log(facetHits);
    });

  index
    .searchForFacetValues("variants.attributes.size.label", "")
    .then(({ facetHits }) => {
      console.log(facetHits);
    });

  try {
    const res: { hits: Product[] } = await index.search(
      data.query || "",
      data.params
    );
    return Response.json(res.hits);
  } catch (err: any) {
    return Response.json(err);
  }
}

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  nameAllLocales?: LocalizedString[];
  descriptionAllLocales?: LocalizedString[];
  slug?: string;
  categories?: Array<Category>;
  variants?: Array<ProductVariant>;
  masterVariant?: ProductVariant;
}
export interface ProductVariant {
  id?: string;
  sku?: string;
  name?: string;
  slug?: string;
  images?: Array<Image>;
  prices?: Array<Price>;
  attributes?: Array<{ [key: string]: object }>;
  availability?: ProductVariantAvailability;
}
export interface Image {
  url?: string;
  label?: string;
}
export interface Price {
  id?: string;
  value?: PriceValue;
}
export interface PriceValue {
  currencyCode?: string;
  centAmount?: number;
}
export interface ProductVariantAvailability {
  isOnStock?: boolean;
  availableQty?: number;
}

export interface LocalizedString {
  locale?: string;
  value?: string;
}
