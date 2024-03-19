import { getClient } from "@/lib/utils/apollo-client";
import { gql } from "@apollo/client";
import { Category } from "../../route";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params?.id;
  const productVariantFragment = gql`
    fragment productVariant on ProductSearchVariant {
      id
      sku
      images {
        url
        label
      }
      prices {
        id
        value {
          currencyCode
          centAmount
          type
        }
        key
        country
        customerGroup {
          name
        }
      }
      attributes: attributesRaw {
        name
        value
        referencedResourceSet {
          id
        }
      }
      availability {
        availableQty: channels {
          total
        }
      }
    }
  `;
  const query = gql`
    ${productVariantFragment}
    query GetProductsByCategoryKey($filters: String!) {
      productProjectionSearch(filters: { string: $filters }, limit: 100) {
        results {
          id
          categories {
            id
            key
          }
          name(locale: "en-US")
          nameAllLocales {
            locale
            value
          }
          descriptionAllLocales {
            locale
            value
          }
          slug(locale: "en-US")
          description(locale: "en-US")
          variants {
            ...productVariant
          }
          masterVariant {
            ...productVariant
          }
        }
      }
    }
  `;

  try {
    const filters = `categories.id:\"${id}\"`;
    const res: { data: { productProjectionSearch: { results: Product[] } } } =
      await getClient().query({
        query,
        variables: {
          filters,
        },
        fetchPolicy: "no-cache",
      });
    return Response.json(res.data?.productProjectionSearch?.results);
  } catch (err: any) {
    return Response.json(err);
  }
}

export interface Product {
  id?: string;
  name?: { [key: string]: string };
  description?: { [key: string]: string };
  nameAllLocales?: LocalizedString[];
  descriptionAllLocales?: LocalizedString[];
  slug?: { [key: string]: string };
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
