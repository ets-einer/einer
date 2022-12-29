import { publicProcedure, router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const exampleRouter = router({
  hello: publicProcedure.query(({}) => {
    return { msg: "Hello!" };
  }),
  protectedHello: protectedProcedure
    .input(z.object({ number: z.number() }))
    .query(async ({ ctx, input }) => {
      const exampleData = await ctx.prisma.example.findMany()
      return {
        msg: "Protected Hello!",
        number: input.number + 2,
        userEmail: ctx.user.email,
        exampleData
      };
    }),
});
