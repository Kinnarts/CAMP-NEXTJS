import { searchClient } from "@/lib/utils/algolia-client";
import { Facet } from "../categories/route";

export async function GET() {
  const index = searchClient.initIndex(
    process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ""
  );

  try {
    const res: { facetHits: Facet[] } = await index.searchForFacetValues(
      "variants.attributes.size.label",
      ""
    );

    return Response.json(res.facetHits);
  } catch (err: any) {
    return Response.json(err);
  }
}
