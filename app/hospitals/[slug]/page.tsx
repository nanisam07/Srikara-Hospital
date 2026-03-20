import { hospitals } from "@/data/hospitals";
import { notFound } from "next/navigation";

// Import designs
import RTCPage from "@/components/hospitals/rtc-x-roads/RTCPage";
import MiyapurPage from "@/components/hospitals/miyapur/MiyapuPage";
import LBNagarPage from "@/components/hospitals/lbnagar/LBNagarPage";
import VijayaPage from "@/components/hospitals/vijayawada/VijayaPage";
import EcilPage from "@/components/hospitals/ecil/EcilPage";
import KompallyPage from "@/components/hospitals/kompally/KompallyPage";
// Mapping

const hospitalPages: any = {
  "rtc-x-roads": RTCPage,
    "miyapur": MiyapurPage,
    "lb-nagar": LBNagarPage,
    "vijayawada": VijayaPage,
    "ecil": EcilPage,
    "kompally": KompallyPage,
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
  return <Component hospital={hospital} />;
}