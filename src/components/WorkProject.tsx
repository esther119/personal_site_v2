import Link from "next/link";
import { ReactNode } from "react";

import {
  FeatureItem,
  MetaRow,
  Plate,
  WORK_PROJECTS,
  WorkProject as WorkProjectT,
} from "@/lib/work-projects";

const s = {
  paper: "#efe9dd",
  ink: "#1c1814",
  body: "#3a342b",
  soft: "#6b6256",
  faint: "#8a8170",
  rule: "rgba(28,24,20,0.22)",
  rule2: "rgba(28,24,20,0.10)",
  warm: "#d9b04c",
  serif: 'var(--font-cormorant), "Newsreader", Georgia, serif',
  mono: 'var(--font-plex-mono), ui-monospace, monospace',
  sans: 'var(--font-inter-tight), -apple-system, system-ui, sans-serif',
};

export function WorkProjectPage({ project }: { project: WorkProjectT }) {
  const index = WORK_PROJECTS.findIndex((p) => p.slug === project.slug);
  const total = WORK_PROJECTS.length;
  const prev = WORK_PROJECTS[(index - 1 + total) % total];
  const next = WORK_PROJECTS[(index + 1) % total];
  const workIsList = Array.isArray(project.work);
  const resultsIsList = Array.isArray(project.results);

  return (
    <div
      style={{
        background: s.paper,
        color: s.ink,
        fontFamily: s.sans,
        minHeight: "100vh",
        padding: "28px 60px 48px",
      }}
    >
      <WorkNav />

      <div
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "stretch",
          height: 680,
        }}
      >
        {/* Left: image card */}
        <ProjectImageCard project={project} />

        {/* Right: editorial column (scrolls if overflows) */}
        <div
          className="work-scroll"
          style={{
            minHeight: 0,
            maxHeight: "100%",
            overflowY: "auto",
            paddingRight: 18,
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
            <BackButton />
          </div>

          <h1
            style={{
              fontFamily: s.sans,
              fontWeight: 700,
              fontSize: 60,
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
              margin: 0,
              color: s.ink,
              textWrap: "balance" as const,
            }}
          >
            {project.title}
          </h1>

          <WallLabelMeta meta={project.meta} />

          <div style={{ marginTop: 26, display: "grid", gap: 22 }}>
            <BodyBlock kicker="Purpose">
              <BodyParagraph text={project.purpose} />
            </BodyBlock>
            <BodyBlock kicker="Work">
              {workIsList ? (
                <NumberedList items={project.work as string[]} />
              ) : (
                <BodyParagraph text={project.work as string} />
              )}
            </BodyBlock>
            <BodyBlock kicker="Result">
              {resultsIsList ? (
                <NumberedList items={project.results as string[]} />
              ) : (
                <BodyParagraph text={project.results as string} />
              )}
            </BodyBlock>
            {project.featuresCompact ? (
              <FeatureTrio kicker="Features" items={project.featuresCompact} />
            ) : project.features && project.features.length > 0 ? (
              <BodyBlock kicker="Features">
                <NumberedList items={project.features} />
              </BodyBlock>
            ) : null}
          </div>

          <Pager prev={prev} next={next} />
        </div>
      </div>

      <style>{`
        .work-scroll::-webkit-scrollbar { width: 8px; }
        .work-scroll::-webkit-scrollbar-track { background: transparent; }
        .work-scroll::-webkit-scrollbar-thumb {
          background: rgba(28,24,20,0.18);
          border-radius: 4px;
        }
        .work-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(28,24,20,0.32);
        }
        .work-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(28,24,20,0.20) transparent;
        }
      `}</style>
    </div>
  );
}

// ────────────────────────────── Shared chrome ──────────────────────────────
function WorkNav() {
  const links = ["About", "Work", "Notes", "Now", "Contact"];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "0 0 24px",
      }}
    >
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            fontFamily: s.serif,
            fontWeight: 500,
            letterSpacing: "0.12em",
            fontSize: 14,
            lineHeight: 1.15,
          }}
        >
          <div>ESTHER</div>
          <div style={{ color: s.soft, fontSize: 11, letterSpacing: "0.18em" }}>
            YANG / 2026
          </div>
        </div>
      </Link>
      <nav
        style={{
          display: "flex",
          gap: 36,
          justifyContent: "center",
          fontFamily: s.mono,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {links.map((t) => (
          <span
            key={t}
            style={{
              color: s.ink,
              cursor: "pointer",
              paddingBottom: 4,
              borderBottom:
                t === "Work" ? `1px solid ${s.ink}` : "1px solid transparent",
            }}
          >
            {t}
          </span>
        ))}
      </nav>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: "1px solid #c9c0ad",
            background: "rgba(255,255,255,0.4)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ width: 14, height: 1, background: s.ink }} />
            <div style={{ width: 14, height: 1, background: s.ink }} />
          </div>
        </button>
      </div>
    </div>
  );
}

function BackButton() {
  return (
    <Link
      href="/"
      aria-label="Back home"
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: `1px solid ${s.ink}`,
        background: "transparent",
        color: s.ink,
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        fontSize: 17,
        lineHeight: 1,
        textDecoration: "none",
      }}
    >
      ←
    </Link>
  );
}

// ────────────────────────────── Body pieces ────────────────────────────────
function BodyBlock({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <div>
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
        {kicker}
      </div>
      {children}
    </div>
  );
}

function BodyParagraph({ text }: { text: string }) {
  return (
    <p
      style={{
        margin: 0,
        maxWidth: 1000,
        fontFamily: s.sans,
        fontWeight: 400,
        fontSize: 19,
        lineHeight: 1.5,
        color: s.ink,
      }}
    >
      {text}
    </p>
  );
}

function NumberedList({ items }: { items: string[] }) {
  // Trio layout matching the Email page Features trio: warm numeral on top,
  // body below. Multi-column when there are enough items to make it breathe.
  const cols = items.length >= 5 ? 3 : items.length >= 3 ? 3 : items.length;
  return (
    <ol
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        columnGap: 28,
        rowGap: 24,
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            paddingTop: 14,
            borderTop: `1px solid ${s.rule2}`,
          }}
        >
          <div
            style={{
              fontFamily: s.sans,
              fontWeight: 600,
              fontSize: 26,
              color: s.warm,
              fontVariantNumeric: "tabular-nums",
              marginBottom: 10,
              lineHeight: 1,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: s.sans,
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.45,
              color: s.body,
            }}
          >
            {item}
          </div>
        </li>
      ))}
    </ol>
  );
}

function FeatureTrio({ kicker, items }: { kicker: string; items: FeatureItem[] }) {
  return (
    <div>
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
        {kicker}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          gap: 32,
        }}
      >
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              paddingTop: 14,
              borderTop: `1px solid ${s.rule2}`,
            }}
          >
            <div
              style={{
                fontFamily: s.sans,
                fontWeight: 600,
                fontSize: 26,
                color: s.warm,
                fontVariantNumeric: "tabular-nums",
                marginBottom: 8,
                lineHeight: 1,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div
              style={{
                fontFamily: s.sans,
                fontWeight: 600,
                fontSize: 17,
                color: s.ink,
                letterSpacing: "-0.005em",
                marginBottom: 6,
              }}
            >
              {it.title}
            </div>
            <div
              style={{
                fontFamily: s.sans,
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.45,
                color: s.body,
              }}
            >
              {it.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WallLabelMeta({ meta }: { meta: MetaRow[] }) {
  return (
    <div
      style={{
        marginTop: 18,
        paddingTop: 14,
        borderTop: `1px solid ${s.rule2}`,
        display: "flex",
        flexWrap: "wrap",
        columnGap: 14,
        rowGap: 6,
        alignItems: "baseline",
        fontFamily: s.mono,
        fontSize: 11,
        letterSpacing: "0.20em",
        textTransform: "uppercase",
      }}
    >
      {meta.map((row, i) => (
        <span
          key={row.label}
          style={{ display: "contents" }}
        >
          {i > 0 && <span style={{ color: s.faint }}>·</span>}
          <span
            style={{
              color: row.link ? s.warm : i === 0 ? s.ink : s.soft,
              textDecoration: row.link ? "underline" : "none",
              textUnderlineOffset: 4,
              cursor: row.link ? "pointer" : "default",
            }}
          >
            {row.value}
          </span>
        </span>
      ))}
    </div>
  );
}

function Pager({ prev, next }: { prev: WorkProjectT; next: WorkProjectT }) {
  return (
    <div
      style={{
        marginTop: 60,
        paddingTop: 24,
        borderTop: `1px solid ${s.rule}`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 32,
      }}
    >
      <Link
        href={`/work/${prev.slug}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          gap: 6,
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
          ← Previous · Plate {prev.plate}
        </span>
        <span
          style={{
            fontFamily: s.serif,
            fontStyle: "italic",
            fontSize: 22,
            color: s.ink,
          }}
        >
          {prev.title}
        </span>
      </Link>
      <Link
        href={`/work/${next.slug}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          textAlign: "right",
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
          Next · Plate {next.plate} →
        </span>
        <span
          style={{
            fontFamily: s.serif,
            fontStyle: "italic",
            fontSize: 22,
            color: s.ink,
          }}
        >
          {next.title}
        </span>
      </Link>
    </div>
  );
}

// ────────────────────────────── Image card ─────────────────────────────────
function ProjectImageCard({ project }: { project: WorkProjectT }) {
  const plate = project.plates?.[0];
  return (
    <div
      style={{
        background: "#f4eedd",
        border: `1px solid ${s.rule2}`,
        borderRadius: 14,
        padding: 44,
        height: 680,
        position: "relative",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          width: 38,
          height: 38,
          borderRadius: 10,
          background: "#fdfbf3",
          border: `1px solid ${s.rule2}`,
          display: "grid",
          placeItems: "center",
          color: s.soft,
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        ◉
      </div>

      {plate ? (
        <DeviceShot plate={plate} label={`${project.plate}.1`} />
      ) : project.confidential ? (
        <ConfidentialBody text={project.confidential} />
      ) : null}
    </div>
  );
}

function ConfidentialBody({ text }: { text: string }) {
  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <div
        style={{
          fontFamily: s.mono,
          fontSize: 11,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: s.soft,
          marginBottom: 18,
        }}
      >
        Confidential
      </div>
      <div
        style={{
          fontFamily: s.serif,
          fontStyle: "italic",
          fontSize: 38,
          lineHeight: 1.2,
          color: s.ink,
          letterSpacing: "-0.01em",
        }}
      >
        {text}
      </div>
    </div>
  );
}

function DeviceShot({ plate, label }: { plate: Plate; label: string }) {
  const aspect = plate.aspect ?? 16 / 10;

  if (plate.device === "figure") {
    return (
      <figure
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: 560,
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: String(aspect),
            padding: plate.image ? 0 : 22,
            background: "#fbf8f1",
            border: `1px solid ${s.rule}`,
            boxShadow:
              "0 24px 40px -22px rgba(28,24,20,0.16), 0 6px 14px -8px rgba(28,24,20,0.08)",
            position: "relative",
            boxSizing: "border-box",
            overflow: "hidden",
            backgroundImage: plate.image
              ? undefined
              : "repeating-linear-gradient(0deg, rgba(28,24,20,0.045) 0 1px, transparent 1px 22px)",
          }}
        >
          {plate.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={plate.image}
              alt={plate.caption}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          )}
        </div>
        <Caption label={label} caption={plate.caption} kicker="Fig." />
      </figure>
    );
  }

  if (plate.device === "raw") {
    return (
      <figure style={{ margin: 0, width: "100%", maxWidth: 560 }}>
        <div
          style={{
            width: "100%",
            aspectRatio: String(aspect),
            background: "#1c1814",
            borderRadius: 10,
            boxShadow:
              "0 28px 50px -28px rgba(28,24,20,0.30), 0 8px 18px -10px rgba(28,24,20,0.18)",
            overflow: "hidden",
            backgroundImage:
              plate.image || plate.video
                ? undefined
                : "linear-gradient(135deg, #1c1814 0%, #2a2520 60%, #3b342a 100%)",
          }}
        >
          {plate.video ? (
            <video
              src={plate.video}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : plate.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={plate.image}
              alt={plate.caption}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : null}
        </div>
        <Caption label={label} caption={plate.caption} kicker="Fig." />
      </figure>
    );
  }

  // device chrome (phone / tablet / laptop / desktop)
  const D = {
    phone: { w: 240, h: 500, bezel: 10, radius: 32, screenR: 22 },
    tablet: { w: 460, h: 620, bezel: 14, radius: 18, screenR: 6 },
    laptop: { w: 560, h: 360, bezel: 8, radius: 12, screenR: 4 },
    desktop: { w: 560, h: 360, bezel: 6, radius: 6, screenR: 2 },
  }[plate.device];

  return (
    <figure
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: D.w,
      }}
    >
      <div
        style={{
          width: D.w,
          height: D.h,
          borderRadius: D.radius,
          padding: D.bezel,
          background: "#1c1814",
          boxShadow:
            "0 36px 60px -28px rgba(28,24,20,0.32), 0 12px 22px -10px rgba(28,24,20,0.18)",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {plate.device === "phone" && (
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
        )}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: D.screenR,
            overflow: "hidden",
            background: plate.image
              ? "#000"
              : "linear-gradient(135deg, #d9b04c 0%, #c47a3b 55%, #7a3e2e 100%)",
          }}
        >
          {plate.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={plate.image}
              alt={plate.caption}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}
        </div>
      </div>
      <Caption label={label} caption={plate.caption} kicker="Fig." />
    </figure>
  );
}

function Caption({
  label,
  caption,
  kicker = "Fig.",
}: {
  label: string;
  caption: string;
  kicker?: string;
}) {
  return (
    <figcaption
      style={{
        marginTop: 16,
        display: "flex",
        gap: 12,
        alignItems: "baseline",
        fontFamily: s.mono,
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: s.soft,
        maxWidth: 600,
      }}
    >
      <span style={{ color: s.ink, whiteSpace: "nowrap" }}>
        {kicker} {label}
      </span>
      <span
        style={{
          fontFamily: s.sans,
          fontWeight: 400,
          letterSpacing: 0,
          textTransform: "none",
          fontSize: 13,
          color: s.body,
          lineHeight: 1.4,
        }}
      >
        {caption}
      </span>
    </figcaption>
  );
}
