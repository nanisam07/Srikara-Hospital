"use client";

import { useState, useMemo } from "react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const BRANCHES = [
  { id: "all",          label: "All Branches" },
  { id: "rtc-x-roads",  label: "RTC X Roads" },
  { id: "miyapur",      label: "Miyapur" },
  { id: "kompally",     label: "Kompally" },
  { id: "vijayawada",   label: "Vijayawada" },
  { id: "lb-nagar",     label: "LB Nagar" },
  { id: "ecil",         label: "ECIL" },
  { id: "lakdikapul",   label: "Lakdikapul" },
  { id: "rajahmundry",  label: "Rajahmundry" },
  { id: "peerzadiguda", label: "Peerzadiguda" },
];

const SPECIALTIES = [
  "All Specialties",
  "Cardiology",
  "Orthopedics",
  "Dermatology",
  "Neurology",
  "Gynecology",
  "Pediatrics",
  "General Medicine",
  "Ophthalmology",
];

const TIME_SLOTS = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM",
  "11:00 AM","11:30 AM","2:00 PM","2:30 PM",
  "3:00 PM","3:30 PM","4:00 PM","4:30 PM",
];

interface Doctor {
  id: number;
  name: string;
  initials: string;
  color: string;
  specialty: string;
  qualifications: string;
  available: boolean;
  nextSlot: string;
  rating: number;
  reviews: number;
  experience: string;
  patients: string;
  fee: string;
  branch: string;
  branchId: string;
  languages: string[];
  about: string;
  specializations: { label: string; bg: string; iconColor: string; icon: string }[];
  education: { degree: string; institute: string; year: string }[];
  workExp: { role: string; org: string; period: string; code: string }[];
  patientReviews: { name: string; stars: number; text: string; date: string }[];
  branches: { name: string; address: string }[];
}

const DOCTORS: Doctor[] = [
  {
    id: 1, name: "Dr. Priya Reddy", initials: "PR", color: "#0a6e6e",
    specialty: "Senior Cardiologist", qualifications: "MBBS, MD, DM (Cardiology), FESC",
    available: true, nextSlot: "Today, 11:00 AM", rating: 4.9, reviews: 312,
    experience: "14 yrs", patients: "4,800+", fee: "₹600",
    branch: "RTC X Roads", branchId: "rtc-x-roads",
    languages: ["Telugu", "Hindi", "English"],
    about: "Dr. Priya Reddy is a senior interventional cardiologist with 14 years of experience. She has performed over 2,000 successful cardiac interventions and specialises in preventive cardiology and ECG diagnostics.",
    specializations: [
      { label: "Interventional Cardiology", bg: "#e6f4f4", iconColor: "#0a6e6e", icon: "heart" },
      { label: "ECG & Echocardiography",    bg: "#eaf3de", iconColor: "#3B6D11", icon: "wave" },
      { label: "Preventive Cardiology",     bg: "#e6f1fb", iconColor: "#185FA5", icon: "shield" },
      { label: "Hypertension Care",         bg: "#faeeda", iconColor: "#854F0B", icon: "drop" },
    ],
    education: [
      { degree: "DM – Cardiology",        institute: "AIIMS Delhi",               year: "2013" },
      { degree: "MD – Internal Medicine", institute: "Osmania Medical College",    year: "2010" },
      { degree: "MBBS",                   institute: "Gandhi Medical College, Hyd", year: "2007" },
    ],
    workExp: [
      { role: "Senior Cardiologist",     org: "MedCare Clinics – RTC X Roads", period: "2018 – Present", code: "MC" },
      { role: "Consultant Cardiologist", org: "Yashoda Hospitals, Hyderabad",   period: "2014 – 2018",   code: "YH" },
    ],
    patientReviews: [
      { name: "Ramaiah K.", stars: 5, text: "Excellent doctor. Diagnosed my condition in one visit. Very patient and thorough.", date: "2 days ago" },
      { name: "Sunitha M.", stars: 5, text: "Very empathetic and knowledgeable. Highly recommended.", date: "1 week ago" },
    ],
    branches: [
      { name: "RTC X Roads", address: "Road No. 12, Banjara Hills, Hyderabad" },
      { name: "Miyapur",     address: "Miyapur Main Rd, Near Metro Station" },
    ],
  },
  {
    id: 2, name: "Dr. Arun Kumar", initials: "AK", color: "#1a7a9a",
    specialty: "Orthopedic Surgeon", qualifications: "MBBS, MS (Ortho), DNB",
    available: true, nextSlot: "Today, 2:30 PM", rating: 4.8, reviews: 278,
    experience: "11 yrs", patients: "3,200+", fee: "₹500",
    branch: "Miyapur", branchId: "miyapur",
    languages: ["Telugu", "English"],
    about: "Dr. Arun Kumar is an orthopedic surgeon specialising in joint replacement and sports injuries. He has successfully treated over 1,500 knee and hip replacement surgeries.",
    specializations: [
      { label: "Joint Replacement",  bg: "#e6f1fb", iconColor: "#185FA5", icon: "bone" },
      { label: "Sports Injuries",    bg: "#eaf3de", iconColor: "#3B6D11", icon: "run" },
      { label: "Spine Care",         bg: "#e6f4f4", iconColor: "#0a6e6e", icon: "spine" },
      { label: "Arthroscopy",        bg: "#faeeda", iconColor: "#854F0B", icon: "eye" },
    ],
    education: [
      { degree: "MS – Orthopaedics", institute: "Nizam's Institute of Medical Sciences", year: "2014" },
      { degree: "MBBS",              institute: "Kakatiya Medical College",              year: "2011" },
    ],
    workExp: [
      { role: "Orthopedic Surgeon",   org: "MedCare Clinics – Miyapur",   period: "2017 – Present", code: "MC" },
      { role: "Senior Registrar",     org: "Apollo Hospitals, Hyderabad", period: "2014 – 2017",   code: "AH" },
    ],
    patientReviews: [
      { name: "Raju P.", stars: 5, text: "Dr. Arun fixed my knee problem. Back to playing cricket!", date: "3 days ago" },
      { name: "Lalitha S.", stars: 4, text: "Good doctor, clear explanation of the surgery plan.", date: "2 weeks ago" },
    ],
    branches: [
      { name: "Miyapur",  address: "Miyapur Main Rd, Near Metro Station" },
      { name: "Kompally", address: "NH-44, Kompally, Hyderabad" },
    ],
  },
  {
    id: 3, name: "Dr. Sunita Sharma", initials: "SS", color: "#6b4ea8",
    specialty: "Dermatologist", qualifications: "MBBS, MD (Dermatology)",
    available: false, nextSlot: "Tomorrow, 10:00 AM", rating: 4.7, reviews: 195,
    experience: "9 yrs", patients: "2,900+", fee: "₹450",
    branch: "Kompally", branchId: "kompally",
    languages: ["Telugu", "Hindi", "English"],
    about: "Dr. Sunita Sharma is an expert dermatologist known for treating complex skin conditions and cosmetic dermatology. She specialises in acne, psoriasis, and laser treatments.",
    specializations: [
      { label: "Acne Treatment",        bg: "#eeedfe", iconColor: "#534AB7", icon: "skin" },
      { label: "Laser Therapy",         bg: "#faeeda", iconColor: "#854F0B", icon: "laser" },
      { label: "Cosmetic Dermatology",  bg: "#fbeaf0", iconColor: "#993556", icon: "star" },
      { label: "Psoriasis Care",        bg: "#e6f4f4", iconColor: "#0a6e6e", icon: "shield" },
    ],
    education: [
      { degree: "MD – Dermatology", institute: "JIPMER, Puducherry",    year: "2016" },
      { degree: "MBBS",             institute: "Osmania Medical College", year: "2013" },
    ],
    workExp: [
      { role: "Dermatologist",       org: "MedCare Clinics – Kompally", period: "2019 – Present", code: "MC" },
      { role: "Junior Consultant",   org: "KIMS Hospitals, Hyderabad",  period: "2016 – 2019",   code: "KI" },
    ],
    patientReviews: [
      { name: "Padma R.", stars: 5, text: "My skin improved drastically after 3 sessions. Highly recommend!", date: "1 week ago" },
      { name: "Vikram N.", stars: 4, text: "Professional and knowledgeable. Waiting time was a bit long.", date: "3 weeks ago" },
    ],
    branches: [
      { name: "Kompally",    address: "NH-44, Kompally, Hyderabad" },
      { name: "ECIL",        address: "ECIL X Roads, Hyderabad" },
    ],
  },
  {
    id: 4, name: "Dr. Venkat Rao", initials: "VR", color: "#2e7d52",
    specialty: "Neurologist", qualifications: "MBBS, MD, DM (Neurology)",
    available: true, nextSlot: "Today, 4:00 PM", rating: 4.9, reviews: 421,
    experience: "16 yrs", patients: "5,100+", fee: "₹700",
    branch: "Vijayawada", branchId: "vijayawada",
    languages: ["Telugu", "English"],
    about: "Dr. Venkat Rao is a highly respected neurologist with 16 years of clinical experience. He specialises in stroke management, epilepsy, and neurodegenerative disorders.",
    specializations: [
      { label: "Stroke Management",     bg: "#eaf3de", iconColor: "#3B6D11", icon: "brain" },
      { label: "Epilepsy Care",         bg: "#e6f4f4", iconColor: "#0a6e6e", icon: "wave" },
      { label: "Parkinson's Disease",   bg: "#faeeda", iconColor: "#854F0B", icon: "drop" },
      { label: "Migraine Treatment",    bg: "#e6f1fb", iconColor: "#185FA5", icon: "heart" },
    ],
    education: [
      { degree: "DM – Neurology",       institute: "NIMHANS, Bengaluru",     year: "2011" },
      { degree: "MD – General Medicine",institute: "Andhra Medical College",  year: "2008" },
      { degree: "MBBS",                 institute: "Guntur Medical College",  year: "2005" },
    ],
    workExp: [
      { role: "Senior Neurologist",  org: "MedCare Clinics – Vijayawada", period: "2016 – Present", code: "MC" },
      { role: "Consultant",          org: "Ramesh Hospitals, Vijayawada", period: "2011 – 2016",   code: "RH" },
    ],
    patientReviews: [
      { name: "Chandra M.", stars: 5, text: "Best neurologist in Vijayawada. Helped my father recover from stroke.", date: "4 days ago" },
      { name: "Anand T.",   stars: 5, text: "Very detailed examination and treatment plan.", date: "1 week ago" },
    ],
    branches: [
      { name: "Vijayawada",  address: "MG Road, Labbipet, Vijayawada" },
      { name: "Rajahmundry", address: "Main Road, Rajahmundry" },
    ],
  },
  {
    id: 5, name: "Dr. Kavitha Nair", initials: "KN", color: "#c0574d",
    specialty: "Gynecologist & Obstetrician", qualifications: "MBBS, MS (OBG)",
    available: true, nextSlot: "Today, 3:00 PM", rating: 4.8, reviews: 356,
    experience: "13 yrs", patients: "4,200+", fee: "₹550",
    branch: "LB Nagar", branchId: "lb-nagar",
    languages: ["Telugu", "Malayalam", "English"],
    about: "Dr. Kavitha Nair is a leading gynecologist and obstetrician with 13 years of experience in high-risk pregnancies, laparoscopic surgeries, and women's health care.",
    specializations: [
      { label: "High-Risk Pregnancy",   bg: "#fbeaf0", iconColor: "#993556", icon: "heart" },
      { label: "Laparoscopy",           bg: "#e6f4f4", iconColor: "#0a6e6e", icon: "shield" },
      { label: "PCOS Management",       bg: "#faeeda", iconColor: "#854F0B", icon: "drop" },
      { label: "Infertility Care",      bg: "#e6f1fb", iconColor: "#185FA5", icon: "star" },
    ],
    education: [
      { degree: "MS – OBG",  institute: "Sri Ramachandra University, Chennai", year: "2014" },
      { degree: "MBBS",      institute: "Government Medical College, Calicut",  year: "2011" },
    ],
    workExp: [
      { role: "Senior Gynecologist",   org: "MedCare Clinics – LB Nagar",   period: "2018 – Present", code: "MC" },
      { role: "Consultant",            org: "Fernandez Hospital, Hyderabad", period: "2014 – 2018",   code: "FH" },
    ],
    patientReviews: [
      { name: "Meena K.", stars: 5, text: "Dr. Kavitha delivered my baby safely. Forever grateful!", date: "1 week ago" },
      { name: "Preethi R.", stars: 5, text: "Very calm and reassuring throughout my pregnancy.", date: "2 weeks ago" },
    ],
    branches: [
      { name: "LB Nagar",    address: "LB Nagar Circle, Hyderabad" },
      { name: "Lakdikapul",  address: "Lakdikapul, Hyderabad" },
    ],
  },
  {
    id: 6, name: "Dr. Ravi Chandra", initials: "RC", color: "#b07d2e",
    specialty: "General Physician", qualifications: "MBBS, MD (General Medicine)",
    available: true, nextSlot: "Today, 12:30 PM", rating: 4.6, reviews: 143,
    experience: "8 yrs", patients: "2,100+", fee: "₹400",
    branch: "ECIL", branchId: "ecil",
    languages: ["Telugu", "Hindi"],
    about: "Dr. Ravi Chandra is a trusted general physician providing comprehensive primary care. He specialises in diabetes management, preventive health and chronic disease care.",
    specializations: [
      { label: "Diabetes Management",  bg: "#faeeda", iconColor: "#854F0B", icon: "drop" },
      { label: "Preventive Health",    bg: "#eaf3de", iconColor: "#3B6D11", icon: "shield" },
      { label: "Fever & Infections",   bg: "#e6f4f4", iconColor: "#0a6e6e", icon: "wave" },
      { label: "Chronic Disease Care", bg: "#e6f1fb", iconColor: "#185FA5", icon: "heart" },
    ],
    education: [
      { degree: "MD – General Medicine", institute: "MNR Medical College, Sangareddy", year: "2017" },
      { degree: "MBBS",                  institute: "Chalmeda Anand Rao Medical College", year: "2014" },
    ],
    workExp: [
      { role: "General Physician",  org: "MedCare Clinics – ECIL",       period: "2019 – Present", code: "MC" },
      { role: "Medical Officer",    org: "Government Hospital, Warangal", period: "2017 – 2019",   code: "GH" },
    ],
    patientReviews: [
      { name: "Suresh B.", stars: 5, text: "Very approachable doctor. My whole family visits him.", date: "5 days ago" },
      { name: "Geeta V.",  stars: 4, text: "Good treatment for my diabetes. Explains things clearly.", date: "2 weeks ago" },
    ],
    branches: [
      { name: "ECIL",     address: "ECIL X Roads, Hyderabad" },
      { name: "Kompally", address: "NH-44, Kompally, Hyderabad" },
    ],
  },
  {
    id: 7, name: "Dr. Anitha Srinivas", initials: "AS", color: "#1d6b9e",
    specialty: "Paediatrician", qualifications: "MBBS, MD (Paediatrics)",
    available: false, nextSlot: "Tomorrow, 9:00 AM", rating: 4.9, reviews: 289,
    experience: "10 yrs", patients: "3,600+", fee: "₹480",
    branch: "Lakdikapul", branchId: "lakdikapul",
    languages: ["Telugu", "English"],
    about: "Dr. Anitha Srinivas is a compassionate paediatrician dedicated to child health. She specialises in neonatal care, childhood vaccinations, and developmental disorders.",
    specializations: [
      { label: "Neonatal Care",         bg: "#e6f1fb", iconColor: "#185FA5", icon: "heart" },
      { label: "Vaccination",           bg: "#eaf3de", iconColor: "#3B6D11", icon: "shield" },
      { label: "Child Nutrition",       bg: "#faeeda", iconColor: "#854F0B", icon: "drop" },
      { label: "Developmental Disorders", bg: "#e6f4f4", iconColor: "#0a6e6e", icon: "brain" },
    ],
    education: [
      { degree: "MD – Paediatrics", institute: "Osmania Medical College",      year: "2016" },
      { degree: "MBBS",             institute: "Gandhi Medical College, Hyd",  year: "2013" },
    ],
    workExp: [
      { role: "Paediatrician",        org: "MedCare Clinics – Lakdikapul", period: "2018 – Present", code: "MC" },
      { role: "Resident Paediatrician", org: "Rainbow Children's Hospital",  period: "2016 – 2018",   code: "RC" },
    ],
    patientReviews: [
      { name: "Deepa M.", stars: 5, text: "My kids love Dr. Anitha. She is so gentle and caring.", date: "3 days ago" },
      { name: "Kiran R.", stars: 5, text: "Best paediatrician in Hyderabad. Very thorough.", date: "1 week ago" },
    ],
    branches: [
      { name: "Lakdikapul", address: "Lakdikapul, Hyderabad" },
      { name: "LB Nagar",   address: "LB Nagar Circle, Hyderabad" },
    ],
  },
  {
    id: 8, name: "Dr. Suresh Babu", initials: "SB", color: "#3d7a6e",
    specialty: "Ophthalmologist", qualifications: "MBBS, MS (Ophthalmology)",
    available: true, nextSlot: "Today, 5:30 PM", rating: 4.7, reviews: 201,
    experience: "12 yrs", patients: "3,000+", fee: "₹520",
    branch: "Rajahmundry", branchId: "rajahmundry",
    languages: ["Telugu", "English"],
    about: "Dr. Suresh Babu is an experienced ophthalmologist specialising in cataract surgery, LASIK, and retinal disorders. He has performed over 3,000 eye surgeries.",
    specializations: [
      { label: "Cataract Surgery", bg: "#e6f4f4", iconColor: "#0a6e6e", icon: "eye" },
      { label: "LASIK Treatment",  bg: "#e6f1fb", iconColor: "#185FA5", icon: "laser" },
      { label: "Retinal Disorders",bg: "#faeeda", iconColor: "#854F0B", icon: "wave" },
      { label: "Glaucoma Care",    bg: "#eaf3de", iconColor: "#3B6D11", icon: "shield" },
    ],
    education: [
      { degree: "MS – Ophthalmology", institute: "LV Prasad Eye Institute, Hyd", year: "2014" },
      { degree: "MBBS",               institute: "Andhra Medical College",        year: "2011" },
    ],
    workExp: [
      { role: "Ophthalmologist",   org: "MedCare Clinics – Rajahmundry", period: "2017 – Present", code: "MC" },
      { role: "Fellow – Retina",   org: "LV Prasad Eye Institute",       period: "2014 – 2017",   code: "LV" },
    ],
    patientReviews: [
      { name: "Nageswara R.", stars: 5, text: "Perfect cataract surgery. Crystal clear vision now!", date: "1 week ago" },
      { name: "Sridevi K.",   stars: 4, text: "Very professional, good post-op care.", date: "3 weeks ago" },
    ],
    branches: [
      { name: "Rajahmundry",  address: "Main Road, Rajahmundry" },
      { name: "Vijayawada",   address: "MG Road, Labbipet, Vijayawada" },
    ],
  },
  {
    id: 9, name: "Dr. Madhavi Latha", initials: "ML", color: "#7a4e6e",
    specialty: "Dermatologist & Cosmetologist", qualifications: "MBBS, DVD, Fellowship Cosmetology",
    available: true, nextSlot: "Today, 1:00 PM", rating: 4.6, reviews: 118,
    experience: "7 yrs", patients: "1,800+", fee: "₹430",
    branch: "Peerzadiguda", branchId: "peerzadiguda",
    languages: ["Telugu", "Hindi", "English"],
    about: "Dr. Madhavi Latha combines clinical dermatology with advanced cosmetology, helping patients achieve healthy skin. She specialises in hair loss treatment, anti-ageing, and skin brightening.",
    specializations: [
      { label: "Hair Loss Treatment", bg: "#fbeaf0", iconColor: "#993556", icon: "hair" },
      { label: "Anti-Ageing",         bg: "#faeeda", iconColor: "#854F0B", icon: "star" },
      { label: "Skin Brightening",    bg: "#eeedfe", iconColor: "#534AB7", icon: "skin" },
      { label: "Chemical Peels",      bg: "#e6f4f4", iconColor: "#0a6e6e", icon: "drop" },
    ],
    education: [
      { degree: "Fellowship – Cosmetology", institute: "Kaya Skin Clinic Institute",    year: "2019" },
      { degree: "DVD",                       institute: "Osmania Medical College",       year: "2018" },
      { degree: "MBBS",                      institute: "MNR Medical College, Sangareddy", year: "2017" },
    ],
    workExp: [
      { role: "Dermatologist & Cosmetologist", org: "MedCare Clinics – Peerzadiguda", period: "2020 – Present", code: "MC" },
      { role: "Resident Doctor",                org: "Kaya Skin Clinic, Hyderabad",    period: "2018 – 2020",   code: "KS" },
    ],
    patientReviews: [
      { name: "Swetha N.", stars: 5, text: "My hair fall reduced significantly. Great doctor!", date: "2 days ago" },
      { name: "Arjun K.",  stars: 4, text: "Good skin treatments. Very hygienic clinic.", date: "2 weeks ago" },
    ],
    branches: [
      { name: "Peerzadiguda", address: "Peerzadiguda X Roads, Hyderabad" },
      { name: "ECIL",         address: "ECIL X Roads, Hyderabad" },
    ],
  },
  {
    id: 10, name: "Dr. Kiran Prasad", initials: "KP", color: "#0a6e6e",
    specialty: "Interventional Cardiologist", qualifications: "MBBS, MD, DM, FESC",
    available: true, nextSlot: "Today, 10:00 AM", rating: 5.0, reviews: 512,
    experience: "18 yrs", patients: "6,000+", fee: "₹750",
    branch: "Miyapur", branchId: "miyapur",
    languages: ["Telugu", "Hindi", "English"],
    about: "Dr. Kiran Prasad is one of Hyderabad's leading interventional cardiologists with 18 years of experience. He is known for complex angioplasties and structural heart disease interventions.",
    specializations: [
      { label: "Angioplasty",           bg: "#e6f4f4", iconColor: "#0a6e6e", icon: "heart" },
      { label: "Structural Heart Care", bg: "#eaf3de", iconColor: "#3B6D11", icon: "shield" },
      { label: "Heart Failure Mgmt",    bg: "#e6f1fb", iconColor: "#185FA5", icon: "wave" },
      { label: "Arrhythmia",            bg: "#faeeda", iconColor: "#854F0B", icon: "drop" },
    ],
    education: [
      { degree: "DM – Cardiology",     institute: "AIIMS New Delhi",          year: "2009" },
      { degree: "MD – Medicine",       institute: "Osmania Medical College",   year: "2006" },
      { degree: "MBBS",                institute: "Gandhi Medical College",    year: "2003" },
    ],
    workExp: [
      { role: "Chief Cardiologist",    org: "MedCare Clinics – Miyapur & RTC", period: "2015 – Present", code: "MC" },
      { role: "Senior Cardiologist",   org: "Apollo Hospitals, Hyderabad",     period: "2009 – 2015",   code: "AH" },
    ],
    patientReviews: [
      { name: "Narasimha R.", stars: 5, text: "Dr. Kiran saved my life. Outstanding doctor.", date: "1 day ago" },
      { name: "Padmaja V.",   stars: 5, text: "The best heart specialist I have ever met.", date: "5 days ago" },
    ],
    branches: [
      { name: "Miyapur",     address: "Miyapur Main Rd, Near Metro Station" },
      { name: "RTC X Roads", address: "Road No. 12, Banjara Hills, Hyderabad" },
    ],
  },
  {
    id: 11, name: "Dr. Padma Kumari", initials: "PK", color: "#c0574d",
    specialty: "Senior Gynecologist", qualifications: "MBBS, MS (OBG), FRCOG",
    available: false, nextSlot: "Tomorrow, 11:00 AM", rating: 4.8, reviews: 374,
    experience: "15 yrs", patients: "4,500+", fee: "₹600",
    branch: "RTC X Roads", branchId: "rtc-x-roads",
    languages: ["Telugu", "English"],
    about: "Dr. Padma Kumari is a senior gynecologist with 15 years of expertise in reproductive medicine, menopause management, and minimally invasive surgery.",
    specializations: [
      { label: "Reproductive Medicine", bg: "#fbeaf0", iconColor: "#993556", icon: "heart" },
      { label: "Menopause Management",  bg: "#faeeda", iconColor: "#854F0B", icon: "drop" },
      { label: "Minimally Invasive",    bg: "#e6f4f4", iconColor: "#0a6e6e", icon: "shield" },
      { label: "Antenatal Care",        bg: "#eaf3de", iconColor: "#3B6D11", icon: "star" },
    ],
    education: [
      { degree: "FRCOG",       institute: "Royal College of Obstetricians, UK", year: "2015" },
      { degree: "MS – OBG",    institute: "NIMS, Hyderabad",                    year: "2012" },
      { degree: "MBBS",        institute: "Osmania Medical College",             year: "2009" },
    ],
    workExp: [
      { role: "Senior Gynecologist", org: "MedCare Clinics – RTC X Roads", period: "2017 – Present", code: "MC" },
      { role: "Consultant",          org: "Care Hospitals, Hyderabad",      period: "2012 – 2017",   code: "CH" },
    ],
    patientReviews: [
      { name: "Anuradha M.", stars: 5, text: "Dr. Padma is wonderful. Excellent care throughout my pregnancy.", date: "1 week ago" },
      { name: "Sravanthi K.", stars: 5, text: "Very experienced and caring doctor.", date: "3 weeks ago" },
    ],
    branches: [
      { name: "RTC X Roads", address: "Road No. 12, Banjara Hills, Hyderabad" },
      { name: "LB Nagar",    address: "LB Nagar Circle, Hyderabad" },
    ],
  },
  {
    id: 12, name: "Dr. Naresh Goud", initials: "NG", color: "#1a7a9a",
    specialty: "Orthopedic & Joint Specialist", qualifications: "MBBS, MS (Ortho), DNB",
    available: true, nextSlot: "Today, 3:30 PM", rating: 4.7, reviews: 162,
    experience: "10 yrs", patients: "2,500+", fee: "₹480",
    branch: "Kompally", branchId: "kompally",
    languages: ["Telugu", "Hindi"],
    about: "Dr. Naresh Goud is an orthopedic specialist focusing on minimally invasive joint procedures, trauma surgery, and complex fracture management.",
    specializations: [
      { label: "Trauma Surgery",     bg: "#e6f1fb", iconColor: "#185FA5", icon: "bone" },
      { label: "Fracture Mgmt",      bg: "#eaf3de", iconColor: "#3B6D11", icon: "shield" },
      { label: "Knee Arthroscopy",   bg: "#e6f4f4", iconColor: "#0a6e6e", icon: "wave" },
      { label: "Hip Replacement",    bg: "#faeeda", iconColor: "#854F0B", icon: "drop" },
    ],
    education: [
      { degree: "DNB – Orthopaedics", institute: "Nims, Hyderabad",                year: "2016" },
      { degree: "MS – Orthopaedics",  institute: "SVS Medical College, Mahbubnagar", year: "2014" },
      { degree: "MBBS",               institute: "Kamineni Medical College",         year: "2011" },
    ],
    workExp: [
      { role: "Orthopedic Specialist", org: "MedCare Clinics – Kompally", period: "2018 – Present", code: "MC" },
      { role: "Senior Resident",       org: "NIMS, Hyderabad",            period: "2014 – 2018",   code: "NI" },
    ],
    patientReviews: [
      { name: "Rajesh V.", stars: 5, text: "Dr. Naresh fixed my hip fracture perfectly.", date: "4 days ago" },
      { name: "Kavya R.",  stars: 4, text: "Good surgeon. Recovery was smooth.", date: "2 weeks ago" },
    ],
    branches: [
      { name: "Kompally", address: "NH-44, Kompally, Hyderabad" },
      { name: "Miyapur",  address: "Miyapur Main Rd, Near Metro Station" },
    ],
  },
];

// ─────────────────────────────────────────────
// ICON HELPER
// ─────────────────────────────────────────────

function Icon({ name, size = 16, color = "currentColor" }: { name: string; size?: number; color?: string }) {
  const s = { width: size, height: size, stroke: color, fill: "none", strokeWidth: 1.8, flexShrink: 0 } as React.CSSProperties;
  const p: Record<string, React.ReactNode> = {
    heart:    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    wave:     <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    shield:   <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    drop:     <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>,
    eye:      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    star:     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={color} stroke="none"/>,
    clock:    <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    pin:      <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    phone:    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.94-1.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>,
    back:     <polyline points="15 18 9 12 15 6"/>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    search:   <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    brain:    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14zm5 0A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14z"/>,
    bone:     <path d="M17 10c.7-.7 1-1.5 1-2.5a3.5 3.5 0 0 0-7 0c0 1 .3 1.8 1 2.5L7 15c-.7.7-1 1.5-1 2.5a3.5 3.5 0 0 0 7 0c0-1-.3-1.8-1-2.5l5-5z"/>,
    run:      <><circle cx="13" cy="4" r="1"/><path d="m7 21 2-7H5l4-7h8l-2 4h2l-3 6H9"/></>,
    skin:     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>,
    laser:    <><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><circle cx="12" cy="12" r="4"/></>,
    hair:     <path d="M12 2a5 5 0 0 1 5 5c0 3-2 5-5 5S7 10 7 7a5 5 0 0 1 5-5zM4 22v-2a8 8 0 0 1 16 0v2"/>,
    spine:    <><line x1="12" y1="2" x2="12" y2="22"/><path d="M9 6h6M9 10h6M9 14h6M9 18h6"/></>,
  };
  return <svg viewBox="0 0 24 24" style={s} xmlns="http://www.w3.org/2000/svg">{p[name] || p["heart"]}</svg>;
}

// ─────────────────────────────────────────────
// DOCTOR CARD (list view)
// ─────────────────────────────────────────────

function DoctorCard({ doctor, onClick }: { doctor: Doctor; onClick: () => void }) {
  return (
    <div onClick={onClick} style={cs.card}>
      <div style={{ ...cs.availBadge, ...(doctor.available ? cs.availYes : cs.availNo) }}>
        <span style={{ ...cs.availDot, background: doctor.available ? "#1a7a45" : "#b06000" }} />
        {doctor.available ? "Available Today" : "Next Available"}
      </div>
      <div style={cs.cardTop}>
        <div style={{ ...cs.cardAvatar, background: doctor.color }}>{doctor.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={cs.cardName}>{doctor.name}</div>
          <div style={cs.cardSpec}>{doctor.specialty}</div>
          <div style={cs.cardQual}>{doctor.qualifications}</div>
        </div>
      </div>
      <div style={cs.statsRow}>
        <div style={cs.st}><strong style={cs.stv}>⭐ {doctor.rating}</strong><small style={cs.stl}>{doctor.reviews} reviews</small></div>
        <div style={cs.stDiv} />
        <div style={cs.st}><strong style={cs.stv}>{doctor.experience}</strong><small style={cs.stl}>Experience</small></div>
        <div style={cs.stDiv} />
        <div style={cs.st}><strong style={cs.stv}>{doctor.fee}</strong><small style={cs.stl}>Fee</small></div>
      </div>
      <div style={cs.langRow}>
        {doctor.languages.map(l => <span key={l} style={cs.langTag}>{l}</span>)}
        <span style={{ ...cs.langTag, background: "#e6f4f4", color: "#085041" }}>{doctor.branch}</span>
      </div>
      <div style={cs.cardFoot}>
        <div style={cs.slotTxt}><Icon name="clock" size={13} color="#7a9090" />&nbsp;{doctor.nextSlot}</div>
        <button style={cs.bookBtn} onClick={e => { e.stopPropagation(); onClick(); }}>Book Appointment</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DOCTOR DETAIL PAGE
// ─────────────────────────────────────────────

function DoctorDetail({ doctor, onBack }: { doctor: Doctor; onBack: () => void }) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    if (!selectedSlot) return;
    setBooked(true);
    setTimeout(() => setBooked(false), 3500);
  };

  return (
    <div style={cs.detailPage}>
      {/* Top bar */}
      <div style={cs.topbar}>
        <button style={cs.backBtn} onClick={onBack}>
          <Icon name="back" size={16} color="rgba(255,255,255,0.85)" />
          <span style={{ marginLeft: 5 }}>All Doctors</span>
        </button>
        <span style={cs.topbarTitle}>Doctor Profile</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={cs.tbBtn}>Share</button>
          <button style={cs.tbBtn}>Save</button>
        </div>
      </div>

      {/* Hero */}
      <div style={cs.detailHero}>
        <div style={cs.detailHeroInner}>
          <div style={{ ...cs.detailAvatar, background: doctor.color }}>{doctor.initials}</div>
          <div style={cs.heroInfo}>
            <div style={cs.availPill}>
              <span style={cs.availPillDot} />
              {doctor.available ? "Available Today" : "Next Available Tomorrow"}
            </div>
            <h1 style={cs.detailName}>{doctor.name}</h1>
            <p style={cs.detailSpec}>{doctor.specialty}</p>
            <p style={cs.detailQual}>{doctor.qualifications}</p>
            <div style={cs.heroTags}>
              {doctor.languages.map(l => <span key={l} style={cs.htag}>{l}</span>)}
              <span style={cs.htag}>{doctor.branch}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={cs.detailStats}>
        {[
          { v: `⭐ ${doctor.rating}`, l: "Rating" },
          { v: doctor.reviews,       l: "Reviews" },
          { v: doctor.experience,    l: "Experience" },
          { v: doctor.patients,      l: "Patients" },
        ].map((s, i, a) => (
          <div key={s.l} style={{ display: "flex", alignItems: "center" }}>
            <div style={cs.statItem}>
              <strong style={cs.detailStatVal}>{s.v}</strong>
              <small style={cs.detailStatLbl}>{s.l}</small>
            </div>
            {i < a.length - 1 && <div style={cs.detailStatDiv} />}
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={cs.detailBody}>
        {/* Main */}
        <div style={cs.detailMain}>
          <SecTitle>About</SecTitle>
          <p style={cs.aboutTxt}>{doctor.about}</p>

          <SecTitle>Specializations</SecTitle>
          <div style={cs.specGrid}>
            {doctor.specializations.map(sp => (
              <div key={sp.label} style={cs.specCard}>
                <div style={{ ...cs.specIcon, background: sp.bg }}>
                  <Icon name={sp.icon} size={15} color={sp.iconColor} />
                </div>
                <span style={cs.specName}>{sp.label}</span>
              </div>
            ))}
          </div>

          <SecTitle>Education</SecTitle>
          <div style={{ marginBottom: 22 }}>
            {doctor.education.map(e => (
              <div key={e.degree} style={cs.eduItem}>
                <div style={cs.eduDot} />
                <div>
                  <div style={cs.eduDeg}>{e.degree}</div>
                  <div style={cs.eduInst}>{e.institute} · {e.year}</div>
                </div>
              </div>
            ))}
          </div>

          <SecTitle>Work Experience</SecTitle>
          <div style={{ marginBottom: 22 }}>
            {doctor.workExp.map((e, i) => (
              <div key={e.role} style={{ ...cs.expItem, borderBottom: i < doctor.workExp.length - 1 ? "0.5px solid #e0eeee" : "none" }}>
                <div style={cs.expLogo}>{e.code}</div>
                <div>
                  <div style={cs.expRole}>{e.role}</div>
                  <div style={cs.expOrg}>{e.org}</div>
                  <div style={cs.expYr}>{e.period}</div>
                </div>
              </div>
            ))}
          </div>

          <SecTitle>Patient Reviews</SecTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {doctor.patientReviews.map(r => (
              <div key={r.name} style={cs.revCard}>
                <div style={cs.revHeader}>
                  <div>
                    <div style={cs.revName}>{r.name}</div>
                    <div style={cs.revDate}>{r.date}</div>
                  </div>
                  <div style={{ display: "flex", gap: 2 }}>
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Icon key={i} name="star" size={12} color="#c8972a" />
                    ))}
                  </div>
                </div>
                <p style={cs.revTxt}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={cs.detailSidebar}>
          {/* Booking */}
          <div style={cs.bookCard}>
            <div style={cs.feeRow}>
              <div>
                <div style={cs.feeLabel}>Consultation fee</div>
                <div style={cs.feeAmt}>{doctor.fee}</div>
                <div style={cs.feeSub}>per visit</div>
              </div>
              <div style={cs.nextSlotPill}>
                <Icon name="clock" size={12} color="#0a6e6e" />
                <span style={{ fontSize: 10, color: "#0a6e6e", marginLeft: 4 }}>Next: {doctor.nextSlot}</span>
              </div>
            </div>

            <div style={cs.slotHeading}>
              <Icon name="calendar" size={13} color="#5a7070" />
              <span style={{ marginLeft: 5, fontSize: 11, color: "#5a7070", fontWeight: 600 }}>Choose a time slot — Today</span>
            </div>
            <div style={cs.slotsGrid}>
              {TIME_SLOTS.map(s => (
                <button
                  key={s}
                  style={{ ...cs.slotBtn, ...(selectedSlot === s ? cs.slotBtnSel : {}) }}
                  onClick={() => setSelectedSlot(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            {booked
              ? <div style={cs.successMsg}>✓ Booked for {selectedSlot}!</div>
              : <button
                  style={{ ...cs.bookBtnMain, ...(selectedSlot ? {} : cs.bookBtnDis) }}
                  onClick={handleBook}
                  disabled={!selectedSlot}
                >
                  {selectedSlot ? `Confirm ${selectedSlot}` : "Select a slot to book"}
                </button>
            }
            <p style={cs.bookNote}>Free cancellation up to 2 hrs before appointment</p>
          </div>

          {/* Info */}
          <div style={cs.infoCard}>
            {[
              { icon: "pin",   label: "Branch",   val: doctor.branch },
              { icon: "clock", label: "Timings",  val: "9:00 AM – 6:00 PM" },
              { icon: "phone", label: "Helpline", val: "1800-XXX-XXXX" },
            ].map((r, i, a) => (
              <div key={r.label} style={{ ...cs.infoRow, borderBottom: i < a.length - 1 ? "0.5px solid #e8f4f4" : "none" }}>
                <div style={cs.infoIcon}><Icon name={r.icon} size={13} color="#0a6e6e" /></div>
                <div>
                  <div style={cs.infoLabel}>{r.label}</div>
                  <div style={cs.infoVal}>{r.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Branches */}
          <div style={cs.sideHeading}>Available at</div>
          {doctor.branches.map(b => (
            <div key={b.name} style={cs.branchBadge}>
              <div style={cs.branchDot} />
              <div>
                <div style={cs.branchName}>{b.name}</div>
                <div style={cs.branchAddr}>{b.address}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, color: "#3a5050",
      textTransform: "uppercase" as const, letterSpacing: "0.07em",
      marginBottom: 12, paddingBottom: 8,
      borderBottom: "0.5px solid #e0eeee",
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function DoctorsPage() {
  const [activeBranch, setActiveBranch]   = useState("all");
  const [activeSpec, setActiveSpec]       = useState("All Specialties");
  const [search, setSearch]               = useState("");
  const [selectedDoc, setSelectedDoc]     = useState<Doctor | null>(null);

  const filtered = useMemo(() => DOCTORS.filter(d => {
    const mb = activeBranch === "all" || d.branchId === activeBranch;
    const ms = activeSpec === "All Specialties" || d.specialty.toLowerCase().includes(activeSpec.toLowerCase());
    const mq = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    return mb && ms && mq;
  }), [activeBranch, activeSpec, search]);

  // ── Detail view ──
  if (selectedDoc) {
    return (
      <>
        <GlobalStyle />
        <DoctorDetail doctor={selectedDoc} onBack={() => setSelectedDoc(null)} />
      </>
    );
  }

  // ── List view ──
  return (
    <>
      <GlobalStyle />
      <div style={cs.page}>

        {/* HERO */}
        <section style={cs.hero}>
          <div style={cs.heroBadge}>9 Branches · Telangana &amp; AP</div>
          <h1 style={cs.heroTitle}>Find the Right <em style={{ color: "#7bd4c8", fontStyle: "normal" }}>Doctor for You</em></h1>
          <p style={cs.heroSub}>Expert doctors across all specialties, available at a branch near you.</p>

          <div style={cs.searchBar}>
            <Icon name="search" size={16} color="#9aafaf" />
            <input
              style={cs.searchInput}
              type="text"
              placeholder="Search doctor name or specialty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button style={cs.clearBtn} onClick={() => setSearch("")}>✕</button>}
          </div>

          <div style={cs.heroPills}>
            {[
              { v: `${DOCTORS.length}+`, l: "Doctors" },
              { v: `${DOCTORS.filter(d => d.available).length}+`, l: "Available Now" },
              { v: "9", l: "Branches" },
              { v: "8", l: "Specialties" },
            ].map(s => (
              <div key={s.l} style={cs.heroPill}>
                <strong style={cs.pillVal}>{s.v}</strong>
                <small style={cs.pillLbl}>{s.l}</small>
              </div>
            ))}
          </div>
        </section>

        {/* BRANCH TABS */}
        <div style={cs.branchSection}>
          <div style={cs.sectionLabel}>Our Branches</div>
          <div style={cs.branchTabs}>
            {BRANCHES.map(b => (
              <button
                key={b.id}
                style={{ ...cs.branchTab, ...(activeBranch === b.id ? cs.branchTabActive : {}) }}
                onClick={() => setActiveBranch(b.id)}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* SPECIALTY CHIPS */}
        <div style={cs.specSection}>
          <div style={cs.specScroll}>
            {SPECIALTIES.map(sp => (
              <button
                key={sp}
                style={{ ...cs.specChip, ...(activeSpec === sp ? cs.specChipActive : {}) }}
                onClick={() => setActiveSpec(sp)}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <section style={cs.gridSection}>
          <div style={cs.resultsBar}>
            <span style={cs.resultsCount}>
              {filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found
              {activeBranch !== "all" && ` in ${BRANCHES.find(b => b.id === activeBranch)?.label}`}
            </span>
            <select style={cs.sortSelect}>
              <option>Relevance</option>
              <option>Rating</option>
              <option>Experience</option>
              <option>Fee: Low to High</option>
            </select>
          </div>

          {filtered.length === 0
            ? <div style={cs.emptyState}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1a3030", marginBottom: 6 }}>No doctors found</h3>
                <p style={{ fontSize: 13, color: "#7a9090", marginBottom: 18 }}>Try adjusting your filters.</p>
                <button style={cs.resetBtn} onClick={() => { setActiveBranch("all"); setActiveSpec("All Specialties"); setSearch(""); }}>
                  Reset Filters
                </button>
              </div>
            : <div style={cs.docGrid}>
                {filtered.map(d => <DoctorCard key={d.id} doctor={d} onClick={() => setSelectedDoc(d)} />)}
              </div>
          }
        </section>

        
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// GLOBAL STYLE INJECTOR
// ─────────────────────────────────────────────

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html,body{font-family:'DM Sans',sans-serif;background:#f4fafa;color:#2a3f3f}
      a{text-decoration:none;color:inherit;cursor:pointer}
      button{cursor:pointer;font-family:'DM Sans',sans-serif}
      input,select{font-family:'DM Sans',sans-serif}
      ::-webkit-scrollbar{height:4px;width:4px}
      ::-webkit-scrollbar-track{background:transparent}
      ::-webkit-scrollbar-thumb{background:#c0d8d8;border-radius:2px}
      @media(max-width:700px){
        .detail-body{flex-direction:column!important}
        .detail-sidebar{width:100%!important;border-left:none!important;border-top:0.5px solid #e0eeee!important}
        .hero-inner{flex-direction:column!important;align-items:flex-start!important}
        .spec-grid{grid-template-columns:1fr!important}
        .doc-grid{grid-template-columns:1fr!important}
        .footer-grid{grid-template-columns:1fr 1fr!important}
        .nav-links{display:none!important}
      }
    `}</style>
  );
}

// ─────────────────────────────────────────────
// STYLES OBJECT
// ─────────────────────────────────────────────

const cs: Record<string, React.CSSProperties> = {
  // PAGE
  page: { minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" },

  // NAV
  nav: { position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(10px)", borderBottom: "0.5px solid #d0e4e4", boxShadow: "0 1px 12px rgba(10,110,110,0.06)" },
  navInner: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64 },
  logo: { display: "flex", alignItems: "center", gap: 6 },
  logoText: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#0a6e6e" },
  logoSub: { fontSize: 11, color: "#7a9090", marginTop: 2 },
  navLinks: { display: "flex", gap: 28 },
  navLink: { fontSize: 14, fontWeight: 500, color: "#5a7070" },
  navLinkActive: { color: "#0a6e6e", fontWeight: 700 },
  navCta: { background: "#0a6e6e", color: "#fff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 13, fontWeight: 600 },

  // HERO
  hero: { background: "linear-gradient(135deg, #C0145C, #880E4F)", padding: "64px 24px 52px", textAlign: "center" },
  heroBadge: { display: "inline-block", background: "rgba(255,255,255,0.13)", color: "#a8e0d8", border: "1px solid rgba(255,255,255,0.2)", fontSize: 11, fontWeight: 600, padding: "4px 14px", borderRadius: 20, marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.06em" },
  heroTitle: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 12 },
  heroSub: { fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 28 },
  searchBar: { display: "flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 13, padding: "13px 18px", maxWidth: 560, margin: "0 auto 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" },
  searchInput: { flex: 1, border: "none", outline: "none", fontSize: 14, color: "#0f1f1f", background: "transparent" },
  clearBtn: { background: "#f0f5f5", border: "none", borderRadius: 6, width: 22, height: 22, fontSize: 11, color: "#7a9090", display: "flex", alignItems: "center", justifyContent: "center" },
  heroPills: { display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" },
  heroPill: { background: "rgba(255,255,255,0.11)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 11, padding: "10px 20px", textAlign: "center" },
  pillVal: { display: "block", color: "#fff", fontSize: 20, fontWeight: 700 },
  pillLbl: { color: "rgba(255,255,255,0.55)", fontSize: 10 },

  // BRANCH TABS
  branchSection: { background: "#fff", padding: "22px 24px 20px", borderBottom: "0.5px solid #e0eeee" },
  sectionLabel: { fontSize: 11, fontWeight: 700, color: "#5a7070", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 },
  branchTabs: { display: "flex", gap: 8, flexWrap: "wrap" },
  branchTab: { padding: "8px 16px", borderRadius: 9, border: "0.5px solid #d0e4e4", background: "#fff", fontSize: 12, fontWeight: 500, color: "#3a5050", transition: "all 0.15s" },
  branchTabActive: { background: "#0a6e6e", color: "#fff", border: "0.5px solid #0a6e6e", fontWeight: 700 },

  // SPECIALTY
  specSection: { background: "#f4fafa", padding: "12px 24px", borderBottom: "0.5px solid #e0eeee" },
  specScroll: { display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" },
  specChip: { whiteSpace: "nowrap", padding: "6px 15px", borderRadius: 20, border: "0.5px solid #d0e4e4", background: "#fff", fontSize: 12, fontWeight: 500, color: "#3a5050", flexShrink: 0, transition: "all 0.15s" },
  specChipActive: { background: "#e6f4f4", border: "0.5px solid #0a6e6e", color: "#0a6e6e", fontWeight: 600 },

  // GRID SECTION
  gridSection: { maxWidth: 1200, margin: "0 auto", padding: "28px 24px 60px" },
  resultsBar: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 },
  resultsCount: { fontSize: 13, fontWeight: 600, color: "#3a5050" },
  sortSelect: { border: "0.5px solid #d0e4e4", borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#3a5050", background: "#fff", outline: "none" },
  docGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 },
  emptyState: { textAlign: "center", padding: "60px 24px", background: "#fff", borderRadius: 16, border: "0.5px dashed #d0e4e4" },
  resetBtn: { background: "#0a6e6e", color: "#fff", border: "none", borderRadius: 9, padding: "10px 22px", fontSize: 13, fontWeight: 600 },

  // DOCTOR CARD
  card: { background: "#fff", borderRadius: 14, padding: "18px 18px 14px", border: "0.5px solid #e0eeee", cursor: "pointer", transition: "all 0.2s", position: "relative" },
  availBadge: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 20, marginBottom: 12, letterSpacing: "0.03em" },
  availYes: { background: "#e6f7ee", color: "#1a7a45" },
  availNo: { background: "#fff4e6", color: "#b06000" },
  availDot: { width: 5, height: 5, borderRadius: "50%", flexShrink: 0 },
  cardTop: { display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 },
  cardAvatar: { width: 52, height: 52, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "'Playfair Display', serif", flexShrink: 0 },
  cardName: { fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#0f1f1f", marginBottom: 2 },
  cardSpec: { fontSize: 12, fontWeight: 600, color: "#0a6e6e", marginBottom: 2 },
  cardQual: { fontSize: 10, color: "#9aafaf" },
  statsRow: { display: "flex", alignItems: "center", background: "#f4fafa", borderRadius: 9, padding: "9px 12px", marginBottom: 10 },
  st: { flex: 1, textAlign: "center" },
  stv: { display: "block", fontSize: 12, fontWeight: 700, color: "#0f1f1f" },
  stl: { display: "block", fontSize: 9, color: "#9aafaf", marginTop: 1 },
  stDiv: { width: 1, height: 24, background: "#d8eaea", margin: "0 4px" },
  langRow: { display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 },
  langTag: { fontSize: 9, fontWeight: 600, color: "#2a6060", background: "#e6f4f4", padding: "2px 7px", borderRadius: 20 },
  cardFoot: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 },
  slotTxt: { display: "flex", alignItems: "center", fontSize: 11, color: "#5a7070" },
  bookBtn: { background: "#0a6e6e", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" },

  // FOOTER
  footer: { background: "#0f1f1f", padding: "44px 24px 24px" },
  footerGrid: { maxWidth: 1200, margin: "0 auto 32px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 36 },
  footerLogo: { fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 8 },
  footerDesc: { fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 },
  footerColTitle: { color: "rgba(255,255,255,0.65)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 },
  footerLink: { display: "block", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 7, cursor: "pointer" },
  footerBottom: { maxWidth: 1200, margin: "0 auto", borderTop: "0.5px solid rgba(255,255,255,0.08)", paddingTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "rgba(255,255,255,0.25)", flexWrap: "wrap", gap: 8 },

  // ── DETAIL PAGE ──
  detailPage: { fontFamily: "'DM Sans', sans-serif", background: "#f4fafa", minHeight: "100vh" },
  topbar: { background: "#0a6e6e", padding: "12px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  backBtn: { display: "flex", alignItems: "center", color: "rgba(255,255,255,0.8)", fontSize: 13, background: "none", border: "none", fontFamily: "'DM Sans', sans-serif" },
  topbarTitle: { color: "#fff", fontSize: 13, fontWeight: 500 },
  tbBtn: { background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: 7, padding: "5px 12px", fontSize: 11 },
  detailHero: { background: "#0a6e6e", padding: "22px 24px 0" },
  detailHeroInner: { display: "flex", gap: 20, alignItems: "flex-end" },
  detailAvatar: { width: 84, height: 84, borderRadius: 14, border: "3px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 24, fontWeight: 700, fontFamily: "'Playfair Display', serif", flexShrink: 0 },
  heroInfo: { flex: 1, paddingBottom: 16 },
  availPill: { display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.14)", color: "#a8e6d8", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginBottom: 8, border: "1px solid rgba(255,255,255,0.2)", letterSpacing: "0.04em" },
  availPillDot: { width: 5, height: 5, borderRadius: "50%", background: "#5dcaa5" },
  detailName: { fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 3 },
  detailSpec: { color: "rgba(255,255,255,0.75)", fontSize: 13, marginBottom: 3 },
  detailQual: { color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 10 },
  heroTags: { display: "flex", gap: 6, flexWrap: "wrap" },
  htag: { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontSize: 10, padding: "3px 9px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.15)" },
  detailStats: { background: "#085858", padding: "14px 24px", display: "flex", justifyContent: "space-around", alignItems: "center", borderBottom: "0.5px solid rgba(255,255,255,0.1)" },
  statItem: { textAlign: "center" },
  detailStatVal: { display: "block", color: "#fff", fontSize: 17, fontWeight: 700 },
  detailStatLbl: { color: "rgba(255,255,255,0.45)", fontSize: 10 },
  detailStatDiv: { width: 1, height: 28, background: "rgba(255,255,255,0.14)", margin: "0 12px" },
  detailBody: { display: "flex", maxWidth: 1100, margin: "0 auto" },
  detailMain: { flex: 1, padding: "24px 24px", background: "#fff", borderRight: "0.5px solid #e0eeee" },
  detailSidebar: { width: 280, flexShrink: 0, padding: "20px 16px", background: "#f9fcfc" },
  aboutTxt: { fontSize: 13, color: "#5a7070", lineHeight: 1.75, marginBottom: 24 },
  specGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 24 },
  specCard: { background: "#fff", border: "0.5px solid #e0eeee", borderRadius: 9, padding: "10px 12px", display: "flex", alignItems: "center", gap: 9 },
  specIcon: { width: 32, height: 32, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  specName: { fontSize: 11, fontWeight: 600, color: "#1a3030" },
  eduItem: { display: "flex", gap: 10, marginBottom: 11, alignItems: "flex-start" },
  eduDot: { width: 7, height: 7, borderRadius: "50%", background: "#0a6e6e", marginTop: 4, flexShrink: 0 },
  eduDeg: { fontSize: 13, fontWeight: 600, color: "#1a3030" },
  eduInst: { fontSize: 11, color: "#7a9090", marginTop: 2 },
  expItem: { display: "flex", gap: 12, marginBottom: 13, paddingBottom: 13, alignItems: "flex-start" },
  expLogo: { width: 36, height: 36, borderRadius: 8, background: "#e6f4f4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#0a6e6e", flexShrink: 0 },
  expRole: { fontSize: 13, fontWeight: 600, color: "#1a3030" },
  expOrg: { fontSize: 11, color: "#5a7070", marginTop: 2 },
  expYr: { fontSize: 10, color: "#9aafaf", marginTop: 3 },
  revCard: { background: "#f9fcfc", border: "0.5px solid #e0eeee", borderRadius: 10, padding: "12px 13px" },
  revHeader: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 },
  revName: { fontSize: 12, fontWeight: 600, color: "#1a3030" },
  revDate: { fontSize: 10, color: "#9aafaf", marginTop: 2 },
  revTxt: { fontSize: 12, color: "#5a7070", lineHeight: 1.65 },
  // Sidebar booking
  bookCard: { background: "#fff", border: "0.5px solid #d0e4e4", borderRadius: 13, padding: 15, marginBottom: 12 },
  feeRow: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 13 },
  feeLabel: { fontSize: 10, color: "#9aafaf", marginBottom: 2 },
  feeAmt: { fontSize: 22, fontWeight: 700, color: "#0a6e6e" },
  feeSub: { fontSize: 10, color: "#9aafaf" },
  nextSlotPill: { display: "flex", alignItems: "center", background: "#e6f4f4", borderRadius: 7, padding: "5px 9px", marginTop: 4 },
  slotHeading: { display: "flex", alignItems: "center", marginBottom: 8 },
  slotsGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, marginBottom: 11 },
  slotBtn: { padding: "6px 2px", borderRadius: 6, border: "0.5px solid #d0e4e4", background: "#fff", fontSize: 10, fontWeight: 500, color: "#3a5050", textAlign: "center" },
  slotBtnSel: { background: "#0a6e6e", color: "#fff", border: "0.5px solid #0a6e6e" },
  bookBtnMain: { width: "100%", padding: 11, borderRadius: 9, background: "#0a6e6e", color: "#fff", border: "none", fontSize: 12, fontWeight: 700 },
  bookBtnDis: { background: "#a8c0c0", cursor: "not-allowed" },
  successMsg: { background: "#e6f7ee", color: "#1a7a45", borderRadius: 8, padding: "10px 13px", fontSize: 12, fontWeight: 600, textAlign: "center" },
  bookNote: { fontSize: 9, color: "#9aafaf", textAlign: "center", marginTop: 7 },
  infoCard: { background: "#fff", border: "0.5px solid #d0e4e4", borderRadius: 11, padding: "12px 13px", marginBottom: 12 },
  infoRow: { display: "flex", alignItems: "center", gap: 10, padding: "7px 0" },
  infoIcon: { width: 26, height: 26, borderRadius: 6, background: "#e6f4f4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  infoLabel: { fontSize: 10, color: "#9aafaf" },
  infoVal: { fontSize: 12, fontWeight: 600, color: "#1a3030", marginTop: 1 },
  sideHeading: { fontSize: 10, fontWeight: 700, color: "#5a7070", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 },
  branchBadge: { display: "flex", alignItems: "flex-start", gap: 8, background: "#e6f4f4", borderRadius: 8, padding: "8px 10px", marginBottom: 7 },
  branchDot: { width: 6, height: 6, borderRadius: "50%", background: "#0a6e6e", marginTop: 4, flexShrink: 0 },
  branchName: { fontSize: 12, fontWeight: 600, color: "#085041" },
  branchAddr: { fontSize: 10, color: "#0F6E56", marginTop: 2 },
};