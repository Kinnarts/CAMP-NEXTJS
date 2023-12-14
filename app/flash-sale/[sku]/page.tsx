"use client";
import { Stack, onEntryChange } from "@/lib/utils/contentstack-client";
import { useEffect, useState } from "react";

export default function FlashSale({ params }: { params: { sku: string } }) {
  const [getPage, setPage] = useState({} as any);

  async function fetchData() {
    console.log(process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN);
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
      <div className="flex">Flash sale page3</div>
      {getPage?.intro}
    </>
  );
}
