"use client";
import { Stack } from "@/lib/utils/contentstack-client";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { useEffect, useState } from "react";

export default function FlashSale({ params }: { params: { sku: string } }) {
  ContentstackLivePreview.init({
    enable: true,
  });
  const [getPage, setPage] = useState({} as any);

  async function fetchData() {
    setPage(
      await Stack.ContentType("sales")
        .Query()
        .toJSON()
        .where("url", `/flash-sale/${params.sku}`)
        .find()
        .then((response) => response[0][0])
    );
  }
  const { onEntryChange } = ContentstackLivePreview;

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, []);

  return (
    <>
      <div className="flex">Flash sale page</div>
      {getPage?.intro}
    </>
  );
}
