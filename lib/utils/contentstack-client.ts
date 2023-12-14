import Contentstack from "contentstack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath?: string[] | undefined;
  jsonRtePath?: string[] | undefined;
};

const Stack = Contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT!,
  delivery_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN!,
  live_preview: {
    management_token: process.env.NEXT_PUBLIC_CONTENTSTACK_TOKEN!,
    enable: true,
    host: "eu-api.contentstack.com",
  },
  region: Contentstack.Region.EU,
});

ContentstackLivePreview.init({
  //@ts-ignore
  stackSdk: Stack,
  clientUrlParams: {
    host: "eu-app.contentstack.com",
  },
  stackDetails: {
    apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!,
    environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT!,
  },
  enable: true,
  ssr: false,
});

export const { onEntryChange } = ContentstackLivePreview;

export const getEntryByUrl = ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryByUrl) => {
  return new Promise((resolve, reject) => {
    const blogQuery = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
    const data = blogQuery.where("url", `${entryUrl}`).find();
    data.then(
      (result) => {
        resolve(result[0]);
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
};
