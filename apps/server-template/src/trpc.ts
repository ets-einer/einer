import { Context } from './context';
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthenticated = t.middleware(({ next, ctx }) => {
    if (!ctx.ok) {
      throw new TRPCError({ code: "UNAUTHORIZED", cause: ctx.responseError });
    }  

    return next({
        ctx: {
            user: ctx.user
        }
    })
})

export const router = t.router;

export const mergeRouters = t.mergeRouters;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(isAuthenticated);