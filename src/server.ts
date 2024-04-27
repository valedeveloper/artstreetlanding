import express from "express";
import { getPayloadClient } from "./getPayloadClient";
import { newHandler, nextApp } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import bodyParser from "body-parser";
import { IncomingMessage } from "http";
import { stripeWebhookHandler } from "./webhooks";
import nextBuild from "next/dist/build";
import path from "path";
const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});
export type ExpressContext = inferAsyncReturnType<typeof createContext>;
export type WebhookRequest = IncomingMessage & { rawBody: Buffer };
const start = async () => {
  const webhookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer;
    },
  });
  
  app.post("/api/webhooks/stipe", webhookMiddleware, stripeWebhookHandler);
  
  
  const payload = await getPayloadClient({
    initialOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  

  // if (process.env.NEXT_BUILD) {
  //   app.listen(PORT, async () => {
  //     payload.logger.info("NextJs is building production");
  //     //@ts-expect-error
  //     await nextBuild(path.join(__dirname, "../"));
  //     process.exit();
  //   });
  //   return;
  // }

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
      payload.logger.info(`Next-js App URL: http://localhost:3000`);
    });
  });

  //El logger estaba dando nulo, ya que debía de dirigirme a la función que devolvía ese payload (ir a la función)
};

start();
