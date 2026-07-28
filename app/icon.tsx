import { ImageResponse } from "next/og";

// Required for the Cloudflare Pages target (@cloudflare/next-on-pages runs
// every server route on the edge runtime). Declaring it also skips the Node
// prerender of this route, which crashes on Windows: the bundled @vercel/og
// calls fileURLToPath() on a non-URL path and throws "TypeError: Invalid URL".
// Linux builds happen to get past that; Windows ones cannot.
export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#8FAE6D",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FBF4EA",
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 8
        }}
      >
        华
      </div>
    ),
    size
  );
}
