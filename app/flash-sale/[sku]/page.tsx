import { Stack } from "@/lib/utils/contentstack-client";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export default async function FlashSale({
  params,
}: {
  params: { sku: string };
}) {
  ContentstackLivePreview.init();

  const page = await Stack.ContentType("sales")
    .Query()
    .toJSON()
    .where("url", `/flash-sale/${params.sku}`)
    .find()
    .then((response) => response[0][0]);

  return (
    <>
      <div className="flex">Flash sale page</div>
      {page.intro}
    </>
  );
}
