"use client";

import { CSSProperties, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  style?: CSSProperties;
};

/**
 * <video> with two layered loading aids:
 *  - `poster` paints the first frame immediately
 *  - A shimmering skeleton sits on top until the video's first frame is
 *    ready (loadeddata), then fades out
 *
 * `preload="metadata"` keeps the initial fetch tiny — the full bytes only
 * arrive once the browser decides to play.
 */
export function VideoWithSkeleton({ src, poster, style }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <video
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setLoaded(true)}
        onCanPlay={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          ...style,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: loaded ? 0 : 1,
          transition: "opacity 320ms ease",
          pointerEvents: "none",
          backgroundColor: "#1f1a14",
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)",
          backgroundSize: "200% 100%",
          animation: "vws-shimmer 1.4s linear infinite",
        }}
      />
      <style>{`
        @keyframes vws-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
