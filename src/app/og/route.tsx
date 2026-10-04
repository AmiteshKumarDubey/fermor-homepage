import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#F6F4EE",
          padding: "60px 80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              backgroundColor: "#2FA35B",
            }}
          />
          <span style={{ fontSize: 32, fontWeight: 700, color: "#0F1A14" }}>
            Fermor
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 400,
              color: "#0F1A14",
              lineHeight: 1.1,
            }}
          >
            Begin your financial momentum.
          </div>
          <div style={{ fontSize: 24, color: "#526056", fontFamily: "sans-serif" }}>
            Personal finance for India. Transparent math, zero login walls, 100% browser-side execution.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: 18,
            color: "#1F7A43",
            fontFamily: "monospace",
          }}
        >
          <span>Calculators</span>
          <span>•</span>
          <span>Guides</span>
          <span>•</span>
          <span>Methodology</span>
          <span>•</span>
          <span>Principles</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
