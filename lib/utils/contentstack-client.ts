import Contentstack from "contentstack";

export const Stack = Contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT!,
  delivery_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN!,
  live_preview: {
    management_token: process.env.NEXT_PUBLIC_CONTENTSTACK_TOKEN!,
    enable: true,
    host: "eu-api.contentstack.io",
  },
  region: Contentstack.Region.EU,
});
