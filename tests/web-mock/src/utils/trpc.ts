import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";


// config this when you start using tRPC
import type { AppRouter } from "../../../server-template/src/server"; // import AppRoter type from server

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "http://localhost:3999/trpc", // trpc server url,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});
 