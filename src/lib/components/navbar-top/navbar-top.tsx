"use client";

import { useEffect, useState } from "react";
import {
  SfButton,
  SfIconShoppingCart,
  SfIconFavorite,
  SfIconPerson,
  SfIconExpandMore,
  SfInput,
  SfIconSearch,
  SfIconMenu,
  SfSelect,
} from "@storefront-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { Store } from "@/app/api/stores/route";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import Image from "next/image";
import { searchClient } from "@/lib/utils/algolia-client";
import { InstantSearchNext } from "react-instantsearch-nextjs";

export default function NavbarTop() {
  const [inputValue, setInputValue] = useState("");
  const [stores, setStores] = useState([] as Store[]);
  const currentPath = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/stores")
      .then((res) => res.json())
      .then((stores) => {
        setStores(stores);
      });
  }, []);

  const actionItems = [
    {
      icon: <SfIconShoppingCart />,
      label: "",
      ariaLabel: "Cart",
      role: "button",
    },
    {
      icon: <SfIconFavorite />,
      label: "",
      ariaLabel: "Wishlist",
      role: "button",
    },
    {
      label: "Log in",
      icon: <SfIconPerson />,
      ariaLabel: "Log in",
      role: "login",
    },
  ];

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Successfully found 10 results for ${inputValue}`);
  };

  const onLanguageChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const redirectPath = currentPath.replace(
      /en-US|fr-FR|de-DE/g,
      event.currentTarget.value
    );
    router.push(redirectPath);
  };

  return (
    <header className="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200 sticky top-0 inset-x-0 z-50 group">
      <div className="flex flex-wrap lg:flex-nowrap items-center flex-row justify-start h-full max-w-[1536px] w-full">
        <a
          href="#"
          aria-label="SF Homepage"
          className="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
        >
          <picture>
            <source
              srcSet="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo.svg"
              media="(min-width: 768px)"
            />
            <img
              src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign.svg"
              alt="Sf Logo"
              className="w-8 h-8 md:h-6 md:w-[176px] lg:w-[12.5rem] lg:h-[1.75rem]"
            />
          </picture>
        </a>
        <SfButton
          aria-label="Open categories"
          className="lg:hidden order-first lg:order-1 mr-4"
          square
          variant="tertiary"
        >
          <SfIconMenu />
        </SfButton>
        <SfButton
          className="hidden lg:flex lg:mr-4"
          variant="tertiary"
          slotSuffix={<SfIconExpandMore className="hidden lg:block" />}
        >
          <span className="hidden lg:flex whitespace-nowrap">
            Browse products
          </span>
        </SfButton>
        <div className="flex-1 p-relative">
          <InstantSearchNext
            searchClient={searchClient}
            indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ""}
          >
            <SearchBox></SearchBox>
            <Hits
              hitComponent={Hit}
              className="absolute w-96 max-h-48 overflow-y-auto bg-white shadow-md z-10"
            />
          </InstantSearchNext>
        </div>
        <nav className="flex-1 flex justify-end lg:order-last lg:ml-4">
          <div className="flex flex-row flex-nowrap">
            <SfSelect
              placeholder="-- Select --"
              size="base"
              onChange={onLanguageChange}
            >
              {stores &&
                stores[0]?.languages.map((lang) => (
                  <option value={lang} key={lang}>
                    {lang}
                  </option>
                ))}
            </SfSelect>
            {actionItems.map((actionItem) => (
              <SfButton
                key={actionItem.ariaLabel}
                className="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
                aria-label={actionItem.ariaLabel}
                variant="tertiary"
                square
                slotPrefix={actionItem.icon}
              >
                {actionItem.role === "login" && (
                  <p className="hidden xl:inline-flex whitespace-nowrap">
                    {actionItem.label}
                  </p>
                )}
              </SfButton>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

function Hit({ hit }: { hit: any }) {
  return (
    <article>
      <Image
        src={
          (hit.masterVariant.images && hit.masterVariant.images[0]?.url) || ""
        }
        alt={(hit.name && hit.name["en-US"]) || ""}
        width="150"
        height="150"
      />
      <p>{hit.slug && hit.slug["en-US"]}</p>
      <h1>{hit.name && hit.name["en-US"]}</h1>
      <p>
        $
        {(hit.masterVariant?.prices &&
          hit.masterVariant?.prices[0]?.value?.centAmount) ||
          0}
      </p>
    </article>
  );
}
