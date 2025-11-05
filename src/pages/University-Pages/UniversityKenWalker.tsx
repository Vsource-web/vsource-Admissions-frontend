// import { UniversityData } from "./UniversityTypes";

import UniversityLayout, {
  UniversityData,
} from "@/components/University/UniversityLayout";

const universityData: UniversityData = {
  name: "University of Ken Walker International",
  city: "Tbilisi",
  country: "Georgia",

  recognitions: [
    "NMC (National Medical Commission)",
    "WHO (World Health Organization)",
    "WFME Standard Medical Training",
    "FAIMER Listed",
  ],
  heroImg: "/images/universities/UniversityKenWalker/UniversityKenWalker.webp",
  hero: "/images/universities/UniversityKenWalker/ken-walker-international-university.jpg",
  highlights: [
    { label: "Founded", value: "1994" },
    { label: "Total Students", value: "6000+" },
    { label: "International Students", value: "2000+" },
    { label: "Program Duration", value: "6 Years (Incl. Internship)" },
    { label: "Teaching Language", value: "English" },
    { label: "Degree Awarded", value: "MD (Equivalent to MBBS)" },
  ],

  fees: {
    currency: "USD",
    fxRates: {
      USD: 0.012,
      GEL: 0.034,
      RUB: 1.08,
    },
    includes: ["Tuition Fee", "Hostel Fee", "Medical Insurance"],
    excludes: [
      "Food & mess charges",
      "Books & stationeries",
      "Airfare/Travel",
      "Visa charges",
    ],
    rows: [
      {
        year: 1,
        tuition: 450000,
        hostel: 85000,
        insurance: 25000,
        other: 20000,
      },
      {
        year: 2,
        tuition: 450000,
        hostel: 85000,
        insurance: 25000,
        other: 20000,
      },
      {
        year: 3,
        tuition: 450000,
        hostel: 85000,
        insurance: 25000,
        other: 20000,
      },
      {
        year: 4,
        tuition: 450000,
        hostel: 85000,
        insurance: 25000,
        other: 20000,
      },
      {
        year: 5,
        tuition: 450000,
        hostel: 85000,
        insurance: 25000,
        other: 20000,
      },
      {
        year: 6,
        tuition: 450000,
        hostel: 85000,
        insurance: 25000,
        other: 20000,
      },
    ],
  },

  programStructure: [
    {
      title: "Admission Requirements",
      points: [
        "Minimum 50% in PCB (General Category)",
        "Minimum 40% for Reserved Category",
        "NEET qualification mandatory",
        "17+ years of age at admission",
      ],
    },
    {
      title: "Admission Process",
      points: [
        "Submit online application & documents",
        "Receive admission confirmation",
        "Pay university registration fee",
        "Receive invitation & apply for visa",
        "Fly to Georgia & join orientation",
      ],
    },
  ],

  hostelCity: {
    hostel: [
      "Modern campus in Tbilisi",
      "Affordable hostel & food options",
      "Indian mess & grocery availability",
    ],
    city: [
      "Clinical practice in partner hospitals",
      "Indian festival celebrations & student clubs",
      "Safe and vibrant city environment",
    ],
  },

  gallery: [
    "/images/universities/UniversityKenWalker/ken-walker-international-university-mobile.jpg",
    "/images/universities/UniversityKenWalker/library.webp",
    "/images/universities/UniversityKenWalker/Ken-Walker-International-University-Practical-room.webp",
    "/images/universities/UniversityKenWalker/Ken-Walker-International-University.png",
    "/images/universities/UniversityKenWalker/30.jpg",
    "/images/universities/UniversityKenWalker/1.jpg",
    "/images/universities/UniversityKenWalker/class.jpg",
    "/images/universities/UniversityKenWalker/slider1.png",
  ],

  hostelImages: [
    "/images/universities/UniversityKenWalker/hostel.png",
    "/images/universities/UniversityKenWalker/hostell1.png",
    "/images/universities/UniversityKenWalker/hostel12.png",
  ],

  infraImages: [
    "/images/universities/UniversityKenWalker/Ken-Walker-International-University-Practical-room.webp",
    "/images/universities/UniversityKenWalker/Ken-Walker-International-University.png",
    "/images/universities/UniversityKenWalker/maxresdefault.jpg",
  ],

  faqs: [
    {
      q: "Is NEET qualification required?",
      a: "Yes, Indian students must qualify NEET to pursue MBBS at Ken Walker International University.",
    },
    {
      q: "What is the medium of instruction?",
      a: "The entire program is taught in English.",
    },
    {
      q: "Are the degrees recognized internationally?",
      a: "Yes, the degrees are recognized by NMC, WHO, WFME, and FAIMER.",
    },
    {
      q: "What is the program duration?",
      a: "The MD program is 6 years including internship.",
    },
  ],

  about: `
University of Ken Walker International is a reputed medical university in Tbilisi, Georgia, known for its high-quality English-medium MD program. 
The university combines modern medical education, international faculty, strong clinical exposure, and a student-friendly environment.

The campus provides modern labs, simulation centers, e-learning facilities, and a multicultural environment, making it a preferred destination for Indian MBBS aspirants.
  `,
};
export default function UniversityKenWalker() {
  return <UniversityLayout university={universityData} />;
}
