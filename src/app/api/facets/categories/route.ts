import { searchClient } from "@/lib/utils/algolia-client";

export async function GET() {
  const index = searchClient.initIndex(
    process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ""
  );

  try {
    const res: { facetHits: Facet[] } = await index.searchForFacetValues(
      "categories.name.en-US",
      ""
    );

    return Response.json(res.facetHits);
  } catch (err: any) {
    return Response.json(err);
  }
}

export interface Facet {
  value: string;
  highlighted: string;
  count: number;
}
