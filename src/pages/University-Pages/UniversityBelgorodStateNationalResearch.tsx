import UniversityLayout, {
  UniversityData,
} from "@/components/University/UniversityLayout";

const universityData: UniversityData = {
  name: "Belgorod State National Research University",
  city: "Belgorod",
  country: "Russia",

  recognitions: [
    "NMC (National Medical Commission)",
    "WHO (World Health Organization)",
    "WFME Accredited",
    "FAIMER Listed",
    "ECFMG Certified",
  ],

  heroImg:
    "/images/universities/Belgorod-State-NationalResearch-University/1.webp",
  hero: "/images/universities/Belgorod-State-NationalResearch-University/3.webp",

  highlights: [
    { label: "Founded", value: "1876" },
    { label: "Total Students", value: "25,000+" },
    { label: "International Students", value: "3,000+" },
    { label: "Program Duration", value: "6 Years" },
    { label: "Teaching Language", value: "English / Russian" },
    { label: "Degree Awarded", value: "M.D (Equivalent to MBBS)" },
  ],

  fees: {
    currency: "USD",
    fxRates: {
      USD: 1,
      RUB: 93, // Approx conversion
      INR: 83,
    },
    includes: ["Tuition Fee", "Hostel Fee", "Medical Insurance"],
    excludes: [
      "Food expenses",
      "Airfare",
      "Visa charges",
      "Books & personal expenses",
    ],
    rows: [
      { year: 1, tuition: 4000, hostel: 800, insurance: 200, other: 200 },
      { year: 2, tuition: 4000, hostel: 800, insurance: 200, other: 200 },
      { year: 3, tuition: 4000, hostel: 800, insurance: 200, other: 200 },
      { year: 4, tuition: 4000, hostel: 800, insurance: 200, other: 200 },
      { year: 5, tuition: 4000, hostel: 800, insurance: 200, other: 200 },
      { year: 6, tuition: 4000, hostel: 800, insurance: 200, other: 200 },
    ],
  },

  programStructure: [
    {
      title: "Admission Requirements",
      points: [
        "50% in PCB in 12th grade (General Category)",
        "40% for Reserved Category",
        "NEET Qualification Mandatory",
        "Minimum age 17 years",
      ],
    },
    {
      title: "Admission Process",
      points: [
        "Submit Application & Documents",
        "Receive Admission Confirmation",
        "Pay Registration Fee",
        "Receive Invitation Letter",
        "Apply for Student Visa",
        "Fly to Russia & Join Classes",
      ],
    },
  ],

  hostelCity: {
    hostel: [
      "Fully furnished dorms",
      "Indian mess available nearby",
      "Laundry & Wi-Fi facilities",
      "24×7 campus security",
    ],
    city: [
      "Belgorod — a peaceful and affordable city near Moscow",
      "Excellent transport facilities",
      "Cold climate — prepare winter clothing",
      "Large Indian student community",
    ],
  },

  gallery: [
    "/images/universities/Belgorod-State-NationalResearch-University/1.webp",
    "/images/universities/Belgorod-State-NationalResearch-University/3.webp",
    "/images/universities/Belgorod-State-NationalResearch-University/Belgorod-State-National-Research-University-mobile.jpg",
    "/images/universities/Belgorod-State-NationalResearch-University/2.webp",
    "/images/universities/Belgorod-State-NationalResearch-University/4.jpg",
    "/images/universities/Belgorod-State-NationalResearch-University/5.jpeg",
    "/images/universities/Belgorod-State-NationalResearch-University/9.jpg",
    "/images/universities/Belgorod-State-NationalResearch-University/7.jpg",
  ],

  hostelImages: [
    "/images/universities/Belgorod-State-NationalResearch-University/4.jpg",
    "/images/universities/Belgorod-State-NationalResearch-University/5.jpeg",
    "/images/universities/Belgorod-State-NationalResearch-University/6.jpg",
  ],

  infraImages: [
    "/images/universities/Belgorod-State-NationalResearch-University/9.jpg",
    "/images/universities/Belgorod-State-NationalResearch-University/2.webp",
    "/images/universities/Belgorod-State-NationalResearch-University/7.jpg",
  ],

  faqs: [
    {
      q: "Is NEET mandatory for admission?",
      a: "Yes, NEET qualification is mandatory for Indian students.",
    },
    {
      q: "Is the MBBS program taught in English?",
      a: "Yes, the medical course is available in English.",
    },
    {
      q: "Is the university approved by NMC?",
      a: "Yes, it is approved by NMC & WHO.",
    },
    {
      q: "How is the student environment in Belgorod?",
      a: "Safe, peaceful, and student-friendly with good facilities.",
    },
  ],

  about: `
Belgorod State National Research University, also known as BelSU, is one of Russia’s 
oldest and most prestigious medical universities. Founded in 1876, it is recognized 
globally for high-quality medical education, modern infrastructure, and a strong research 
environment.

BelSU offers a fully English-medium MBBS program with excellent laboratory and clinical 
facilities. The campus houses thousands of international students, including many from 
India. Affordable tuition fees, world-class teaching, and strong FMGE/NEXT support make 
Belgorod State University a preferred choice for medical aspirants.
`,
};

export default function UniversityBelgorodStateNationalResearch() {
  return <UniversityLayout university={universityData} />;
}
