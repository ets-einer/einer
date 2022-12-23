import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

// config this when you start using tRPC
// import type { AppRouter } from "../path/to/server/trpc"; // import AppRoter type from server

// const client = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: "http://localhost:3000/trpc", // trpc server url
//     }),
//   ],
// });
