import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { setContext } from "@apollo/client/link/context";

export const { getClient } = registerApolloClient(() => {
  const authLink = setContext(async (_, { headers }) => {
    const res = await fetch(
      `${process.env.COMMERCETOOLS_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=manage_project:${process.env.COMMERCETOOLS_PROJECT_KEY}`,
      {
        method: "POST",
        headers: {
          Authorization:
            `Basic ` +
            Buffer.from(
              process.env.COMMERCETOOLS_CLIENT_ID +
                ":" +
                process.env.COMMERCETOOLS_CLIENT_SECRET
            ).toString("base64"),
        },
        cache: "no-store",
      }
    );
    const authData = await res.json();

    return {
      headers: {
        ...headers,
        authorization: authData?.access_token
          ? `Bearer ${authData.access_token}`
          : "",
        cache: "no-store",
      },
    };
  });

  const httpLink = new HttpLink({
    uri: `${process.env.COMMERCETOOLS_API_URL}/${process.env.COMMERCETOOLS_PROJECT_KEY}/graphql`,
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});
