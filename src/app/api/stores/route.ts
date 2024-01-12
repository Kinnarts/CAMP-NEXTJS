import { getClient } from "@/lib/utils/apollo-client";
import { gql } from "@apollo/client";

export async function GET() {
  const query = gql`
    query Now {
      stores {
        results {
          id
          key
          nameAllLocales {
            locale
            value
          }
          languages
        }
      }
    }
  `;

  const res: { data: { stores: { results: Store[] } } } =
    await getClient().query({
      query,
    });

  return Response.json(res.data.stores.results);
}

export interface Store {
  id: string;
  key: string;
  nameAllLocales: {
    locale: string;
    value: string;
  }[];
  languages: string[];
}
