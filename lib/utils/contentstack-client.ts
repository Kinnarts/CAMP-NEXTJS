import Contentstack from "contentstack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export const Stack = Contentstack.Stack({
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
});

export const { onEntryChange } = ContentstackLivePreview;
