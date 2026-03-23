import { hospitals } from "@/data/hospitals";
import { notFound } from "next/navigation";

// Import individual hospital page components
import RTCPage from "@/components/hospitals/rtc-x-roads/RTCPage";
import MiyapurPage from "@/components/hospitals/miyapur/MiyapuPage";
import LBNagarPage from "@/components/hospitals/lbnagar/LBNagarPage";
import VijayaPage from "@/components/hospitals/vijayawada/VijayaPage";
import EcilPage from "@/components/hospitals/ecil/EcilPage";
import KompallyPage from "@/components/hospitals/kompally/KompallyPage";
import RajahmundryPage from "@/components/hospitals/rajahmundry/RajahmundryPage";
import LakdikapulPage from "@/components/hospitals/lakdikapul/LadikapulPage";
import PeerzadigudaPage from "@/components/hospitals/peerazadiguda/PeerzadigudaPage";

const hospitalPages: Record<string, React.ComponentType<{ hospital: any }>> = {
  "rtc-x-roads":  RTCPage,
  "miyapur":      MiyapurPage,
  "lb-nagar":     LBNagarPage,
  "vijayawada":   VijayaPage,
  "ecil":         EcilPage,
  "kompally":     KompallyPage,
  "rajahmundry":  RajahmundryPage,
  "lakdikapul":   LakdikapulPage,
  "peerzadiguda": PeerzadigudaPage,
};

export default async function HospitalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hospital = hospitals.find((h) => h.slug === slug);
  if (!hospital) return notFound();
  const Component = hospitalPages[slug];
  if (!Component) return notFound();
  return (
    <>
      {/* 
        Responsive wrapper injected at the route level so all individual
        hospital sub-pages inherit mobile-safe base styles.
        Each sub-component (RTCPage, MiyapurPage, etc.) retains its own
        design completely unchanged — we only add overflow protection and
        a few mobile breakpoints here that propagate via CSS cascade.
      */}
      <style>{`
        /* ── Global mobile safety for all hospital sub-pages ── */
        *, *::before, *::after { box-sizing: border-box; }

        /* Prevent any element from blowing out the viewport */
        html, body { overflow-x: hidden; max-width: 100vw; }
        img { max-width: 100%; height: auto; }

        /* ── Common grid patterns used across hospital sub-pages ── */

        /* 2-col hero → 1-col on mobile */
        @media (max-width: 767px) {
          /* Hero grids */
          [class*="hero-grid"],
          [style*="grid-template-columns: 1fr 1fr"],
          [style*="gridTemplateColumns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }

          /* Wide padding → compact */
          [style*="padding: 80px"],
          [style*="padding: 100px"],
          [style*="padding: 90px"] {
            padding-left: 5vw !important;
            padding-right: 5vw !important;
          }

          /* Stats bars: wrap */
          [style*="grid-template-columns: repeat(4"],
          [style*="gridTemplateColumns: 'repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          /* 3-col grids → 1-col */
          [style*="grid-template-columns: repeat(3"],
          [style*="gridTemplateColumns: 'repeat(3"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 479px) {
          [style*="grid-template-columns: repeat(3"],
          [style*="gridTemplateColumns: 'repeat(3"] {
            grid-template-columns: 1fr !important;
          }

          [style*="grid-template-columns: repeat(2"],
          [style*="gridTemplateColumns: 'repeat(2"] {
            grid-template-columns: 1fr !important;
          }

          /* Section headings */
          h1 { font-size: clamp(28px, 8vw, 48px) !important; }
          h2 { font-size: clamp(22px, 6vw, 36px) !important; }
        }
      `}</style>
      <Component hospital={hospital} />
    </>
  );
}