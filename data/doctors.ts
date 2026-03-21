export interface Doctor {
  slug: string;
  id: string;
  name: string;
  branch: string;
  department: string;
  qualification: string;
  designation: string;
  dateOfBirth?: string;
  photoAvailable?: boolean;
  image?: string;

}

export const doctors: Doctor[] = [

  // ─── Kompally Branch ───────────────────────────────────────────────────────

  // Orthopedic
  {
    id: "komp-003",
    name: "Dr. Akhil Dadi",
    slug:"akhil-dadi",
    branch: "Kompally",
    department: "Orthopedics",
    qualification: "MS (Ortho)",
    designation: "Robotic Joint Replacement Surgeon",
    image: "/Akhildadi.jpg",
  },
  {
    id: "komp-001",
    name: "Dr. T.V. Suresh",
    slug:"tv-suresh",
    branch: "Kompally",
    department: "Orthopedics",
    qualification: "D. Ortho, DNB Ortho",
    designation: "Robotic Joint Replacement, Arthroscopic & Trauma Surgeon",
    image: "/doctors/TVSURESH.png",
  },
  {
    id: "komp-002",
    name: "Dr. Kiran Kumar",
    slug:"kiran-kumar",
    branch: "Kompally",
    department: "orthopaedics",
    qualification: "MS (Ortho)",
    designation: "Robotic Joint Replacement, Arthroscopic & Trauma Surgeon",
    image: "/doctors/DR.KIRAN.png",
  },

  // Cardiology
  {
    id: "komp-004",
    name: "Dr. Khushal Sharnagat",
    slug:"khushal-sharnagat",
    branch: "Kompally",
    department: "Cardiology",
    qualification: "MD, DNB (Cardiology)",
    designation: "Interventional Cardiologist",
    image: "/doctors/DR.KUSHAL.png",
  },

  // General Physician
  {
    id: "komp-005",
    name: "Dr. Sharat Chandra Reddy",
    slug:"Sharat-Chandra-Reddy",
    branch: "Kompally",
    department: "General Physician",
    qualification: "MBBS, DNB",
    designation: "General Physician & Diabetologist",
    image: "/doctors/DR.SHARATHCHANDRA.png",
  },

  // Neurology
  {
    id: "komp-006",
    name: "Dr. Sandeep Raja",
    slug:"Sanddep-Raja",
    branch: "Kompally",
    department: "Neurology",
    qualification: "MS, MCh (Neuro Surgery)",
    designation: "Neuro & Spine Surgery",
    image: "/doctors/DR.SANDEEP.png",
  },

  // General Surgery
  {
    id: "komp-007",
    name: "Dr. Nagaraju",
    branch: "Kompally",
    department: "General Surgery",
    qualification: "MS (GS)",
    designation: "General, Laser & Laparoscopic Surgeon",
    image: "/doctors/DR.NAGARAJU.png",
    slug:"nagaraju",
  },

  // Urology
  {
    id: "komp-008",
    name: "Dr. Shridhar Reddy",
    slug:"shridhar-reddy",
    branch: "Kompally",
    department: "Urology",
    qualification: "MS, MCh (Urology)",
    designation: "Urologist",
    image: "/doctors/DR.SREEDHAR.png",
  },

  // Physiotherapy
  {
    id: "komp-009",
    name: "Dr. Ramesh Tekula",
    slug:"ramesh-tekula",
    branch: "Kompally",
    department: "Physiotherapy",
    qualification: "MPT (Ortho), MIAP",
    designation: "Physiotherapist",
    image: "/doctors/DR.RAMESH.png",
  },

  // Plastic Surgery
  {
    id: "komp-010",
    name: "Dr. Suman Babu",
    slug:"suman-babu",
    branch: "Kompally",
    department: "Plastic Surgery",
    qualification: "MS, MCh (Plastic Surgery)",
    designation: "Plastic Reconstructive & Aesthetic Surgeon",
    image: "/doctors/DR.SUMANBABU.png",
  },

  // Anesthesia
  {
    id: "komp-011",
    name: "Dr. Shilpa",
    slug:"Shilpa",
    branch: "Kompally",
    department: "Anesthesia",
    qualification: "",
    designation: "Anesthesiologist",
  },
  // ─── ECIL X Roads Branch ───────────────────────────────────────────────────

  // Orthopedic
  {
    id: "ecil-001",
    name: "Dr. N. Pranay Kumar",
    slug:"pranay-kumar",
    branch: "ECIL",
    department: "Orthopedic",
    qualification: "DNB Ortho, FIJR",
    designation: "Robotic Joint Replacement, Arthroscopic & Trauma Surgeon",
    image: "/ecil/PRANAY.png",
  },
  {
    id: "ecil-002",
    name: "Dr. Shiva Kumar Kotra",
    slug:"siva-kumar-kotra",
    branch: "ECIL",
    department: "Orthopedic",
    qualification: "MBBS, DNB Ortho, FIJR",
    designation: "Robotic Joint Replacement, Arthroscopic & Trauma Surgeon",
    image: "/ecil/dr.shivakumar kotra.jpg",
  },
  {
    id: "ecil-003",
    name: "Dr. Peddi Sai Kiran",
    slug:"peddi-sai-kiran",
    branch: "ECIL",
    department: "Orthopedic",
    qualification: "MBBS, D. Ortho, FIJR",
    designation: "Robotic Joint Replacement, Arthroscopic & Trauma Surgeon",
    image: "/ecil/DR.PEDDI SAI KIRAN.jpeg",
  },

  // Cardiology
  {
    id: "ecil-004",
    name: "Dr. Venkatesh Kumar",
    slug:"venkatesh-kumar",
    branch: "ECIL",
    department: "Cardiology",
    qualification: "MD, DM (Cardiology)",
    designation: "Interventional Cardiologist",
    image: "/ecil/DR.VENKATESH.png",
  },

  // General Physician
  {
    id: "ecil-005",
    name: "Dr. Mohan Rao",
    slug:"mohan-rao",
    branch: "ECIL",
    department: "General Physician",
    qualification: "MD (Internal Medicine)",
    designation: "General Physician & Diabetologist",
    image: "/ecil/DR.MURALI MOHAN.png",
  },
  {
    id: "ecil-006",
    name: "Dr. Geetanjali Puvvada",
    slug:"geetanjali-puvvada",
    branch: "ECIL",
    department: "General Physician",
    qualification: "MD (General Medicine)",
    designation: "General Physician & Diabetologist",
    image: "/ecil/DR.GEETHANJALI.png",
  },
  {
    id: "ecil-007",
    name: "Dr. Kamalesh Lokhande",
    slug:"kamalesh-lokhande",
    branch: "ECIL",
    department: "General Physician",
    qualification: "DA, DNB",
    designation: "Critical Care",
    image: "/ecil/DR.KAMALESH.png",
  },

  // Neurology
  {
    id: "ecil-008",
    name: "Dr. K. Naresh Babu",
    slug:"naresh-babu",
    branch: "ECIL",
    department: "Neurology",
    qualification: "DNB, M.Ch (Neuro Surgery)",
    designation: "Brain & Neuro Surgeon",
    image: "/ecil/DR.NARESH.png",
  },
  {
    id: "ecil-009",
    name: "Dr. Sandeep",
    slug:"sandeep",
    branch: "ECIL",
    department: "Neurology",
    qualification: "MD, DM (Neurology)",
    designation: "Neuro Physician",
    image: "/ecil/DR.SANDEEP.png",
  },

  // General Surgery
  {
    id: "ecil-010",
    name: "Dr. M. Anurag",
    slug:"m-anurag",
    branch: "ECIL",
    department: "General Surgery",
    qualification: "MS (GS), FMAS, FIAGES, FISCP, FALS (H)",
    designation: "General, Laser & Laparoscopic Surgeon",
    image: "/ecil/DR.ANURAG.png",
  },

  // Physiotherapy
  {
    id: "ecil-011",
    name: "Dr. P. Raghunath",
    slug:"raghunath",
    branch: "ECIL",
    department: "Physiotherapy",
    qualification: "MPT (Sports), MIAP",
    designation: "Physiotherapist",
    image: "/ecil/DR.RAGHUNATH.png",
  },

  // Urology
  {
    id: "ecil-012",
    name: "Dr. Vinayak Ingalalli",
    slug:"vinayak-ingalalli",
    branch: "ECIL",
    department: "Urology",
    qualification: "MBBS, MS, MCh",
    designation: "Urologist",
  },

  // Plastic Surgery
  {
    id: "ecil-013",
    name: "Dr. Vineel Kolloju",
    slug:"vineel-kolloju",
    branch: "ECIL",
    department: "Plastic Surgery",
    qualification: "MS, M.Ch (Plastic Surgery)",
    designation: "Plastic Reconstructive & Aesthetic Surgeon",
    image: "/ecil/DR.VENEEL.png",
  },

  

  // ─── L.B. Nagar Branch ─────────────────────────────────────────────────────

  // Orthopedic
  {
    id: "lbn-001",
    name: "Dr. Bharath Reddy Katta",
    slug:"bharath-reddy-katta",
    branch: "L.B. Nagar",
    department: "Orthopedic",
    qualification: "MS (Ortho), FIJR",
    designation: "Robotic Joint Replacement, Arthroscopic & Trauma Surgeon",
    image: "/LBnagar/DR.BHARATH.png",
  },
  {
    id: "lbn-002",
    name: "Dr. Sameer Hanu Maharshi",
    branch: "L.B. Nagar",
    slug:"sameer-hanu-maharshi",
    department: "Orthopedic",
    qualification: "MS (Ortho), FIJR",
    designation: "Robotic Joint Replacement, Arthroscopic & Trauma Surgeon",
    image: "/LBnagar/DR.SAMEER HANU.png",
  },
  {
    id: "lbn-003",
    name: "Dr. Akhil Dadi",
    slug:"akhil-dadi",
    branch: "L.B. Nagar",
    department: "Orthopedic",
    qualification: "MS (Ortho)",
    designation: "Robotic Joint Replacement Surgeon",
    image: "/Akhildadi.jpg",
  },

  // Cardiology
  {
    id: "lbn-004",
    name: "Dr. Rajashekar",
    slug:"rajashekar",
    branch: "L.B. Nagar",
    department: "Cardiology",
    qualification: "MBBS, Diploma (Cardiology)",
    designation: "Clinical Cardiologist",
    image: "/LBnagar/DR.SRAJASHEKAR.png",
  },

  // General Physician
  {
    id: "lbn-005",
    name: "Dr. Karunakar",
    slug:"karunakar",
    branch: "L.B. Nagar",
    department: "General Physician",
    qualification: "MBBS, MD",
    designation: "General Physician & Diabetologist & Critical Care",
    image: "/LBnagar/DR.KARUNAKAR.png",
  },

  // Gynaecology
  {
    id: "lbn-006",
    name: "Dr. Pranathi",
    slug:"pranathi",
    branch: "L.B. Nagar",
    department: "Gynaecology",
    qualification: "MBBS, DGO",
    designation: "Gynaecologist",
    
  },

  // Neuro Surgery
  {
    id: "lbn-007",
    name: "Dr. Kota Ravi Chandra",
    slug:"ravi-chandra",
    branch: "L.B. Nagar",
    department: "Neuro Surgery",
    qualification: "MBBS, MS, MCh (Neuro Surgery)",
    designation: "Brain & Spine Surgeon",
    image: "/LBnagar/DR.RAVICHANDER.png",
  },

  // General Surgery
  {
    id: "lbn-008",
    name: "Dr. Hemanth Kumar",
    slug:"hemanth-kumar",
    branch: "L.B. Nagar",
    department: "General Surgery",
    qualification: "MBBS, DNB (GS), FMAS, FIAGES, FISCP, FALS – HERNIA",
    designation: "Surgical Gastro & Laparoscopic Surgeon",
    image: "/LBnagar/DR.HEMANTH.png",
  },

  // Urology
  {
    id: "lbn-009",
    name: "Dr. Srikanth",
    slug:"srikanth",
    branch: "L.B. Nagar",
    department: "Urology",
    qualification: "MBBS, DNB, DrNB (Urology)",
    designation: "Urologist & Andrologist",
    
  },

  // Physiotherapy
  {
    id: "lbn-010",
    name: "Dr. Mallikarjun",
    slug:"mallikarjun",
    branch: "L.B. Nagar",
    department: "Physiotherapy",
    qualification: "BPT, MIAP",
    designation: "Physiotherapist",
  },
  {
    id: "lbn-011",
    name: "Dr. Suresh Kumar",
    slug:"suresh-kumar",
    branch: "L.B. Nagar",
    department: "Physiotherapy",
    qualification: "BPT, MIAP",
    designation: "Physiotherapist",
  },
  {
    id: "lbn-012",
    name: "Dr. Srinivas",
    slug:"srinivas",   
    branch: "L.B. Nagar",
    department: "Physiotherapy",
    qualification: "BPT, MIAP",
    designation: "Physiotherapist",
  },
  {
    id: "lbn-013",
    name: "Dr. Sai Kiran",
    slug:"sai-kiran",
    branch: "L.B. Nagar",
    department: "Physiotherapy",
    qualification: "BPT, MIAP",
    designation: "Physiotherapist",
  },

  // Plastic Surgery
  {
    id: "lbn-014",
    name: "Dr. Raj Kiran",
    slug:"raj-kiran",
    branch: "L.B. Nagar",
    department: "Plastic Surgery",
    qualification: "MS (General Surgery), M.Ch (Plastic Surgery)",
    designation: "Plastic Reconstructive & Aesthetic Surgeon",
  },

  // Critical Care
  {
    id: "lbn-015",
    name: "Dr. Vinod",
    slug:"vinod",
    branch: "L.B. Nagar",
    department: "Critical Care",
    qualification: "MBBS, MD (Anaesthesia), Fellowship in Liver Transplant Anaesthesia",
    designation: "Anaesthesia and Critical Care Specialist",
  },

  // Pediatrics
  {
    id: "lbn-016",
    name: "Dr. Jaipal",
    slug:"jaipal",
    branch: "L.B. Nagar",
    department: "Pediatrics",
    qualification: "MBBS (Pediatrics)",
    designation: "Pediatrician",
  },

  // ENT
  {
    id: "lbn-017",
    name: "Dr. Raghu Kumar",
    slug:"raghu-kumar",
    branch: "L.B. Nagar",
    department: "ENT",
    qualification: "MBBS, MS",
    designation: "ENT Specialist",
  },

  // Dermatology
  {
    id: "lbn-018",
    name: "Dr. Pardhusardhi",
    slug:"oardhusardhi",
    branch: "L.B. Nagar",
    department: "Dermatology",
    qualification: "MBBS, MS",
    designation: "Dermatologist",
  },

  // Nephrology
  {
    id: "lbn-019",
    name: "Dr. Pavan",
    slug:"pavan",
    branch: "L.B. Nagar",
    department: "Nephrology",
    qualification: "MBBS",
    designation: "Nephrologist",
  },

  // Dental
  {
    id: "lbn-020",
    name: "Dr. Harinath Reddy",
    slug:"harinath-reddy",
    branch: "L.B. Nagar",
    department: "Dental",
    qualification: "Maxillofacial Surgery",
    designation: "Dentist",
  },

  // Psychiatry
  {
    id: "lbn-021",
    name: "Dr. Saradhi Goud",
    slug:"saradhi-goud",
    branch: "L.B. Nagar",
    department: "Psychiatry",
    qualification: "MBBS, MS (Psychiatry)",
    designation: "Psychiatrist",
  },

  // Radiology
  {
    id: "lbn-022",
    name: "Dr. Ganesh",
    slug:"ganesh",
    branch: "L.B. Nagar",
    department: "Radiology",
    qualification: "MBBS (Radiology)",
    designation: "Radiologist",
  },

  // ─── Lakdikapul Branch ─────────────────────────────────────────────────────

  // Orthopedic
  {
    id: "lakdi-001",
    name: "Dr. Bhanu Pratap P",
    slug:"bhanu-pratap-p",
    branch: "Lakdikapul",
    department: "Orthopedics",
    qualification: "MBBS, MS (Ortho) – Gold Medalist, FIJR, FIAS, FILRDC",
    designation: "Consultant Robotic Joint Replacement, Arthroscopic, Ilizarov & Complex Trauma Surgeon",
    photoAvailable: true,
    image: "/Ladikapul/DR.BHANUPRATAPP.png",
  },
  {
    id: "lakdi-002",
    name: "Dr. Shashank",
    slug:"shashank",
    branch: "Lakdikapul",
    department: "Orthopedics",
    qualification: "Ortho",
    designation: "Orthopedic Surgeon",
    photoAvailable: true,
    image:"/Ladikapul/DR.SHASHANK.jpeg"
  },

  // Cardiology
  {
    id: "lakdi-003",
    name: "Dr. Rameshwari",
    slug:"rameshwari",
    branch: "Lakdikapul",
    department: "Cardiology",
    qualification: "MBBS, MD, DM",
    designation: "Cardiologist",
    photoAvailable: true,
    image:"/Ladikapul/DR.RAMESHWARI.png"
  },

  // Nephrology
  {
    id: "lakdi-004",
    name: "Dr. Vaishnavi P",
    slug:"vaishnavi-p",
    branch: "Lakdikapul",
    department: "Nephrology",
    qualification: "MBBS, MD, FACP, FASN (USA)",
    designation: "Nephrologist",
    photoAvailable: true,
    image:"/Ladikapul/DR.VAISHNAVI.png"
  },

  // Neuro Surgery
  {
    id: "lakdi-005",
    name: "Dr. Nikhil Veludandi",
    slug:"nikhil-veludandi",
    branch: "Lakdikapul",
    department: "Neuro Surgery",
    qualification: "MBBS, MS (GS), MCh",
    designation: "Neuro Surgeon",
    photoAvailable: true,
    image:"/Ladikapul/DR.NIKHIL.png"
  },

  // Neurology
  {
    id: "lakdi-006",
    name: "Dr. Sushmita",
    slug:"sushmita",
    branch: "Lakdikapul",
    department: "Neurology",
    qualification: "MBBS, MD (GM, NIMS)",
    designation: "Neuro Physician",
  },
  {
    id: "lakdi-007",
    name: "Dr. Gopi Srikanth",
    slug:"gopi-srikanth",
    branch: "Lakdikapul",
    department: "Neurology",
    qualification: "MD (General Medicine), DM (Neurology)",
    designation: "Neuro Physician",
  },

  // General Surgery
  {
    id: "lakdi-008",
    name: "Dr. Sreedhar Reddy",
    slug:"srredhar-reddy",
    branch: "Lakdikapul",
    department: "General Surgery",
    qualification: "MBBS, DNB, FMAS",
    designation: "General Surgeon",
    photoAvailable: true,
    image:"/Ladikapul/DR.SREEDHARREDDY.png"
  },

  // General Medicine
  {
    id: "lakdi-009",
    name: "Dr. Ganesh G",
    slug:"ganesh-g",
    branch: "Lakdikapul",
    department: "General Medicine",
    qualification: "MBBS, DNB",
    designation: "General Physician",
    photoAvailable: true,
    image:"/Ladikapul/DR.GANESH.png"
  },

  // Urology
  {
    id: "lakdi-010",
    name: "Dr. Harsha Vardhan",
    slug:"harsha-vardhan",
    branch: "Lakdikapul",
    department: "Urology",
    qualification: "MBBS, DNB, MCh (Urology)",
    designation: "Urologist",
    photoAvailable: true,
    image:"/Ladikapul/DR.HARSHAVARDHAN.png"
  },

  // Pathology
  {
    id: "lakdi-011",
    name: "Dr. Irshad",
    slug:"irshad",
    branch: "Lakdikapul",
    department: "Pathology",
    qualification: "MBBS, MD (Osmania)",
    designation: "Pathologist",
  },

  // Pediatrics
  {
    id: "lakdi-012",
    name: "Dr. Vinay Kumar",
    slug:"vinay-kumar",
    branch: "Lakdikapul",
    department: "Pediatrics",
    qualification: "Pediatrics",
    designation: "Pediatrician",
  },

  // Pulmonology
  {
    id: "lakdi-013",
    name: "Dr. Rajashekar",
    slug:"rajashekar",
    branch: "Lakdikapul",
    department: "Pulmonology",
    qualification: "Pulmonology",
    designation: "Pulmonologist",
  },

  // Plastic Surgery
  {
    id: "lakdi-014",
    name: "Dr. Saka Laxman",
    slug:"saka-laxman",
    branch: "Lakdikapul",
    department: "Plastic Surgery",
    qualification: "Plastic Surgery",
    designation: "Plastic Surgeon",
  },

  // ENT
  {
    id: "lakdi-015",
    name: "Dr. Nalinikanth",
    slug:"nalinikanth",
    branch: "Lakdikapul",
    department: "ENT",
    qualification: "DLO",
    designation: "ENT Surgeon",
  },

  // Physiotherapy
  {
    id: "lakdi-016",
    name: "Dr. Junaid",
    slug:"junaid",
    branch: "Lakdikapul",
    department: "Physiotherapy",
    qualification: "BPT, DAC, MIAP",
    designation: "Physiotherapist",
    photoAvailable: true,
    image:"/Ladikapul/DR.JUNAID.png"
  },

  // Anesthesia
  {
    id: "lakdi-017",
    name: "Dr. Sri Sabya Karanam",
    slug:"sri-sabya-karanam",
    branch: "Lakdikapul",
    department: "Anesthesia",
    qualification: "Anesthesia",
    designation: "Anesthesiologist",
    photoAvailable: true,
  },
  {
    id: "lakdi-018",
    name: "Dr. Naga Chaitanya",
    slug:"naga-chaitanya",
    branch: "Lakdikapul",
    department: "Anesthesia",
    qualification: "MBBS, DNB (IDCCM), MBA",
    designation: "Anesthesiologist",
  },
  {
    id: "lakdi-019",
    name: "Dr. Dale Rego",
    slug:"dale-rego",
    branch: "Lakdikapul",
    department: "Anesthesia",
    qualification: "Anesthesia and Critical Care",
    designation: "Anesthesiologist",
    photoAvailable: true,
  },

  // ─── Peerazdiguda Branch ───────────────────────────────────────────────────

  // Orthopedic
  {
    id: "peer-001",
    name: "Dr. Karunakar Reddy",
    slug:"karunakar-reddy",
    branch: "Peerazdiguda",
    department: "Orthopedic",
    qualification: "D. Ortho, DNB Ortho, MNAMS, FIJR",
    designation: "Robotic Joint Replacement, Arthroscopic & Trauma Surgeon",
    dateOfBirth: "2nd July",
    image:"/Peeriziguda/DR.KARUNAKAR.png"
  },
  {
    id: "peer-002",
    name: "Dr. Eshwar Patel",
    slug:"eshwar-patel",
    branch: "Peerazdiguda",
    department: "Orthopedic",
    qualification: "MS (Ortho), FIJR",
    designation: "Robotic Joint Replacement, Arthroscopic & Trauma Surgeon",
    dateOfBirth: "23rd October",
    image:"/Peeriziguda/DR.ESHWARPATEL.png"
  },

  // Cardiology
  {
    id: "peer-003",
    name: "Dr. Sachin Bhatkar",
    slug:"sachin-bhatkar",
    branch: "Peerazdiguda",
    department: "Cardiology",
    qualification: "MD, DrNB (Cardiology)",
    designation: "Interventional Cardiologist",
    dateOfBirth: "9th September",
    image:"/Peeriziguda/DR.SACHIN.png"
  },

  // General Physician
  {
    id: "peer-004",
    name: "Dr. Raghu Prasad",
    slug:"raghu-prasad",
    branch: "Peerazdiguda",
    department: "General Physician",
    qualification: "DNB (General Medicine, Manipal)",
    designation: "General Physician & Diabetologist",
    dateOfBirth: "4th April",
    image:"/Peeriziguda/DR.RAGHUPRASAD.png"
  },

  // Neurology
  {
    id: "peer-005",
    name: "Dr. D. Nagendra Babu",
    slug:"nagendra-babu",
    branch: "Peerazdiguda",
    department: "Neurology",
    qualification: "MS, MCh (Neuro Surgery)",
    designation: "Neuro & Spine Surgery",
    dateOfBirth: "31st July",
    image:"/Peeriziguda/DR.NAGENDRA BABU.png"
  },

  // General Surgery
  {
    id: "peer-006",
    name: "Dr. Naveen Kumar",
    slug:"naveen-kumar",
    branch: "Peerazdiguda",
    department: "General Surgery",
    qualification: "DNB (General Surgery)",
    designation: "General, Laser & Laparoscopic Surgeon",
    dateOfBirth: "25th August",
    image:"/Peeriziguda/DR.NAVEEN KUMAR.png"
  },

  // Anesthesia
  {
    id: "peer-007",
    name: "Dr. Rahul",
    slug:"rahul",
    branch: "Peerazdiguda",
    department: "Anesthesia",
    qualification: "MD (Anesthesia & Critical Care)",
    designation: "Critical Care Specialist",
    dateOfBirth: "31st August",
    
  },
  {
    id: "peer-008",
    name: "Dr. Ch. Kishan",
    slug:"ch-kishan",
    branch: "Peerazdiguda",
    department: "Anesthesia",
    qualification: "MD (Anesthesia & Critical Care)",
    designation: "Critical Care Specialist",
    dateOfBirth: "25th December",
  },
  {
    id: "peer-009",
    name: "Dr. Harsha",
    slug:"harsha",
    branch: "Peerazdiguda",
    department: "Anesthesia",
    qualification: "MD (Anesthesia & Critical Care)",
    designation: "Critical Care Specialist",
    dateOfBirth: "4th September",
  },

  // Physiotherapy
  {
    id: "peer-010",
    name: "Dr. Praveen Kumar",
    slug:"praveen-kumar",
    branch: "Peerazdiguda",
    department: "Physiotherapy",
    qualification: "BPT, MPT (Ortho)",
    designation: "Physiotherapist",
    dateOfBirth: "20th May",
    image:"/Peeriziguda/DR.PRAVEEN.png"
  },

  // Urology
  {
    id: "peer-011",
    name: "Dr. Vinayak Ingalalli",
    slug:"vinayak-ingalalli",
    branch: "Peerazdiguda",
    department: "Urology",
    qualification: "MS, MCh",
    designation: "Urologist",
    dateOfBirth: "15th September",
  },

  // Nephrology
  {
    id: "peer-012",
    name: "Dr. G. Roja Sree",
    slug:"roja-sree",
    branch: "Peerazdiguda",
    department: "Nephrology",
    qualification: "MD, DrNB (Nephrology)",
    designation: "Nephrologist",
    dateOfBirth: "9th June",
    image:"/Peeriziguda/DR.GRojaSree.jpeg"
  },

  // Plastic Surgery
  {
    id: "peer-013",
    name: "Dr. Vineel Kolloju",
    slug:"vineel-kolloju",
    branch: "Peerazdiguda",
    department: "Plastic Surgery",
    qualification: "MS, M.Ch (Plastic Surgery)",
    designation: "Plastic Reconstructive & Aesthetic Surgeon",
    dateOfBirth: "28th August",
  },

  // Radiology
  {
    id: "peer-014",
    name: "Dr. Ravi Raja",
    slug:"ravi-raja",
    branch: "Peerazdiguda",
    department: "Radiology",
    qualification: "",
    designation: "Radiologist",
    dateOfBirth: "6th October",
  },
];

// ─── Utility helpers ────────────────────────────────────────────────────────

export const branches = [
  "ECIL",
  "Kompally",
  "L.B. Nagar",
  "Lakdikapul",
  "Peerazdiguda",
] as const;

export const doctorsWithSlug = doctors.map((d) => ({
  ...d,
  slug: d.name
    .toLowerCase()
    .replace("dr.", "")
    .trim()
    .replace(/\s+/g, "-"),
}));
export const getDoctorBySlug = (slug: string) =>
  doctorsWithSlug.find((d) => d.slug === slug);

export type Branch = (typeof branches)[number];

export const getDoctorsByBranch = (branch: Branch): Doctor[] =>
  doctors.filter((d) => d.branch === branch);

export const getDoctorsByDepartment = (department: string): Doctor[] =>
  doctors.filter(
    (d) => d.department.toLowerCase() === department.toLowerCase()
  );

export const getDoctorById = (id: string): Doctor | undefined =>
  doctors.find((d) => d.id === id);


function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")   // remove special chars
    .trim()
    .replace(/\s+/g, "-");           // spaces → hyphens
}
 
// Doctors enriched with a slug field (used in department pages & routing)
