import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/env.js";
import https from "https";
import { getOrCreateSelfSignedCert } from "./config/ssl.js";

const start = async () => {
  await connectDB();

  const { key, cert } = getOrCreateSelfSignedCert();

  const server = https.createServer({ key, cert }, app);

  server.listen(config.port, () => {
    console.log(`HTTPS Server started on https://localhost:${config.port}`);
  });
};

start();
