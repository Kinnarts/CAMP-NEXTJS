"use client";
import { Stack, onEntryChange } from "@/lib/utils/contentstack-client";
import { useEffect, useState } from "react";

export default function FlashSale({ params }: { params: { sku: string } }) {
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
