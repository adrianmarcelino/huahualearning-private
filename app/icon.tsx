import { ImageResponse } from "next/og";

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
