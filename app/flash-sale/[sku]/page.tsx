"use client";
import { getEntryByUrl, onEntryChange } from "@/lib/utils/contentstack-client";
import { useEffect, useState } from "react";

export default function FlashSale({ params }: { params: { sku: string } }) {
  const [getPage, setPage] = useState({} as any);

  async function fetchData() {
    setPage(
      await getEntryByUrl({
        contentTypeUid: "sales",
        entryUrl: `/flash-sale/${params.sku}`,
      }).then((response: any) => response[0])
    );
    // setPage(
    //   await Stack.ContentType("sales")
    //     .Query()
    //     .toJSON()
    //     .where("url", `/flash-sale/${params.sku}`)
    //     .find()
    //     .then((response: any) => response[0][0])
    // );
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, []);

  return (
    <>
      <div className="flex">Flash sale page4</div>
      {getPage?.intro}
    </>
  );
}
