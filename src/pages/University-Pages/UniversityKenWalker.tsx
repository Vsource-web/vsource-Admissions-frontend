// import UniversityLayout, { UniversityData } from "./UniversityLayout";

import UniversityLayout, {
  UniversityData,
} from "@/components/University/UniversityLayout";

const universityKenWalker: UniversityData = {
  name: "University of Ken Walker International",
  city: "Tbilisi",
  country: "Georgia",
  recognitions: [
    "WHO (World Health Organization)",
    "NMC (National Medical Commission, India)",
    "Accredited: Georgia Ministry of Education",
    "EHEA (Bologna Process)",
  ],
  hero: "/images/universities/UniversityKenWalker/UniversityKenWalker.webp",
  highlights: [
    { label: "Established", value: "2019" },
    { label: "Program", value: "MBBS / MD (6 Years)" },
    { label: "Medium", value: "English" },
    { label: "Intakes", value: "September / February" },
  ],
  fees: {
    currency: "USD",
    fxRate: 83,
    rows: [
      {
        year: 1,
        tuition: 5800,
        hostel: 2500,
        insurance: 150,
        other: 200,
        notes: "Admission + Registration",
      },
      { year: 2, tuition: 5800, hostel: 2500, insurance: 150, other: 200 },
      { year: 3, tuition: 5800, hostel: 2500, insurance: 150, other: 200 },
      { year: 4, tuition: 5800, hostel: 2500, insurance: 150, other: 200 },
      { year: 5, tuition: 5800, hostel: 2500, insurance: 150, other: 200 },
      { year: 6, tuition: 5800, hostel: 2500, insurance: 150, other: 200 },
    ],
    includes: ["Tuition Fee", "Hostel Fee", "Medical Insurance"],
    excludes: [
      "Food & Mess",
      "Travel & Airfare",
      "Visa Charges",
      "Books & Stationery",
    ],
  },
  programStructure: [
    {
      title: "Years 1–2",
      points: [
        "Basic Medical Sciences (Anatomy, Physiology, Biochemistry)",
        "Intro to Clinical Skills and Research Foundation",
      ],
    },
    {
      title: "Years 3–5",
      points: [
        "Core Clinical Rotations (Medicine, Surgery, Pediatrics, OB-GYN)",
        "Elective & Subspecialty Rotations",
      ],
    },
    {
      title: "Year 6",
      points: [
        "Full-year Clinical Internship (hospital-based)",
        "Preparation for NEXT/USMLE and other licensing exams",
      ],
    },
  ],
  hostelCity: {
    hostel: [
      "Separate hostels for boys & girls, on/near campus",
      "Fully furnished, Wi-Fi, laundry, 24/7 security",
      "Indian mess & vegetarian options",
      "Approx. $200–$250/month for living expenses",
    ],
    city: [
      "Located in student-friendly, cosmopolitan Tbilisi",
      "Vibrant social life, safe and accessible city",
      "Public transport, shopping, cafes all nearby",
    ],
  },
  faqs: [
    {
      q: "Is NEET required?",
      a: "Yes, Indian students must qualify NEET for admission and future practice in India.",
    },
    {
      q: "What is the teaching language?",
      a: "Medium of instruction is fully English for international students.",
    },
    {
      q: "Are degrees globally recognized?",
      a: "Yes. The degree is recognized by WHO, NMC (India) and globally for licensing.",
    },
    {
      q: "What are the intakes?",
      a: "Admissions start in September and February each cycle.",
    },
    {
      q: "Is clinical exposure provided?",
      a: "Yes, from the early years through affiliated hospitals and simulation labs.",
    },
  ],
  gallery: [
    "/images/universities/UniversityKenWalker/1.jpg",
    "/images/universities/UniversityKenWalker/30.jpg",
    "/images/universities/UniversityKenWalker/class.jpg",
    "/images/universities/UniversityKenWalker/Ken-Walker-International-University-Practical-room.webp",
    "/images/universities/UniversityKenWalker/Ken-Walker-International-University.png",
    "/images/universities/UniversityKenWalker/ken.ea8d97defde9953f262b.webp",
    "/images/universities/UniversityKenWalker/library.webp",
    "/images/universities/UniversityKenWalker/maxresdefault.jpg",
    "/images/universities/UniversityKenWalker/slider1.png",
  ],
  about:
    "Founded in 2019, University of Ken Walker International (KWIU) in Tbilisi, Georgia is known for modern medical education, US-inspired curriculum, and global faculty. It offers 6-year MD/MBBS entirely in English, recognized by WHO, NMC, and the Georgian Ministry of Education. Open to students from 30+ countries, with a strong focus on clinical skills and research readiness.",
  hostelImages: [
    "/images/universities/UniversityKenWalker/hostel.png",
    "/images/universities/UniversityKenWalker/hostel12.png",
    "/images/universities/UniversityKenWalker/hostell1.png",
  ],
  infraImages: [
    "/images/universities/UniversityKenWalker/class.jpg",
    "/images/universities/UniversityKenWalker/Ken-Walker-International-University-Practical-room.webp",
    "/images/universities/UniversityKenWalker/library.webp",
  ],
};

export default function UniversityKenWalker() {
  return <UniversityLayout university={universityKenWalker} />;
}
