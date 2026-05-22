"use client";

import Link from "next/link";
import { ReactNode } from "react";

const s = {
  paper: "#efe9dd",
  ink: "#1c1814",
  body: "#3a342b",
  soft: "#6b6256",
  faint: "#8a8170",
  warm: "#d9b04c",
  rule: "rgba(28,24,20,0.22)",
  rule2: "rgba(28,24,20,0.10)",
  serif: 'var(--font-cormorant), "Newsreader", Georgia, serif',
  mono: 'var(--font-plex-mono), ui-monospace, monospace',
  sans: 'var(--font-inter-tight), -apple-system, system-ui, sans-serif',
};

// ─── Seam: hairline rule + mono labels that closes the hero ───────────────
export function Seam() {
  return (
    <div style={{ padding: "0 44px", background: s.paper }}>
      <div style={{ height: 1, background: s.ink, opacity: 0.85 }} />
      <div
        style={{
          paddingTop: 16,
          paddingBottom: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontFamily: s.mono,
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: s.ink,
        }}
      >
        <span style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
          <span>Plate I</span>
          <span style={{ color: s.faint }}>·</span>
          <span style={{ color: s.soft }}>
            Esther Yang — Then · New York · 2026
          </span>
        </span>
        <span
          style={{
            display: "flex",
            gap: 12,
            alignItems: "baseline",
            color: s.soft,
          }}
        >
          <span>Continue</span>
          <span>↓</span>
        </span>
      </div>
    </div>
  );
}

// ─── WorkStrip: horizontal drifting marquee of tiles ──────────────────────
export function WorkStrip() {
  const tiles: { key: string; title: string; year: string; content: ReactNode }[] = [
    { key: "email", title: "AI Auto Email Follow Up", year: "2024", content: <EmailTile /> },
    { key: "minerva", title: "English Fluency at Minerva", year: "2023", content: <MinervaTile /> },
    { key: "learn", title: "Founding AI Engineer · Learn.xyz", year: "2024", content: <LearnTile /> },
    { key: "meta", title: "Data Science · Meta", year: "2022", content: <MetaTile /> },
  ];

  return (
    <section
      style={{
        background: s.paper,
        paddingTop: 24,
        paddingBottom: 88,
        position: "relative",
        overflow: "hidden",
        fontFamily: s.sans,
        color: s.ink,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0 44px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 24,
        }}
      >
        <span
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            fontFamily: s.mono,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: s.ink,
          }}
        >
          <span style={{ width: 38, height: 1, background: s.ink }} />
          <span>Works · 04 · 2022 — 2024</span>
        </span>
        <span
          style={{
            fontFamily: s.serif,
            fontStyle: "italic",
            fontSize: 16,
            color: s.body,
          }}
        >
          ← Drifting · hover to hold
        </span>
      </div>

      {/* Marquee */}
      <div style={{ width: "100%" }}>
        <div
          className="ws-marquee"
          style={{ display: "flex", width: "max-content", willChange: "transform" }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              aria-hidden={i === 1 ? true : undefined}
              style={{
                display: "flex",
                gap: 44,
                alignItems: "flex-end",
                paddingLeft: i === 0 ? 44 : 0,
                paddingRight: 44,
              }}
            >
              {tiles.map((t) => (
                <Link
                  key={`${i}-${t.key}`}
                  href={`/work/${t.key}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  aria-label={t.title}
                >
                  <TilePedestal title={t.title} year={t.year}>
                    {t.content}
                  </TilePedestal>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ws-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ws-marquee { animation: ws-drift 36s linear infinite; }
        .ws-marquee:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
}

function TilePedestal({
  title,
  year,
  children,
}: {
  title: string;
  year: string;
  children: ReactNode;
}) {
  return (
    <figure
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        cursor: "pointer",
      }}
    >
      {children}
      <figcaption
        style={{
          marginTop: 22,
          display: "flex",
          alignItems: "baseline",
          gap: 12,
          maxWidth: 460,
        }}
      >
        <span
          style={{
            fontFamily: s.mono,
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: s.faint,
          }}
        >
          {year}
        </span>
        <span
          style={{
            fontFamily: s.serif,
            fontStyle: "italic",
            fontSize: 19,
            color: s.ink,
            letterSpacing: "-0.005em",
            lineHeight: 1.2,
          }}
        >
          {title}
        </span>
      </figcaption>
    </figure>
  );
}

// ─── Tile I — AI Auto Email Follow Up ─────────────────────────────────────
function EmailTile() {
  return (
    <div
      style={{
        width: 480,
        height: 320,
        background: "#fbf8f1",
        borderRadius: 10,
        border: `1px solid ${s.rule2}`,
        boxShadow:
          "0 30px 50px -28px rgba(28,24,20,0.22), 0 8px 18px -10px rgba(28,24,20,0.10)",
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "34px 1fr",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 12px",
          borderBottom: `1px solid ${s.rule2}`,
          background: "#f1ebda",
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#e6b5a5" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#e8d29a" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#bbcfa4" }} />
        <span
          style={{
            flex: 1,
            marginLeft: 14,
            height: 16,
            borderRadius: 4,
            background: "#e8e0cd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: s.mono,
            fontSize: 9,
            color: s.soft,
            letterSpacing: "0.06em",
          }}
        >
          mail.google.com
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "110px 1fr" }}>
        <aside
          style={{
            borderRight: `1px solid ${s.rule2}`,
            padding: "14px 12px",
            display: "grid",
            gap: 9,
            alignContent: "start",
            fontFamily: s.mono,
            fontSize: 10,
            letterSpacing: "0.06em",
            color: s.body,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: s.ink,
              color: s.paper,
              padding: "6px 8px",
              borderRadius: 4,
              fontWeight: 600,
            }}
          >
            <span
              style={{ width: 6, height: 6, borderRadius: "50%", background: s.warm }}
            />
            Recruiters
          </div>
          <div style={{ padding: "4px 8px" }}>Inbox</div>
          <div style={{ padding: "4px 8px", color: s.faint }}>Drafts</div>
          <div style={{ padding: "4px 8px", color: s.faint }}>Starred</div>
          <div style={{ padding: "4px 8px", color: s.faint }}>Sent</div>
        </aside>

        <div style={{ padding: "8px 14px", display: "grid", gap: 0, alignContent: "start" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "24px 1fr auto",
              gap: 12,
              alignItems: "center",
              padding: "10px 12px",
              marginBottom: 6,
              border: `1px solid ${s.warm}`,
              background: "#f7eed6",
              borderRadius: 4,
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: s.ink,
                color: s.paper,
                display: "grid",
                placeItems: "center",
                fontFamily: s.mono,
                fontSize: 9,
                fontWeight: 600,
              }}
            >
              R
            </span>
            <div style={{ display: "grid", gap: 2, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                <span
                  style={{
                    fontFamily: s.sans,
                    fontWeight: 700,
                    fontSize: 12,
                    color: s.ink,
                  }}
                >
                  Rachel · Stripe
                </span>
                <span
                  style={{
                    fontFamily: s.mono,
                    fontSize: 9,
                    color: s.soft,
                    letterSpacing: "0.08em",
                  }}
                >
                  3d
                </span>
              </div>
              <div
                style={{
                  fontFamily: s.sans,
                  fontSize: 11,
                  color: s.body,
                  lineHeight: 1.35,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontWeight: 600, color: s.ink }}>Re: Following up —</span>{" "}
                Hi Rachel, just wanted to circle back on…
              </div>
            </div>
            <span
              style={{
                fontFamily: s.mono,
                fontSize: 8,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: s.warm,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              AI draft
            </span>
          </div>

          {(
            [
              ["Jonathan · Notion", "Thanks for applying — we received…"],
              ["Aisha · Vercel", "Looking forward to chatting on Thu."],
              ["Sam · Linear", "A few quick scheduling questions…"],
            ] as const
          ).map(([who, snippet], i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr auto",
                gap: 12,
                alignItems: "center",
                padding: "8px 12px",
                borderBottom: i < 2 ? `1px solid ${s.rule2}` : "none",
              }}
            >
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#d8d0bd" }} />
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "baseline",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: s.sans,
                    fontSize: 11,
                    color: s.ink,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {who}
                </span>
                <span
                  style={{
                    fontFamily: s.sans,
                    fontSize: 11,
                    color: s.soft,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    minWidth: 0,
                  }}
                >
                  {snippet}
                </span>
              </div>
              <span style={{ fontFamily: s.mono, fontSize: 9, color: s.faint }}>
                {6 + i}d
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tile II — Minerva fluency study ──────────────────────────────────────
function MinervaTile() {
  return (
    <div
      style={{
        width: 360,
        height: 460,
        background: "#f4eedd",
        border: `1px solid ${s.rule}`,
        boxShadow:
          "0 24px 38px -22px rgba(28,24,20,0.14), 0 4px 10px -6px rgba(28,24,20,0.08)",
        padding: 24,
        display: "grid",
        gridTemplateRows: "auto auto 1fr auto",
        position: "relative",
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(28,24,20,0.035) 0 1px, transparent 1px 22px)",
      }}
    >
      <div
        style={{
          fontFamily: s.mono,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: s.soft,
          marginBottom: 14,
        }}
      >
        Minerva · NLP analysis
      </div>
      <h3
        style={{
          fontFamily: s.serif,
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: 30,
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          margin: 0,
          color: s.ink,
          marginBottom: 22,
        }}
      >
        Does talking like Shakespeare get you a better grade?
      </h3>
      <div style={{ display: "grid", gridTemplateRows: "1fr 1px auto", gap: 4, marginBottom: 14 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 10,
            alignItems: "end",
            height: 160,
          }}
        >
          {[42, 58, 65, 71, 84, 92].map((h, i) => (
            <div
              key={i}
              style={{
                height: `${h}%`,
                background: i < 3 ? "#c9c0ab" : s.warm,
                border: `1px solid ${s.rule}`,
                borderBottom: "none",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -16,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontFamily: s.mono,
                  fontSize: 9,
                  color: s.soft,
                }}
              >
                {[2.1, 2.6, 2.9, 3.1, 3.4, 3.7][i]}
              </span>
            </div>
          ))}
        </div>
        <div style={{ background: s.ink, height: 1 }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 10,
            fontFamily: s.mono,
            fontSize: 9,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: s.soft,
            textAlign: "center",
          }}
        >
          <span>low</span>
          <span>·</span>
          <span>·</span>
          <span>·</span>
          <span>·</span>
          <span>high</span>
        </div>
      </div>
      <div
        style={{
          paddingTop: 14,
          borderTop: `1px solid ${s.rule2}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontFamily: s.mono,
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: s.soft,
          }}
        >
          Pearson r
        </span>
        <span
          style={{
            fontFamily: s.serif,
            fontStyle: "italic",
            fontSize: 26,
            color: s.ink,
            letterSpacing: "-0.01em",
          }}
        >
          + 0.31
        </span>
      </div>
    </div>
  );
}

// ─── Tile III — Learn.xyz phone ───────────────────────────────────────────
function LearnTile() {
  return (
    <div
      style={{
        width: 260,
        height: 500,
        borderRadius: 32,
        padding: 8,
        background: "#1c1814",
        position: "relative",
        boxShadow:
          "0 36px 56px -28px rgba(28,24,20,0.38), 0 12px 22px -10px rgba(28,24,20,0.22)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          width: 64,
          height: 18,
          borderRadius: 10,
          background: "#000",
          zIndex: 2,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 24,
          background: "linear-gradient(180deg, #1c1814 0%, #2a2520 100%)",
          overflow: "hidden",
          position: "relative",
          display: "grid",
          gridTemplateRows: "38px 1fr",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 22px",
            fontFamily: s.sans,
            fontWeight: 600,
            fontSize: 13,
            color: "#fff",
          }}
        >
          <span>9:41</span>
          <span style={{ display: "flex", gap: 4, alignItems: "center", fontSize: 11 }}>
            ●●● ⌃
          </span>
        </div>

        <div style={{ padding: "12px 20px 22px", display: "grid", gap: 14, alignContent: "start" }}>
          <div
            style={{
              fontFamily: s.mono,
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#a89e87",
            }}
          >
            Today&apos;s lesson · 03
          </div>

          <div
            style={{
              width: "100%",
              aspectRatio: "1.2 / 1",
              borderRadius: 14,
              background: "linear-gradient(135deg, #d9b04c 0%, #c47a3b 55%, #7a3e2e 100%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(28,24,20,0.10) 0 2px, transparent 2px 14px)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 12,
                left: 14,
                fontFamily: s.serif,
                fontStyle: "italic",
                fontSize: 22,
                color: "#fff",
                lineHeight: 1.0,
                textShadow: "0 2px 12px rgba(0,0,0,0.25)",
                maxWidth: "85%",
              }}
            >
              Greek myths,
              <br />
              retold in 12 minutes.
            </span>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: s.mono,
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#a89e87",
              }}
            >
              <span>3 of 7</span>
              <span>45%</span>
            </div>
            <div
              style={{
                height: 4,
                background: "rgba(255,255,255,0.12)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div style={{ width: "45%", height: "100%", background: s.warm }} />
            </div>
          </div>

          <button
            style={{
              marginTop: 4,
              padding: "13px 0",
              borderRadius: 999,
              background: s.warm,
              color: s.ink,
              border: "none",
              cursor: "pointer",
              fontFamily: s.mono,
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Tile IV — Meta confidential ──────────────────────────────────────────
function MetaTile() {
  return (
    <div
      style={{
        width: 380,
        height: 420,
        background: "radial-gradient(circle at 30% 20%, #2a2520 0%, #14110f 70%)",
        border: "1px solid #2a2520",
        boxShadow:
          "0 30px 50px -28px rgba(0,0,0,0.45), 0 8px 18px -10px rgba(0,0,0,0.30)",
        padding: 26,
        position: "relative",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        color: "#e8e0cd",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 9px)",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: s.mono,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#8a8170",
          position: "relative",
        }}
      >
        <span>Meta · 2022</span>
        <span style={{ color: s.warm }}>NDA</span>
      </div>

      <div style={{ display: "grid", alignContent: "center", position: "relative", gap: 16 }}>
        <div
          style={{
            fontFamily: s.serif,
            fontStyle: "italic",
            fontSize: 58,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "#f4eedd",
          }}
        >
          Confidential.
        </div>
        <div
          style={{
            fontFamily: s.sans,
            fontWeight: 500,
            fontSize: 15,
            lineHeight: 1.45,
            color: "#c9c0ab",
            maxWidth: 280,
          }}
        >
          A deduplication pipeline. 20× faster runtime. Mark is happy.
        </div>
      </div>

      <div
        style={{
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          fontFamily: s.mono,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#8a8170",
          position: "relative",
        }}
      >
        <span style={{ width: 22, height: 1, background: "#8a8170" }} />
        <span>Nothing to show — it&apos;s NDA</span>
      </div>
    </div>
  );
}
