import express from "express";
import { getPayloadClient } from "./getPayloadClient";
import { newHandler, nextApp } from "./next-utils";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  const payload = await getPayloadClient({
    initialOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });
  app.use((req, res) => newHandler(req, res)),
    nextApp.prepare().then(() => {
      payload.logger.info("Nextsjs Stared");
    });

  //El logger estaba dando nulo, ya que debía de dirigirme a la función que devolvía ese payload (ir a la función)
  app.listen(PORT, async () => {
    payload.logger.info(
      `Next-js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
    );
  });
};

start();
