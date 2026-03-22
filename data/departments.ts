// data/departments.ts
// Central data file for all Srikara departments
// Slugs match BOTH home page DEPT_FALLBACK and doctors.ts department names

export interface Department {
  name: string;
  tagline: string;
  color: string;
  slug: string;
  img: string;
  procedures: number;
  badge: string;
  heroImg: string;
  heroImg2?: string;
  heroImg3?: string;
  heroVariant: "split" | "mosaic";
  stats: [string, string][];
  procedureList: string[];
  doctors: Doctor[];
  desc: string;
}

export interface Doctor {
  name: string;
  role: string;
  dept: string;
  qual: string;
  exp: string;
  avail: string;
  img: string;
}

export const departments: Department[] = [
  // ── slug: "orthopedic" matches doctors.ts "Orthopedic" & home DEPT_FALLBACK ──
  {
    name: "Orthopedic",
    tagline: "Robotic Joint Replacement Specialists",
    color: "#7c3aed",
    slug: "orthopedic",
    img: "https://images.unsplash.com/photo-1706777193603-76c3e9613553?q=80&w=400&auto=format&fit=crop",
    procedures: 10,
    badge: "No.1 Robotic Knee Replacement · Hyderabad",
    heroImg: "https://images.unsplash.com/photo-1706777193603-76c3e9613553?q=80&w=900&auto=format&fit=crop",
    heroImg2: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80",
    heroVariant: "split",
    stats: [["10+","Ortho Specialists"],["5","Branches"],["Robotic","Mako Surgery"],["FIJR","Certified"]],
    desc: "Srikara Hospitals is Hyderabad's leading centre for Robotic Joint Replacement Surgery. Our orthopedic specialists across all 5 branches deliver knee & hip replacement, arthroscopy, sports injuries and complex trauma care.",
    procedureList: [
      "Robotic Knee Replacement",
      "Total Hip Replacement",
      "Arthroscopic Surgery",
      "Sports Injury Management",
      "Fracture Fixation & Trauma",
      "Ilizarov & Deformity Correction",
      "Spine Surgery",
      "Ligament Reconstruction",
      "Paediatric Orthopaedics",
      "Joint Injections & Pain Management",
    ],
    doctors: [
      { name: "Dr. Akhil Dadi", role: "Robotic Joint Replacement Surgeon", dept: "Orthopedic", qual: "MS (Ortho)", exp: "15+ Years", avail: "Mon–Sat", img: "/Akhildadi.jpg" },
      { name: "Dr. T.V. Suresh", role: "Arthroscopic & Trauma Surgeon", dept: "Orthopedic", qual: "D. Ortho, DNB Ortho", exp: "14+ Years", avail: "Mon–Sat", img: "/doctors/TVSURESH.png" },
      { name: "Dr. Bhanu Pratap P", role: "Robotic Joint Replacement Surgeon", dept: "Orthopedic", qual: "MBBS, MS (Ortho), FIJR", exp: "12+ Years", avail: "Mon–Sat", img: "/Ladikapul/DR.BHANUPRATAPP.png" },
    ],
  },

  // ── slug: "cardiology" matches doctors.ts & home page ──
  {
    name: "Cardiology",
    tagline: "Interventional & Preventive Heart Care",
    color: "#C0145C",
    slug: "cardiology",
    img: "https://images.unsplash.com/photo-1559757296-5c84adc6d116?q=80&w=400&auto=format&fit=crop",
    procedures: 5,
    badge: "Heart Care · Across All 5 Branches",
    heroImg: "https://images.unsplash.com/photo-1559757296-5c84adc6d116?q=80&w=900&auto=format&fit=crop",
    heroImg2: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=80",
    heroVariant: "split",
    stats: [["5","Cardiologists"],["5","Branches"],["24/7","Cardiac Emergency"],["Interventional","Cardiology"]],
    desc: "Our cardiologists at Lakdikapul, Kompally, ECIL, LB Nagar and Peerazdiguda provide comprehensive heart care — interventional cardiology, ECG, echocardiography and preventive cardiac screening.",
    procedureList: [
      "Coronary Angiography & Angioplasty",
      "ECG & Echocardiography",
      "Holter Monitoring",
      "Heart Failure Management",
      "Hypertension Clinic",
      "Lipid & Preventive Cardiology",
      "Pacemaker Evaluation",
      "Cardiac Rehabilitation",
    ],
    doctors: [
      { name: "Dr. Rameshwari", role: "Cardiologist", dept: "Cardiology", qual: "MBBS, MD, DM", exp: "12+ Years", avail: "Mon–Sat", img: "/Ladikapul/DR.RAMESHWARI.png" },
      { name: "Dr. Khushal Sharnagat", role: "Interventional Cardiologist", dept: "Cardiology", qual: "MD, DNB (Cardiology)", exp: "10+ Years", avail: "Mon–Sat", img: "/doctors/DR.KUSHAL.png" },
      { name: "Dr. Sachin Bhatkar", role: "Interventional Cardiologist", dept: "Cardiology", qual: "MD, DrNB (Cardiology)", exp: "10+ Years", avail: "Mon–Sat", img: "/Peeriziguda/DR.SACHIN.png" },
    ],
  },

  // ── slug: "neurology" matches doctors.ts & home page ──
  {
    name: "Neurology",
    tagline: "Stroke, Epilepsy & Neuro Rehabilitation",
    color: "#185FA5",
    slug: "neurology",
    img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=70",
    procedures: 6,
    badge: "Brain & Neuro Care · 5 Branches",
    heroImg: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=900&q=85",
    heroImg2: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80",
    heroVariant: "split",
    stats: [["6","Neurologists"],["Stroke","Management"],["Epilepsy","Clinic"],["Neuro","Rehabilitation"]],
    desc: "Our neurology team across all Srikara branches specialises in stroke management, epilepsy care, migraine treatment, movement disorders and neuro rehabilitation.",
    procedureList: [
      "Stroke Management & IV Thrombolysis",
      "Epilepsy Monitoring & Management",
      "Migraine & Headache Clinic",
      "Parkinson's Disease Management",
      "Nerve Conduction Studies (NCS/EMG)",
      "Dementia & Memory Clinic",
      "Neuro Rehabilitation",
      "Multiple Sclerosis Management",
    ],
    doctors: [
      { name: "Dr. K. Naresh Babu", role: "Brain & Neuro Surgeon", dept: "Neurology", qual: "DNB, M.Ch (Neuro Surgery)", exp: "12+ Years", avail: "Mon–Sat", img: "/ecil/DR.NARESH.png" },
      { name: "Dr. Sandeep Raja", role: "Neuro & Spine Surgeon", dept: "Neurology", qual: "MS, MCh (Neuro Surgery)", exp: "10+ Years", avail: "Mon–Sat", img: "/doctors/DR.SANDEEP.png" },
    ],
  },

  // ── slug: "neuro-surgery" matches home DEPT_FALLBACK & doctors.ts "Neuro Surgery" ──
  {
    name: "Neuro Surgery",
    tagline: "Advanced Brain & Spine Surgery",
    color: "#2e7d52",
    slug: "neuro-surgery",
    img: "https://images.unsplash.com/photo-1624716346720-6c96dfd07807?q=80&w=400&auto=format&fit=crop",
    procedures: 3,
    badge: "Brain & Spine Surgical Centre",
    heroImg: "https://images.unsplash.com/photo-1624716346720-6c96dfd07807?q=80&w=900&auto=format&fit=crop",
    heroImg2: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80",
    heroVariant: "split",
    stats: [["3","Neurosurgeons"],["Brain","Tumour Surgery"],["Spine","Surgery"],["Minimally","Invasive"]],
    desc: "Srikara's neurosurgeons at Lakdikapul, ECIL and LB Nagar specialise in brain tumour surgery, spinal procedures, minimally invasive neurosurgery and cerebrovascular care.",
    procedureList: [
      "Brain Tumour Surgery",
      "Spinal Surgery & Disc Replacement",
      "Minimally Invasive Neurosurgery",
      "Cerebrovascular Surgery",
      "Hydrocephalus Management",
      "Neuro-Trauma & Head Injury",
      "Peripheral Nerve Surgery",
    ],
    doctors: [
      { name: "Dr. Nikhil Veludandi", role: "Neuro Surgeon", dept: "Neuro Surgery", qual: "MBBS, MS (GS), MCh", exp: "11+ Years", avail: "Mon–Sat", img: "/Ladikapul/DR.NIKHIL.png" },
      { name: "Dr. Kota Ravi Chandra", role: "Brain & Spine Surgeon", dept: "Neuro Surgery", qual: "MBBS, MS, MCh (Neuro Surgery)", exp: "10+ Years", avail: "Mon–Sat", img: "/LBnagar/DR.RAVICHANDER.png" },
    ],
  },

  // ── slug: "general-surgery" matches home DEPT_FALLBACK & doctors.ts "General Surgery" ──
  {
    name: "General Surgery",
    tagline: "Laparoscopic, Laser & GI Surgery",
    color: "#854F0B",
    slug: "general-surgery",
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=400&auto=format&fit=crop",
    procedures: 5,
    badge: "Minimally Invasive · Laparoscopic Surgery",
    heroImg: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=900&auto=format&fit=crop",
    heroImg2: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=600&q=80",
    heroVariant: "split",
    stats: [["5","General Surgeons"],["Laparoscopic","Surgery"],["Hernia","Repair"],["GI","Surgery"]],
    desc: "Our general surgeons across ECIL, Kompally, LB Nagar, Lakdikapul and Peerazdiguda specialise in laparoscopic, laser and GI surgical procedures.",
    procedureList: [
      "Laparoscopic Surgery",
      "Hernia Repair (Open & Laparoscopic)",
      "Appendicectomy",
      "Cholecystectomy (Gallbladder Removal)",
      "Surgical Gastroenterology",
      "Laser Haemorrhoid Surgery",
      "Thyroid & Parathyroid Surgery",
      "Breast Surgery",
    ],
    doctors: [
      { name: "Dr. Hemanth Kumar", role: "Surgical Gastro & Laparoscopic Surgeon", dept: "General Surgery", qual: "MBBS, DNB (GS), FMAS, FIAGES", exp: "10+ Years", avail: "Mon–Sat", img: "/LBnagar/DR.HEMANTH.png" },
      { name: "Dr. M. Anurag", role: "General, Laser & Laparoscopic Surgeon", dept: "General Surgery", qual: "MS (GS), FMAS, FIAGES, FISCP", exp: "12+ Years", avail: "Mon–Sat", img: "/ecil/DR.ANURAG.png" },
    ],
  },

  // ── slug: "general-physician" matches home DEPT_FALLBACK & doctors.ts "General Physician" ──
  {
    name: "General Physician",
    tagline: "Diabetes, Hypertension & Internal Medicine",
    color: "#0a6e6e",
    slug: "general-physician",
    img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=400&auto=format&fit=crop",
    procedures: 7,
    badge: "Internal Medicine · All 5 Branches",
    heroImg: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=900&auto=format&fit=crop",
    heroImg2: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1b98?w=600&q=80",
    heroVariant: "split",
    stats: [["7","General Physicians"],["Diabetes","Management"],["Hypertension","Clinic"],["Critical","Care"]],
    desc: "Our general physicians and internal medicine specialists across all 5 Srikara branches provide comprehensive care for diabetes, hypertension, fever, infections and complex systemic conditions.",
    procedureList: [
      "Diabetes Management & Education",
      "Hypertension Clinic",
      "Fever & Infection Management",
      "Chronic Disease Management",
      "Executive Health Check-ups",
      "Internal Medicine Consultation",
      "Critical Care & ICU Medicine",
      "Drug Allergy Management",
    ],
    doctors: [
      { name: "Dr. Sharat Chandra Reddy", role: "General Physician & Diabetologist", dept: "General Physician", qual: "MBBS, DNB", exp: "10+ Years", avail: "Mon–Sat", img: "/doctors/DR.SHARATHCHANDRA.png" },
      { name: "Dr. Mohan Rao", role: "General Physician & Diabetologist", dept: "General Physician", qual: "MD (Internal Medicine)", exp: "12+ Years", avail: "Mon–Sat", img: "/ecil/DR.MURALI MOHAN.png" },
      { name: "Dr. Raghu Prasad", role: "General Physician & Diabetologist", dept: "General Physician", qual: "DNB (General Medicine)", exp: "10+ Years", avail: "Mon–Sat", img: "/Peeriziguda/DR.RAGHUPRASAD.png" },
    ],
  },

  // ── slug: "nephrology" ──
  {
    name: "Nephrology",
    tagline: "Kidney Disease & Dialysis Care",
    color: "#6b4ea8",
    slug: "nephrology",
    img: "https://images.unsplash.com/photo-1650897492524-bbc1adb72626?w=400&auto=format&fit=crop&q=60",
    procedures: 3,
    badge: "Kidney Care · Dialysis · Transplant Evaluation",
    heroImg: "https://images.unsplash.com/photo-1650897492524-bbc1adb72626?w=900&auto=format&fit=crop",
    heroImg2: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
    heroVariant: "split",
    stats: [["3","Nephrologists"],["Dialysis","Centre"],["CKD","Clinic"],["Transplant","Evaluation"]],
    desc: "Srikara's nephrology specialists at Lakdikapul, LB Nagar and Peerazdiguda provide comprehensive kidney care — from CKD management and dialysis to transplant evaluation.",
    procedureList: [
      "Chronic Kidney Disease Management",
      "Haemodialysis",
      "Peritoneal Dialysis",
      "Kidney Transplant Evaluation",
      "Renal Biopsy",
      "AKI Management",
      "Diabetic Nephropathy",
      "Hypertensive Nephropathy",
    ],
    doctors: [
      { name: "Dr. Vaishnavi P", role: "Nephrologist", dept: "Nephrology", qual: "MBBS, MD, FACP, FASN (USA)", exp: "13+ Years", avail: "Mon–Sat", img: "/Ladikapul/DR.VAISHNAVI.png" },
      { name: "Dr. G. Roja Sree", role: "Nephrologist", dept: "Nephrology", qual: "MD, DrNB (Nephrology)", exp: "8+ Years", avail: "Mon–Sat", img: "/Peeriziguda/DR.GRojaSree.jpeg" },
    ],
  },

  // ── slug: "urology" ──
  {
    name: "Urology",
    tagline: "Kidney Stones, Prostate & Andrology",
    color: "#1270A0",
    slug: "urology",
    img: "https://api.neohospital.com/uploads/categories/image-1716788528326-837446693-Urology.jpg",
    procedures: 5,
    badge: "Laser Urology · Andrology Specialists",
    heroImg: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=900&q=85",
    heroImg2: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80",
    heroVariant: "split",
    stats: [["5","Urologists"],["Laser","Stone Surgery"],["Prostate","Care"],["Andrology","Clinic"]],
    desc: "Srikara's urology specialists across all 5 branches handle kidney stones, prostate disease, bladder conditions and andrological disorders with advanced laser procedures.",
    procedureList: [
      "Laser Kidney Stone Surgery",
      "TURP for Enlarged Prostate",
      "Ureteroscopy (URS)",
      "Laparoscopic Nephrectomy",
      "Bladder Cancer Surgery",
      "Urinary Incontinence Treatment",
      "Andrology & Male Infertility",
      "Reconstructive Urology",
    ],
    doctors: [
      { name: "Dr. Harsha Vardhan", role: "Urologist", dept: "Urology", qual: "MBBS, DNB, MCh (Urology)", exp: "10+ Years", avail: "Mon–Sat", img: "/Ladikapul/DR.HARSHAVARDHAN.png" },
      { name: "Dr. Shridhar Reddy", role: "Urologist", dept: "Urology", qual: "MS, MCh (Urology)", exp: "10+ Years", avail: "Mon–Sat", img: "/doctors/DR.SREEDHAR.png" },
    ],
  },

  // ── slug: "plastic-surgery" ──
  {
    name: "Plastic Surgery",
    tagline: "Reconstructive, Aesthetic & Burn Care",
    color: "#8e44ad",
    slug: "plastic-surgery",
    img: "https://images.unsplash.com/photo-1614859324967-bdf413c35191?q=80&w=400&auto=format&fit=crop",
    procedures: 4,
    badge: "Reconstructive & Aesthetic Surgery",
    heroImg: "https://images.unsplash.com/photo-1614859324967-bdf413c35191?q=80&w=900&auto=format&fit=crop",
    heroVariant: "split",
    stats: [["4","Plastic Surgeons"],["Reconstructive","Surgery"],["Aesthetic","Procedures"],["Burn","Care"]],
    desc: "Our plastic surgeons across Kompally, ECIL, LB Nagar, Lakdikapul and Peerazdiguda specialise in reconstructive, aesthetic and burn care surgery.",
    procedureList: [
      "Reconstructive Surgery",
      "Aesthetic Surgery",
      "Burn Care & Skin Grafting",
      "Scar Revision",
      "Hand Surgery",
      "Cleft Lip & Palate",
      "Breast Reconstruction",
      "Liposuction & Body Contouring",
    ],
    doctors: [
      { name: "Dr. Suman Babu", role: "Plastic Reconstructive & Aesthetic Surgeon", dept: "Plastic Surgery", qual: "MS, MCh (Plastic Surgery)", exp: "14+ Years", avail: "Mon–Sat", img: "/doctors/DR.SUMANBABU.png" },
      { name: "Dr. Vineel Kolloju", role: "Plastic Reconstructive & Aesthetic Surgeon", dept: "Plastic Surgery", qual: "MS, M.Ch (Plastic Surgery)", exp: "10+ Years", avail: "Mon–Sat", img: "/ecil/DR.VENEEL.png" },
    ],
  },

  // ── slug: "physiotherapy" ──
  {
    name: "Physiotherapy",
    tagline: "Sports Rehab & Post-Surgical Recovery",
    color: "#2e7d52",
    slug: "physiotherapy",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&auto=format&fit=crop",
    procedures: 9,
    badge: "Rehabilitation & Recovery Centre",
    heroImg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=900&auto=format&fit=crop",
    heroImg2: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
    heroVariant: "split",
    stats: [["9","Physiotherapists"],["Sports","Rehab"],["Post-Op","Recovery"],["Stroke","Rehab"]],
    desc: "Srikara's physiotherapy team across all 5 branches provides post-surgical rehabilitation, sports injury recovery, stroke rehab and pain management.",
    procedureList: [
      "Post-Orthopaedic Surgery Rehab",
      "Post-Stroke Neuro Rehabilitation",
      "Sports Injury Physiotherapy",
      "Electrotherapy & Ultrasound",
      "Manual Therapy",
      "Cardiac Rehabilitation",
      "Paediatric Physiotherapy",
      "Pain Management",
      "Occupational Therapy",
    ],
    doctors: [
      { name: "Dr. Ramesh Tekula", role: "Physiotherapist", dept: "Physiotherapy", qual: "MPT (Ortho), MIAP", exp: "10+ Years", avail: "Mon–Sat", img: "/doctors/DR.RAMESH.png" },
      { name: "Dr. Junaid", role: "Physiotherapist", dept: "Physiotherapy", qual: "BPT, DAC, MIAP", exp: "8+ Years", avail: "Mon–Sat", img: "/Ladikapul/DR.JUNAID.png" },
    ],
  },

  // ── slug: "gynaecology" ──
  {
    name: "Gynaecology",
    tagline: "Women's Health & Maternity Care",
    color: "#b05090",
    slug: "gynaecology",
    img: "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=400&auto=format&fit=crop",
    procedures: 1,
    badge: "Women's Health · LB Nagar",
    heroImg: "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=900&auto=format&fit=crop",
    heroVariant: "split",
    stats: [["Gynaecology","Specialist"],["Laparoscopic","Gynaecology"],["PCOS","Management"],["High Risk","Pregnancy"]],
    desc: "Dr. Pranathi at Srikara LB Nagar provides comprehensive women's health care including gynaecological surgery, PCOS management and high-risk pregnancy care.",
    procedureList: [
      "Laparoscopic Gynaecological Surgery",
      "PCOS Management",
      "Hysteroscopy",
      "Endometriosis Treatment",
      "High-Risk Pregnancy Care",
      "Menstrual Disorder Management",
      "Colposcopy",
      "Fibroid Management",
    ],
    doctors: [
      { name: "Dr. Pranathi", role: "Gynaecologist", dept: "Gynaecology", qual: "MBBS, DGO", exp: "8+ Years", avail: "Mon–Sat", img: "" },
    ],
  },

  // ── slug: "anesthesia" ──
  {
    name: "Anesthesia",
    tagline: "Critical Care & Pain Management",
    color: "#555",
    slug: "anesthesia",
    img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=400&auto=format&fit=crop",
    procedures: 7,
    badge: "Anaesthesia · Critical Care · ICU",
    heroImg: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=900&auto=format&fit=crop",
    heroVariant: "split",
    stats: [["7","Anaesthesiologists"],["Critical","Care"],["Pain","Management"],["ICU","Support"]],
    desc: "Srikara's anaesthesiology team across all branches provides safe perioperative care, critical care management and pain management services.",
    procedureList: [
      "General Anaesthesia",
      "Regional & Spinal Anaesthesia",
      "ICU & Critical Care Management",
      "Pain Management Clinic",
      "Epidural Analgesia",
      "Paediatric Anaesthesia",
      "Obstetric Anaesthesia",
    ],
    doctors: [
      { name: "Dr. Rahul", role: "Critical Care Specialist", dept: "Anesthesia", qual: "MD (Anesthesia & Critical Care)", exp: "8+ Years", avail: "Mon–Sat", img: "" },
      { name: "Dr. Naga Chaitanya", role: "Anesthesiologist", dept: "Anesthesia", qual: "MBBS, DNB (IDCCM), MBA", exp: "8+ Years", avail: "Mon–Sat", img: "" },
    ],
  },

  // ── slug: "pediatrics" ──
  {
    name: "Pediatrics",
    tagline: "Specialist Child Health & Newborn Care",
    color: "#e07020",
    slug: "pediatrics",
    img: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=400&auto=format&fit=crop",
    procedures: 2,
    badge: "Child Health · Paediatrics",
    heroImg: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=900&auto=format&fit=crop",
    heroVariant: "split",
    stats: [["2","Paediatricians"],["Child","Health"],["Vaccinations","Clinic"],["Growth","Monitoring"]],
    desc: "Our paediatricians at Lakdikapul and LB Nagar provide comprehensive child health care — from routine vaccinations and growth monitoring to management of paediatric illnesses.",
    procedureList: [
      "Child Health & Development Check",
      "Vaccination Programme",
      "Neonatal Care",
      "Paediatric Emergency",
      "Respiratory Illness Management",
      "Nutritional Counselling",
      "Fever & Infection Management",
    ],
    doctors: [
      { name: "Dr. Jaipal", role: "Pediatrician", dept: "Pediatrics", qual: "MBBS (Pediatrics)", exp: "8+ Years", avail: "Mon–Sat", img: "" },
      { name: "Dr. Vinay Kumar", role: "Pediatrician", dept: "Pediatrics", qual: "Pediatrics", exp: "8+ Years", avail: "Mon–Sat", img: "" },
    ],
  },

  // ── slug: "ent" ──
  {
    name: "ENT",
    tagline: "Ear, Nose & Throat Surgery",
    color: "#16a085",
    slug: "ent",
    img: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=400&auto=format&fit=crop",
    procedures: 2,
    badge: "Ear · Nose · Throat · Head & Neck",
    heroImg: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=900&auto=format&fit=crop",
    heroVariant: "split",
    stats: [["2","ENT Surgeons"],["Endoscopic","Surgery"],["Head & Neck","Procedures"],["Paeds","ENT"]],
    desc: "Srikara's ENT specialists at Lakdikapul and LB Nagar handle ear, nose, throat and head & neck conditions with advanced endoscopic procedures.",
    procedureList: [
      "Endoscopic Sinus Surgery",
      "Tympanoplasty",
      "Adenotonsillectomy",
      "Septoplasty",
      "Microlaryngoscopy",
      "Head & Neck Surgery",
      "Paediatric ENT",
    ],
    doctors: [
      { name: "Dr. Nalinikanth", role: "ENT Surgeon", dept: "ENT", qual: "DLO", exp: "8+ Years", avail: "Mon–Sat", img: "" },
      { name: "Dr. Raghu Kumar", role: "ENT Specialist", dept: "ENT", qual: "MBBS, MS", exp: "8+ Years", avail: "Mon–Sat", img: "" },
    ],
  },

  // ── slug: "dermatology" ──
  {
    name: "Dermatology",
    tagline: "Skin, Hair & Cosmetic Dermatology",
    color: "#e67e22",
    slug: "dermatology",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
    procedures: 1,
    badge: "Skin & Hair · LB Nagar",
    heroImg: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=900&auto=format&fit=crop",
    heroVariant: "split",
    stats: [["Skin","Specialist"],["Cosmetic","Dermatology"],["Hair","Treatment"],["Allergy","Testing"]],
    desc: "Dr. Pardhusardhi at Srikara LB Nagar provides expert dermatological care for skin disorders, hair conditions and cosmetic dermatology.",
    procedureList: [
      "Medical Dermatology",
      "Acne & Scar Treatment",
      "Psoriasis & Eczema Management",
      "Hair Loss Treatment",
      "Cosmetic Procedures",
      "Allergy Testing",
      "Vitiligo Management",
    ],
    doctors: [
      { name: "Dr. Pardhusardhi", role: "Dermatologist", dept: "Dermatology", qual: "MBBS, MS", exp: "8+ Years", avail: "Mon–Sat", img: "" },
    ],
  },

  // ── slug: "dental" ──
  {
    name: "Dental",
    tagline: "Maxillofacial & Oral Surgery",
    color: "#1abc9c",
    slug: "dental",
    img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=400&auto=format&fit=crop",
    procedures: 1,
    badge: "Oral Surgery · LB Nagar",
    heroImg: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=900&auto=format&fit=crop",
    heroVariant: "split",
    stats: [["Maxillofacial","Surgeon"],["Oral","Surgery"],["Dental","Implants"],["Cosmetic","Dentistry"]],
    desc: "Dr. Harinath Reddy at Srikara LB Nagar specialises in maxillofacial and oral surgery — from dental implants and wisdom tooth extraction to complex jaw surgeries.",
    procedureList: [
      "Maxillofacial Surgery",
      "Dental Implants",
      "Wisdom Tooth Extraction",
      "Root Canal Treatment",
      "Oral Cancer Screening",
      "Jaw Surgery",
      "Cosmetic Dentistry",
    ],
    doctors: [
      { name: "Dr. Harinath Reddy", role: "Dentist & Maxillofacial Surgeon", dept: "Dental", qual: "Maxillofacial Surgery", exp: "8+ Years", avail: "Mon–Sat", img: "" },
    ],
  },

  // ── slug: "psychiatry" ──
  {
    name: "Psychiatry",
    tagline: "Mental Health & Psychotherapy Care",
    color: "#8e44ad",
    slug: "psychiatry",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    procedures: 1,
    badge: "Mental Health · LB Nagar",
    heroImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop",
    heroVariant: "split",
    stats: [["Psychiatrist","Specialist"],["CBT","Therapy"],["Anxiety &","Depression"],["Mental","Wellness"]],
    desc: "Dr. Saradhi Goud at Srikara LB Nagar provides compassionate, evidence-based mental health care for depression, anxiety, stress disorders and psychiatric conditions.",
    procedureList: [
      "Depression & Anxiety Treatment",
      "Psychotherapy & CBT",
      "Stress Management",
      "Schizophrenia Management",
      "Addiction Medicine",
      "Sleep Disorder Management",
      "Child & Adolescent Psychiatry",
    ],
    doctors: [
      { name: "Dr. Saradhi Goud", role: "Psychiatrist", dept: "Psychiatry", qual: "MBBS, MS (Psychiatry)", exp: "8+ Years", avail: "Mon–Sat", img: "" },
    ],
  },

  // ── slug: "radiology" ──
  {
    name: "Radiology",
    tagline: "CT, MRI, X-Ray & Ultrasound Diagnostics",
    color: "#2c3e50",
    slug: "radiology",
    img: "https://images.unsplash.com/photo-1516069677018-378515003435?q=80&w=400&auto=format&fit=crop",
    procedures: 2,
    badge: "Imaging & Diagnostics",
    heroImg: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&q=85",
    heroVariant: "split",
    stats: [["2","Radiologists"],["CT & MRI","Imaging"],["X-Ray","Digital"],["Ultrasound","Doppler"]],
    desc: "Srikara's radiology team at LB Nagar and Peerazdiguda provides comprehensive imaging diagnostics — CT, MRI, X-ray, ultrasound and colour Doppler studies.",
    procedureList: [
      "CT Scan",
      "MRI Imaging",
      "Digital X-Ray",
      "Ultrasound & Doppler",
      "Mammography",
      "DEXA Bone Scan",
      "Fluoroscopy Studies",
    ],
    doctors: [
      { name: "Dr. Ganesh", role: "Radiologist", dept: "Radiology", qual: "MBBS (Radiology)", exp: "8+ Years", avail: "Mon–Sat", img: "" },
      { name: "Dr. Ravi Raja", role: "Radiologist", dept: "Radiology", qual: "", exp: "8+ Years", avail: "Mon–Sat", img: "" },
    ],
  },

  // ── slug: "pathology" ──
  {
    name: "Pathology",
    tagline: "Lab Diagnostics & Histopathology",
    color: "#7f8c8d",
    slug: "pathology",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop",
    procedures: 1,
    badge: "Laboratory Diagnostics · Lakdikapul",
    heroImg: "https://images.unsplash.com/photo-1578496780896-7282d7a5e27e?w=900&q=85",
    heroVariant: "split",
    stats: [["Pathologist","Specialist"],["Histopathology","Lab"],["Clinical","Pathology"],["Microbiology","Testing"]],
    desc: "Dr. Irshad at Srikara Lakdikapul provides accurate laboratory diagnostics — from routine haematology and biochemistry to histopathology and microbiology.",
    procedureList: [
      "Haematology",
      "Clinical Biochemistry",
      "Histopathology",
      "Cytopathology",
      "Microbiology & Culture",
      "Hormone & Thyroid Profile",
      "Immunology Testing",
    ],
    doctors: [
      { name: "Dr. Irshad", role: "Pathologist", dept: "Pathology", qual: "MBBS, MD (Osmania)", exp: "8+ Years", avail: "Mon–Sat", img: "" },
    ],
  },

  // ── slug: "pulmonology" ──
  {
    name: "Pulmonology",
    tagline: "Asthma, COPD & Lung Disease",
    color: "#3060a0",
    slug: "pulmonology",
    img: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&q=80",
    procedures: 1,
    badge: "Lung & Respiratory · Lakdikapul",
    heroImg: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=85",
    heroVariant: "split",
    stats: [["Pulmonologist","Specialist"],["Asthma","Clinic"],["COPD","Management"],["Sleep","Disorders"]],
    desc: "Dr. Rajashekar at Srikara Lakdikapul specialises in pulmonology — treating asthma, COPD, lung infections, sleep disorders and other respiratory conditions.",
    procedureList: [
      "Asthma Management",
      "COPD Treatment",
      "Lung Infection Management",
      "Sleep Apnoea Evaluation",
      "Pulmonary Function Testing",
      "Bronchoscopy",
      "Respiratory Rehabilitation",
    ],
    doctors: [
      { name: "Dr. Rajashekar", role: "Pulmonologist", dept: "Pulmonology", qual: "Pulmonology", exp: "8+ Years", avail: "Mon–Sat", img: "" },
    ],
  },

  // ── slug: "critical-care" ──
  {
    name: "Critical Care",
    tagline: "24/7 ICU & Life Support",
    color: "#c0392b",
    slug: "critical-care",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=400&auto=format&fit=crop",
    procedures: 2,
    badge: "ICU · Critical Care · 24/7",
    heroImg: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=900&auto=format&fit=crop",
    heroVariant: "split",
    stats: [["2","Critical Care Specialists"],["24/7","ICU Support"],["Ventilator","Care"],["Sepsis","Protocol"]],
    desc: "Srikara's critical care specialists at LB Nagar provide 24/7 ICU management, ventilator support and intensive monitoring for critically ill patients.",
    procedureList: [
      "ICU Management",
      "Ventilator Support",
      "Sepsis Protocol",
      "Multi-Organ Failure Management",
      "Haemodynamic Monitoring",
      "Post-Operative Critical Care",
      "Trauma Critical Care",
    ],
    doctors: [
      { name: "Dr. Vinod", role: "Anaesthesia & Critical Care Specialist", dept: "Critical Care", qual: "MBBS, MD (Anaesthesia), Fellowship Liver Transplant", exp: "10+ Years", avail: "Mon–Sat", img: "" },
    ],
  },
];

export function getDepartmentBySlug(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug);
}