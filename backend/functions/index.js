import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import app from "./src/index.js";

setGlobalOptions({
  region: "asia-south1",
});

export const api = onRequest(app);


