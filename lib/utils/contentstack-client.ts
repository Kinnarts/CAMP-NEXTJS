import Contentstack from "contentstack";

export const Stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY!,
  environment: process.env.CONTENTSTACK_ENVIRONMENT!,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
  live_preview: {
    management_token: process.env.CONTENTSTACK_TOKEN!,
    enable: true,
    host: "eu-api.contentstack.io",
  },
  region: Contentstack.Region.EU,
});
