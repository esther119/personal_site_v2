import { MuseumHero } from "@/components/MuseumHero";
import { Seam, WorkStrip } from "@/components/WorkStrip";

export default function HomePage() {
  return (
    <main style={{ background: "#efe9dd" }}>
      <MuseumHero showFooter={false} heroHeight={900} />
      <Seam />
      <WorkStrip />
    </main>
  );
}
