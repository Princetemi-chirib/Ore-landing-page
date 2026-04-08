import { ImageResponse } from "next/og";
import path from "node:path";
import { readFile } from "node:fs/promises";

export const runtime = "nodejs";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

async function loadLogoDataUrl() {
  const candidates = ["logo 3.png", "logo3.png", "logo_3.png"];
  for (const name of candidates) {
    try {
      const buf = await readFile(path.join(process.cwd(), "public", "images", name));
      return `data:image/png;base64,${buf.toString("base64")}`;
    } catch {
      // try next candidate
    }
  }
  return null;
}

export default async function Icon() {
  const logo = await loadLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 8,
        }}
      >
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            width={26}
            height={26}
            style={{ objectFit: "contain" }}
            alt="Ọ̀rẹ́"
          />
        ) : (
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: "#111111",
            }}
          />
        )}
      </div>
    ),
    size,
  );
}

