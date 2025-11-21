import fs from "fs";
import path from "path";
import selfsigned from "selfsigned";

const CERT_DIR = path.resolve(process.cwd(), "certs");
const KEY_PATH = path.join(CERT_DIR, "key.pem");
const CERT_PATH = path.join(CERT_DIR, "cert.pem");

export function getOrCreateSelfSignedCert() {
  const forceRegen = !!process.env.REGEN_CERTS;
  if (!fs.existsSync(CERT_DIR)) {
    fs.mkdirSync(CERT_DIR, { recursive: true });
  }

  const exists = fs.existsSync(KEY_PATH) && fs.existsSync(CERT_PATH);

  if (!exists || forceRegen) {
    const attrs = [{ name: "commonName", value: "localhost" }];
    const pems = selfsigned.generate(attrs, {
      algorithm: "sha256",
      days: 3650,
      keySize: 2048,
      extensions: [
        {
          name: "basicConstraints",
          cA: true,
        },
        {
          name: "subjectAltName",
          altNames: [
            { type: 2, value: "localhost" },
            { type: 7, ip: "127.0.0.1" },
            { type: 7, ip: "::1" },
          ],
        },
      ],
    });

    fs.writeFileSync(KEY_PATH, pems.private, { mode: 0o600 });
    fs.writeFileSync(CERT_PATH, pems.cert, { mode: 0o644 });
    console.log("Generated new self-signed certificate:", KEY_PATH, CERT_PATH);
  } else {
    console.log("Using existing certificate:", KEY_PATH, CERT_PATH);
  }

  const key = fs.readFileSync(KEY_PATH, "utf8");
  const cert = fs.readFileSync(CERT_PATH, "utf8");

  return { key, cert };
}
