import { getClient } from "@/lib/utils/apollo-client";
import { gql } from "@apollo/client";

export async function GET() {
  const query = gql`
    query Now {
      categories {
        results {
          id
          name(locale: "en-US")
          slug(locale: "en-US")
          description(locale: "en-US")
          parent {
            id
          }
        }
      }
    }
  `;

  const res: { data: { categories: { results: Category[] } } } =
    await getClient().query({
      query,
    });

  return Response.json(res.data.categories.results);
}

export interface Category {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  ancestors?: Array<Category>;
  parent?: Category;
}
