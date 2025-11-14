// import UniversityLayout, {
//   UniversityData,
// } from "@/components/University/UniversityLayout";

import UniversityLayout, {
  UniversityData,
} from "@/components/University/UniversityLayout";

const universityData: UniversityData = {
  name: "Akaki Tsereteli State University (ATSU)",
  city: "Kutaisi",
  country: "Georgia",

  recognitions: [
    "NMC (National Medical Commission)",
    "WHO (World Health Organization)",
    "WFME Accredited",
    "FAIMER Listed",
    "ECFMG Certified",
  ],

  heroImg: "/images/universities/AkakiTsereteli-StateUniversity/9.webp",
  hero: "/images/universities/AkakiTsereteli-StateUniversity/Akaki-Tsereteli-State-University-scaled.webp",

  highlights: [
    { label: "Founded", value: "1930" },
    { label: "Total Students", value: "20,000+" },
    { label: "International Students", value: "2,500+" },
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
        hostel: 80000,
        insurance: 25000,
        other: 20000,
      },
      {
        year: 2,
        tuition: 450000,
        hostel: 80000,
        insurance: 25000,
        other: 20000,
      },
      {
        year: 3,
        tuition: 450000,
        hostel: 80000,
        insurance: 25000,
        other: 20000,
      },
      {
        year: 4,
        tuition: 450000,
        hostel: 80000,
        insurance: 25000,
        other: 20000,
      },
      {
        year: 5,
        tuition: 450000,
        hostel: 80000,
        insurance: 25000,
        other: 20000,
      },
      {
        year: 6,
        tuition: 450000,
        hostel: 80000,
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
        "Minimum 40% for Reserved category",
        "NEET Qualification Mandatory",
        "Age 17+ at time of admission",
      ],
    },
    {
      title: "Admission Process",
      points: [
        "Fill Application Form & Submit Documents",
        "Receive Admission Letter",
        "Pay Initial Registration Fees",
        "Get Visa Invitation",
        "Apply for Visa & Fly to Georgia",
      ],
    },
  ],

  hostelCity: {
    hostel: [
      "Separate hostels for boys & girls",
      "Indian Mess available nearby",
      "24×7 Security & CCTV",
    ],
    city: [
      "Located in Kutaisi — peaceful student city",
      "Excellent clinical exposure",
      "Affordable living & transport",
    ],
  },

  gallery: [
    "/images/universities/AkakiTsereteli-StateUniversity/4.webp",
    "/images/universities/AkakiTsereteli-StateUniversity/Akaki-Tsereteli-State-University-mobile.webp",
    "/images/universities/AkakiTsereteli-StateUniversity/12.webp",
    "/images/universities/AkakiTsereteli-StateUniversity/11.webp",
    "/images/universities/AkakiTsereteli-StateUniversity/13.webp",
    "/images/universities/AkakiTsereteli-StateUniversity/8.webp",
    "/images/universities/AkakiTsereteli-StateUniversity/7.webp",
    "/images/universities/AkakiTsereteli-StateUniversity/6.webp",

    "/images/universities/AkakiTsereteli-StateUniversity/1.webp",
  ],

  hostelImages: [
    "/images/universities/AkakiTsereteli-StateUniversity/10.webp",
    "/images/universities/AkakiTsereteli-StateUniversity/5.webp",
    "/images/universities/AkakiTsereteli-StateUniversity/2.webp",
  ],

  infraImages: [
    "/images/universities/AkakiTsereteli-StateUniversity/Akaki-Tsereteli-State-University-mobile.webp",
    "/images/universities/AkakiTsereteli-StateUniversity/3.webp",
    "/images/universities/AkakiTsereteli-StateUniversity/8.webp",
  ],

  faqs: [
    {
      q: "Is NEET required for admission?",
      a: "Yes, NEET qualification is mandatory for Indian students.",
    },
    {
      q: "What is the teaching language?",
      a: "The MBBS program is fully taught in English.",
    },
    {
      q: "Is ATSU recognized?",
      a: "Yes, it is recognized by NMC, WHO, WFME, FAIMER, and ECFMG.",
    },
    {
      q: "Is Kutaisi safe for students?",
      a: "Yes, Kutaisi is one of the safest and budget-friendly city for students.",
    },
  ],

  about: `
Akaki Tsereteli State University (ATSU), established in 1930 in Kutaisi, Georgia, 
is one of the oldest government universities in Georgia offering globally-recognized 
medical education. The university is known for strong clinical training, modern labs, 
and affordable tuition fees.

Thousands of Indian students choose ATSU every year for its English-medium MD program, 
NMC compliance, safe campus, and excellent FMGE support. Kutaisi provides a peaceful 
and affordable student lifestyle, making ATSU one of the most preferred medical 
universities in Eastern Europe.
`,
};

export default function UniversityAkakiTsereteliState() {
  return <UniversityLayout university={universityData} />;
}
