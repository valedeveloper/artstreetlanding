import express from "express";
import { getPayloadClient } from "./getPayloadClient";
import { newHandler, nextApp } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import {inferAsyncReturnType} from '@trpc/server'
const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});
export type ExpressContext= inferAsyncReturnType<typeof createContext>
const start = async () => {
  const payload = await getPayloadClient({
    initialOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });
  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => newHandler(req, res));
  nextApp.prepare().then(() => {
    payload.logger.info("Nextsjs Stared");

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next-js App URL: http://localhost:3000`
      );
    });
  });

  //El logger estaba dando nulo, ya que debía de dirigirme a la función que devolvía ese payload (ir a la función)
};

start();
