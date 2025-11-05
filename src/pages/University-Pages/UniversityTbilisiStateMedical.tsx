import UniversityLayout, {
  UniversityData,
} from "@/components/University/UniversityLayout";

const universityData: UniversityData = {
  name: "Tbilisi State Medical University",
  city: "Tbilisi",
  country: "Georgia",

  recognitions: [
    "NMC (National Medical Commission)",
    "WHO (World Health Organization)",
    "WFME Accredited",
    "FAIMER Listed",
    "ECFMG Certified",
  ],

  heroImg:
    "/images/universities/Tbilisi-StateMedical-University/Tbilisi-University.webp",
  hero: "/images/universities/Tbilisi-StateMedical-University/3.jpeg",

  highlights: [
    { label: "Founded", value: "1918" },
    { label: "Total Students", value: "12,000+" },
    { label: "International Students", value: "3,500+" },
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
        tuition: 600000,
        hostel: 120000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 2,
        tuition: 600000,
        hostel: 120000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 3,
        tuition: 600000,
        hostel: 120000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 4,
        tuition: 600000,
        hostel: 120000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 5,
        tuition: 600000,
        hostel: 120000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 6,
        tuition: 600000,
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
        "Applicant must be 17+ at admission",
      ],
    },
    {
      title: "Admission Process",
      points: [
        "Step 1: Apply and submit required documents",
        "Step 2: Receive Offer/Admission Letter",
        "Step 3: Pay initial enrollment fee",
        "Step 4: Receive Visa Invitation Letter",
        "Step 5: Apply for Visa",
        "Step 6: Fly to Georgia & join TSMU",
      ],
    },
  ],

  hostelCity: {
    hostel: [
      "Separate hostel and private apartments available",
      "Indian mess and food outlets nearby",
      "Well–furnished rooms, Wi-Fi & laundry",
      "Security & CCTV surveillance",
    ],
    city: [
      "Tbilisi — capital city, safe & modern",
      "Large medical student community",
      "Affordable transportation",
      "Indian markets & restaurants accessible",
    ],
  },

  gallery: [
    "/images/universities/Tbilisi-StateMedical-University/Tbilisi-State-Medical-University-mobile.jpg",
    "/images/universities/Tbilisi-StateMedical-University/4.webp",
    "/images/universities/Tbilisi-StateMedical-University/6.jpg",
    "/images/universities/Tbilisi-StateMedical-University/7.jpg",
    "/images/universities/Tbilisi-StateMedical-University/1.jpg",
    "/images/universities/Tbilisi-StateMedical-University/2.jpg",
    "/images/universities/Tbilisi-StateMedical-University/5.jpg",
    "/images/universities/UniversityKenWalker/library.webp",
  ],

  hostelImages: [
    "/images/universities/Tbilisi-StateMedical-University/6.jpg",
    "/images/universities/Tbilisi-StateMedical-University/7.jpg",
    "/images/universities/Tbilisi-StateMedical-University/8.webp",
  ],

  infraImages: [
    "/images/universities/Tbilisi-StateMedical-University/1.jpg",
    "/images/universities/Tbilisi-StateMedical-University/2.jpg",
    "/images/universities/Tbilisi-StateMedical-University/5.jpg",
    "/images/universities/UniversityKenWalker/library.webp",
  ],

  faqs: [
    {
      q: "Is NEET mandatory for admission?",
      a: "Yes, NEET qualification is mandatory for Indian students.",
    },
    {
      q: "Is TSMU approved by NMC & WHO?",
      a: "Yes, TSMU is approved by NMC, WHO, and globally recognized.",
    },
    {
      q: "Is the MBBS course taught in English?",
      a: "Yes, the full curriculum is taught in English for international students.",
    },
    {
      q: "Is Tbilisi safe for students?",
      a: "Yes, Tbilisi is considered one of the safest student cities in Europe.",
    },
  ],

  about: `
Tbilisi State Medical University (TSMU) is the largest and one of the most prestigious medical universities in Georgia. Established in 1918, it has over a century of excellence in medical education and research.

TSMU offers a globally recognized MD (MBBS) program in English, modern simulation labs, and clinical training in major hospitals across Tbilisi. With a strong community of Indian students, high FMGE/NEXT preparation support, safe environment, and globally accredited education — TSMU is one of the most preferred medical universities in Georgia.
`,
};

export default function UniversityTbilisiStateMedical() {
  return <UniversityLayout university={universityData} />;
}
