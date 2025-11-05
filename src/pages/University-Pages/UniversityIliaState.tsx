import UniversityLayout, {
  UniversityData,
} from "@/components/University/UniversityLayout";

const universityData: UniversityData = {
  name: "Ilia State University",
  city: "Tbilisi",
  country: "Georgia",

  recognitions: [
    "NMC (National Medical Commission)",
    "WHO (World Health Organization)",
    "WFME Accredited",
    "FAIMER Listed",
    "ECFMG Certified",
  ],

  heroImg: "/images/universities/Ilia-State-University/ilia-state.jpg",
  hero: "/images/universities/Ilia-State-University/ca.jpg",

  highlights: [
    { label: "Founded", value: "2006" },
    { label: "Total Students", value: "16,000+" },
    { label: "International Students", value: "3,000+" },
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
    includes: ["Tuition Fee", "Medical Insurance"],
    excludes: [
      "Hostel & mess charges",
      "Airfare",
      "Visa processing",
      "Books & personal expenses",
    ],
    rows: [
      {
        year: 1,
        tuition: 500000,
        hostel: 120000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 2,
        tuition: 500000,
        hostel: 120000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 3,
        tuition: 500000,
        hostel: 120000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 4,
        tuition: 500000,
        hostel: 120000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 5,
        tuition: 500000,
        hostel: 120000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 6,
        tuition: 500000,
        hostel: 120000,
        insurance: 30000,
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
        "NEET Qualification Mandatory",
        "Age 17+ at time of admission",
      ],
    },
    {
      title: "Admission Process",
      points: [
        "Apply & submit academic documents",
        "Receive Offer Letter",
        "Pay initial seat reservation fee",
        "Receive Visa Invitation Letter",
        "Apply for Visa & fly to Georgia",
      ],
    },
  ],

  hostelCity: {
    hostel: [
      "Private and shared hostel options",
      "Indian food availability nearby",
      "Laundry, kitchen & Wi-Fi",
      "High–security dormitories",
    ],
    city: [
      "Capital city of Georgia — Tbilisi",
      "Safe & welcoming environment for Indian students",
      "Excellent public transport & affordability",
      "Large Indian community presence",
    ],
  },

  gallery: [
    "/images/universities/Ilia-State-University/ilia-state.jpg",
    "/images/universities/Ilia-State-University/ca.jpg",

    "/images/universities/Ilia-State-University/2.webp",
    "/images/universities/Ilia-State-University/ilia-state-university-mobile.jpg",
    "/images/universities/Ilia-State-University/8.jpg",
    "/images/universities/Ilia-State-University/9.jpg",
    "/images/universities/Ilia-State-University/1.webp",
    "/images/universities/Ilia-State-University/5.jpg",
    "/images/universities/Ilia-State-University/7.jpg",
  ],

  hostelImages: [
    "/images/universities/Ilia-State-University/8.jpg",
    "/images/universities/Ilia-State-University/9.jpg",
    "/images/universities/Ilia-State-University/9.png",
  ],

  infraImages: [
    "/images/universities/Ilia-State-University/1.webp",
    "/images/universities/Ilia-State-University/5.jpg",
    "/images/universities/Ilia-State-University/7.jpg",
  ],

  faqs: [
    {
      q: "Is NEET required for admission?",
      a: "Yes, NEET qualification is mandatory for Indian students.",
    },
    {
      q: "Is Ilia State University recognized by NMC?",
      a: "Yes, the university is approved by NMC & WHO.",
    },
    {
      q: "Is the MBBS course taught in English?",
      a: "Yes, the complete medical program is taught in English.",
    },
    {
      q: "Is Tbilisi safe for international students?",
      a: "Yes, Tbilisi is one of the safest & most student-friendly cities in Europe.",
    },
  ],

  about: `
Ilia State University (ISU) is one of the most prestigious public universities in Georgia,
located in the capital city, Tbilisi. Known for strong research culture, modern academic 
environment, and global recognition, ISU attracts thousands of international students each year.

The university offers a globally accepted MD (MBBS) degree with advanced simulation labs,
clinical training, and experienced faculty. Affordable living costs, student-friendly
environment, and excellent FMGE/NEXT support make Ilia State University a leading choice
for Indian medical aspirants.
`,
};

export default function UniversityIliaState() {
  return <UniversityLayout university={universityData} />;
}
