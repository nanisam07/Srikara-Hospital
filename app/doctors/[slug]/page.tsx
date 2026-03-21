import { doctors } from "@/data/doctors";
import { notFound } from "next/navigation";


export default function DoctorPage({ params }: any) {
  const doctor = doctors.find((d) => d.slug === params.slug);

  if (!doctor) return notFound();

  return (
    <div>
      <h1>{doctor.name}</h1>
      <p>{doctor.department}</p>
      <p>{doctor.branch}</p>
      <p>{doctor.qualification}</p>
      <p>{doctor.designation}</p>
    </div>
  );
}