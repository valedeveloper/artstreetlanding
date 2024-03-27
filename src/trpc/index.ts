import { z } from "zod";
import { authRouter } from "./auth-route";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/queryValidator";
import { query } from "express";
import payload from "payload";
import { getPayloadClient } from "../getPayloadClient";

//Aquí utilizo ese outer que inicialicé en el trpc y exporto un typo que va  a seleccionar los tipos que devuelva el app router
export const appRouter = router({
  auth: authRouter,

  getInfiniteProducts: publicProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100),
      cursor: z.number().nullish(),
      query: QueryValidator,
    })
  )
  .query(async ({ input }) => {
    const { query, cursor } = input
    const { sort, limit, ...queryOpts } = query

    const payload = await getPayloadClient()

    const parsedQueryOpts: Record<
      string,
      { equals: string }
    > = {}

    Object.entries(queryOpts).forEach(([key, value]) => {
      parsedQueryOpts[key] = {
        equals: value,
      }
    })

    const page = cursor || 1

    const {
      docs: items,
      hasNextPage,
      nextPage,
    } = await payload.find({
      collection: 'products',
      where: {
        approvedForSale: {
          equals: 'approved',
        },
        ...parsedQueryOpts,
      },
      sort,
      depth: 1,
      limit,
      page,
    })

    return {
      items,
      nextPage: hasNextPage ? nextPage : null,
    }
  }),
});
export type AppRouter = typeof appRouter;
