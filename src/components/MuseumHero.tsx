"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

const styles = {
  serif: 'var(--font-cormorant), "Newsreader", Georgia, serif',
  mono: 'var(--font-plex-mono), ui-monospace, monospace',
  sans: 'var(--font-inter-tight), -apple-system, system-ui, sans-serif',
  ink: "#1c1814",
  paper: "#efe9dd",
  warm: "#d9b04c",
};

type Reveal = { mx: number; my: number; angle: number; intensity: number };

function shortestAngleDelta(target: number, current: number) {
  let d = (target - current) % Math.PI;
  if (d > Math.PI / 2) d -= Math.PI;
  if (d < -Math.PI / 2) d += Math.PI;
  return d;
}

export function MuseumHero({
  showFooter = true,
  heroHeight,
}: {
  showFooter?: boolean;
  heroHeight?: number | string;
} = {}) {
  const portraitRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState<Reveal>({
    mx: 1.5,
    my: 0.5,
    angle: Math.PI / 2,
    intensity: 0,
  });
  const targetAngle = useRef(Math.PI / 2);
  const hoveringRef = useRef(false);
  const lastMove = useRef({ x: 0, y: 0, t: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    function tick() {
      setReveal((r) => {
        const da = shortestAngleDelta(targetAngle.current, r.angle);
        const newAngle = r.angle + da * 0.05;
        const targetIntensity = hoveringRef.current ? 1 : 0;
        const newIntensity = r.intensity + (targetIntensity - r.intensity) * 0.08;
        return { ...r, angle: newAngle, intensity: newIntensity };
      });
      rafId.current = requestAnimationFrame(tick);
    }
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  function handleMove(clientX: number, clientY: number) {
    const rect = portraitRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    const now = performance.now();
    const dt = now - lastMove.current.t;
    if (lastMove.current.t > 0 && dt > 0 && dt < 200) {
      const dx = x - lastMove.current.x;
      const dy = y - lastMove.current.y;
      const mag = Math.sqrt(dx * dx + dy * dy);
      if (mag > 0.004) {
        targetAngle.current = Math.atan2(dy, dx) + Math.PI / 2;
      }
    }
    lastMove.current = { x, y, t: now };
    hoveringRef.current = true;
    setReveal((r) => ({ ...r, mx: x, my: y }));
  }

  function onMouseMove(e: React.MouseEvent) {
    handleMove(e.clientX, e.clientY);
  }
  function onMouseEnter(e: React.MouseEvent) {
    hoveringRef.current = true;
    handleMove(e.clientX, e.clientY);
  }
  function onTouchMove(e: React.TouchEvent) {
    const t = e.touches[0];
    if (t) handleMove(t.clientX, t.clientY);
  }
  function onPointerLeave() {
    hoveringRef.current = false;
    lastMove.current = { x: 0, y: 0, t: 0 };
  }

  function revealClipPath() {
    const W = 1000;
    const H = 1000;
    const mx = reveal.mx * W;
    const my = reveal.my * H;
    const angle = reveal.angle;
    const cx = Math.cos(angle);
    const cy = Math.sin(angle);
    const nx = -cy;
    const ny = cx;
    const sideOf = (x: number, y: number) => (x - mx) * nx + (y - my) * ny;

    const eps = 1e-6;
    const ints: { x: number; y: number }[] = [];
    if (Math.abs(cy) > eps) {
      const tTop = -my / cy;
      const xTop = mx + tTop * cx;
      if (xTop >= -eps && xTop <= W + eps)
        ints.push({ x: Math.max(0, Math.min(W, xTop)), y: 0 });
      const tBot = (H - my) / cy;
      const xBot = mx + tBot * cx;
      if (xBot >= -eps && xBot <= W + eps)
        ints.push({ x: Math.max(0, Math.min(W, xBot)), y: H });
    }
    if (Math.abs(cx) > eps) {
      const tLeft = -mx / cx;
      const yLeft = my + tLeft * cy;
      if (yLeft >= -eps && yLeft <= H + eps)
        ints.push({ x: 0, y: Math.max(0, Math.min(H, yLeft)) });
      const tRight = (W - mx) / cx;
      const yRight = my + tRight * cy;
      if (yRight >= -eps && yRight <= H + eps)
        ints.push({ x: W, y: Math.max(0, Math.min(H, yRight)) });
    }
    const uniq: { x: number; y: number }[] = [];
    for (const p of ints) {
      if (!uniq.some((q) => Math.abs(q.x - p.x) < 0.5 && Math.abs(q.y - p.y) < 0.5))
        uniq.push(p);
    }

    if (uniq.length < 2) {
      return sideOf(W / 2, H / 2) > 0
        ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        : "polygon(0% 0%, 0% 0%, 0% 0%)";
    }

    function bp(p: { x: number; y: number }) {
      if (p.y < 0.5) return p.x;
      if (p.x > W - 0.5) return W + p.y;
      if (p.y > H - 0.5) return W + H + (W - p.x);
      return 2 * W + H + (H - p.y);
    }
    const corners = [
      { x: W, y: 0, c: true },
      { x: W, y: H, c: true },
      { x: 0, y: H, c: true },
      { x: 0, y: 0, c: true },
    ];
    type Pt = { x: number; y: number; c?: boolean; i?: boolean; pos: number };
    const all: Pt[] = [
      ...corners.map((p) => ({ ...p, pos: bp(p) })),
      { ...uniq[0], i: true, pos: bp(uniq[0]) },
      { ...uniq[1], i: true, pos: bp(uniq[1]) },
    ].sort((a, b) => a.pos - b.pos);

    const i1 = all.findIndex((p) => p.i);
    const i2 = all.findIndex((p, idx) => idx > i1 && p.i);
    const n = all.length;
    function runFrom(startIdx: number, endIdx: number, forward: boolean) {
      const out: Pt[] = [];
      let k = startIdx;
      while (true) {
        out.push(all[k]);
        if (k === endIdx) break;
        k = forward ? (k + 1) % n : (k - 1 + n) % n;
      }
      return out;
    }
    const runA = runFrom(i1, i2, true);
    function isCoolSide(run: Pt[]) {
      for (let i = 1; i < run.length - 1; i++) {
        if (run[i].c && sideOf(run[i].x, run[i].y) < 0) return false;
      }
      return true;
    }
    const run = isCoolSide(runA) ? runA : runFrom(i1, i2, false);
    return (
      "polygon(" +
      run
        .map(
          (p) =>
            `${((p.x / W) * 100).toFixed(2)}% ${((p.y / H) * 100).toFixed(2)}%`
        )
        .join(", ") +
      ")"
    );
  }

  const i = reveal.intensity;
  const tiltY = (reveal.mx - 0.5) * 3 * i;
  const tiltX = (0.5 - reveal.my) * 2 * i;
  const tx = (reveal.mx - 0.5) * 5 * i;
  const ty = (reveal.my - 0.5) * 3.5 * i;
  const sc = 1 + 0.012 * i;

  return (
    <div
      style={{
        width: "100%",
        minHeight: heroHeight ?? "100vh",
        height: heroHeight,
        background: styles.paper,
        color: styles.ink,
        fontFamily: styles.sans,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top nav */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 5,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "28px 44px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontFamily: styles.serif,
              fontWeight: 500,
              letterSpacing: "0.12em",
              fontSize: 14,
              lineHeight: 1.15,
            }}
          >
            <div>ESTHER</div>
            <div style={{ color: "#6b6256", fontSize: 11, letterSpacing: "0.18em" }}>
              YANG / 2026
            </div>
          </div>
          <button
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: "1px solid #c9c0ad",
              background: "transparent",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              color: styles.ink,
              fontSize: 12,
            }}
          >
            ♪
          </button>
        </div>
        <nav
          style={{
            display: "flex",
            gap: 36,
            justifyContent: "center",
            fontFamily: styles.mono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {["About", "Work", "Notes", "Now", "Contact"].map((t) => (
            <a key={t} style={{ color: styles.ink, cursor: "pointer" }}>
              {t}
            </a>
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
              <div style={{ width: 14, height: 1, background: styles.ink }} />
              <div style={{ width: 14, height: 1, background: styles.ink }} />
            </div>
          </button>
        </div>
      </div>

      {/* Main stage */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: heroHeight
            ? `calc(${typeof heroHeight === "number" ? heroHeight + "px" : heroHeight} - 100px)`
            : "calc(100vh - 100px)",
          minHeight: heroHeight ? undefined : 700,
          overflow: "hidden",
        }}
      >
        {/* Portrait area */}
        <div
          ref={portraitRef}
          onMouseEnter={onMouseEnter}
          onMouseMove={onMouseMove}
          onMouseLeave={onPointerLeave}
          onTouchStart={(e) => {
            hoveringRef.current = true;
            onTouchMove(e);
          }}
          onTouchMove={onTouchMove}
          onTouchEnd={onPointerLeave}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "62%",
            perspective: 1400,
            perspectiveOrigin: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
              transform: `translate3d(${tx}px, ${ty}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${sc})`,
            }}
          >
            <PortraitImage
              caption="now · new york · 2026"
              style={{ filter: "sepia(0.25) saturate(1.1) contrast(1.04) brightness(1.02)" }}
            />
            <div style={{ position: "absolute", inset: 0, clipPath: revealClipPath() }}>
              <PortraitImage
                caption="then · taipei · 2018"
                style={{ filter: "grayscale(1) contrast(1.1) brightness(0.97)" }}
              />
            </div>
          </div>

        </div>

        {/* Pagination */}
        <div
          style={{
            position: "absolute",
            right: 44,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            fontFamily: styles.mono,
            fontSize: 11,
            color: styles.ink,
          }}
        >
          <span>01</span>
          <div style={{ width: 1, height: 80, background: styles.ink, opacity: 0.5 }} />
          <span style={{ color: "#8a8170" }}>05</span>
        </div>

        {/* Hero copy */}
        <div
          style={{
            position: "absolute",
            right: 110,
            top: 165,
            maxWidth: 600,
            zIndex: 2,
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: styles.mono,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            <span style={{ width: 38, height: 1, background: styles.ink }} />
            <span>A working theory</span>
          </div>
          <h1
            style={{
              fontFamily: styles.serif,
              fontWeight: 400,
              fontSize: 124,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Engineer
            <br />
            with{" "}
            <span
              style={{
                fontStyle: "italic",
                display: "inline-block",
                transformOrigin: "left center",
                color: `color-mix(in oklch, ${styles.ink} ${(100 - 100 * i).toFixed(1)}%, ${styles.warm} ${(100 * i).toFixed(1)}%)`,
                transform: `scale(${1 + 0.09 * i}) rotate(${-2.5 * i}deg) translateY(${-3 * i}px)`,
                textShadow:
                  i > 0.4
                    ? `0 ${4 * i}px ${20 * i}px rgba(217,176,76,${0.25 * i})`
                    : "none",
                transition: "text-shadow 0.1s",
              }}
            >
              taste
            </span>
            .
          </h1>
          <p
            style={{
              marginTop: 38,
              marginBottom: 36,
              fontSize: 16,
              lineHeight: 1.55,
              color: "#3a342b",
              maxWidth: 360,
            }}
          >
            Software engineer and machine-learning practitioner from Taipei, now in
            New York. Building tools that make learning a place, not a
            transaction.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <button
              style={{
                background: styles.ink,
                color: styles.paper,
                border: "none",
                padding: "17px 30px",
                fontFamily: styles.mono,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Read the about
            </button>
            <button
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontFamily: styles.mono,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: styles.ink,
                padding: 0,
              }}
            >
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1px solid " + styles.ink,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                ▸
              </span>
              See the work
            </button>
          </div>
        </div>

        {/* Side gallery */}
        <div
          style={{
            position: "absolute",
            left: 44,
            top: 140,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: styles.mono,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#6b6256",
              marginBottom: 4,
            }}
          >
            State · then
          </div>
          {[
            { filter: "grayscale(1) contrast(1.1) brightness(0.97)", label: "2018" },
            { filter: "sepia(0.65) contrast(1.05) saturate(1.15)", label: "2022" },
            { filter: "sepia(0.25) saturate(1.1) contrast(1.04)", label: "2024" },
          ].map((g, idx) => (
            <div
              key={idx}
              style={{
                width: 60,
                height: 78,
                backgroundImage: "url(/esther-portrait.png)",
                backgroundSize: "cover",
                backgroundPosition: "15% center",
                filter: g.filter,
                border: "1px solid rgba(0,0,0,0.1)",
                cursor: "pointer",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 4,
                fontFamily: styles.mono,
                fontSize: 9,
                color: "#fff",
                letterSpacing: "0.1em",
                textShadow: "0 1px 3px rgba(0,0,0,0.6)",
              }}
            >
              {g.label}
            </div>
          ))}
        </div>
      </div>

      {/* Footer cards */}
      {showFooter && (
        <div
          style={{
            position: "absolute",
            left: 44,
            right: 44,
            bottom: 24,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 14,
          }}
        >
          <FooterCard icon="◐" kicker="About" title="A confused human, from Taipei" />
          <FooterCard
            icon="▤"
            kicker="Work"
            title="Engineering at Meta, research at Google"
          />
          <FooterCard
            icon="✦"
            kicker="Now"
            title="Building marginalia, walking NYC blocks"
          />
        </div>
      )}
    </div>
  );
}

function PortraitImage({
  caption,
  style,
}: {
  caption: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url(/esther-portrait.png)",
        backgroundSize: "cover",
        backgroundPosition: "15% center",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding: 28,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: styles.mono,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.9)",
          background: "rgba(0,0,0,0.35)",
          padding: "6px 10px",
          backdropFilter: "blur(6px)",
        }}
      >
        {caption}
      </div>
    </div>
  );
}

function FooterCard({
  icon,
  kicker,
  title,
}: {
  icon: string;
  kicker: string;
  title: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.55)",
        border: "1px solid rgba(28,24,20,0.08)",
        backdropFilter: "blur(10px)",
        padding: "16px 22px",
        display: "grid",
        gridTemplateColumns: "34px 1fr 24px",
        gap: 14,
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1px solid #1c1814",
          display: "grid",
          placeItems: "center",
          fontSize: 14,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: styles.mono,
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#6b6256",
            marginBottom: 4,
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            fontFamily: styles.serif,
            fontSize: 19,
            lineHeight: 1.1,
            fontWeight: 500,
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ fontSize: 16, color: "#1c1814" }}>→</div>
    </div>
  );
}
