// import UniversityLayout, {
//   UniversityData,

import UniversityLayout, {
  UniversityData,
} from "@/components/University/UniversityLayout";

// } from "@/components/University/UniversityLayout";
const universityData: UniversityData = {
  name: "The University of Georgia (Tbilisi)",
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
    "/images/universities/University-of-Georgia/university-of-georgia.jpg",
  hero: "/images/universities/University-of-Georgia/20230731VisitMilledgevilleHistoricDay-38_95E70AD1-5056-BF65-D6277A4C7D8187C0-95e70a435056bf6_95e70d99-5056-bf65-d69ef5040af37f50.jpg",
  highlights: [
    { label: "Founded", value: "2005" },
    { label: "Total Students", value: "8000+" },
    { label: "International Students", value: "2500+" },
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
        tuition: 472000,
        hostel: 90000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 2,
        tuition: 472000,
        hostel: 90000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 3,
        tuition: 472000,
        hostel: 90000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 4,
        tuition: 472000,
        hostel: 90000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 5,
        tuition: 472000,
        hostel: 90000,
        insurance: 30000,
        other: 20000,
      },
      {
        year: 6,
        tuition: 472000,
        hostel: 90000,
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
        "Minimum 40% for Reserved category",
        "NEET Qualification Mandatory",
        "Age 17+ at time of admission",
      ],
    },
    {
      title: "Admission Process",
      points: [
        "Apply & Submit Documents",
        "Get Admission Letter",
        "Pay Registration Fees",
        "Receive Visa Invitation",
        "Apply for Visa & Fly to Georgia",
      ],
    },
  ],

  hostelCity: {
    hostel: [
      "Modern Campus in Central Tbilisi",
      "Hostel & Indian Mess Available",
      "High Safety Standard",
    ],
    city: [
      "Clinical Rotations in Top Hospitals",
      "Indian Students Association Support",
      "Safe and Student-Friendly Environment",
    ],
  },

  gallery: [
    "/images/universities/University-of-Georgia/1stDayOrkinHallClass-1.jpg",
    "/images/universities/University-of-Georgia/20220829_MLC_DMK_MARCM_002.jpg",
    "/images/universities/University-of-Georgia/Caucasus-University-Medicine.webp",
    "/images/universities/University-of-Georgia/classroom_2_0.jpg",
    "/images/universities/University-of-Georgia/images.jpeg",
    "/images/universities/University-of-Georgia/logosideimg.jpg",
    "/images/universities/University-of-Georgia/tbilisi-state-medical-university-clinical-skills-centre_tsmucsstudents.jpg.800x600_q85_box-0,0,1536,1024_crop-0,0_detail_upscale.jpg",
    "/images/universities/University-of-Georgia/university.webp",
  ],

  hostelImages: [
    "/images/universities/University-of-Georgia/20220829_MLC_DMK_MARCM_002.jpg",
    "/images/universities/University-of-Georgia/hostel-food.jpeg",
    "/images/universities/University-of-Georgia/university.webp",
  ],

  infraImages: [
    "/images/universities/University-of-Georgia/1stDayOrkinHallClass-1.jpg",
    "/images/universities/University-of-Georgia/20220829_MLC_DMK_MARCM_002.jpg",
    "/images/universities/University-of-Georgia/Caucasus-University-Medicine.webp",
  ],

  faqs: [
    {
      q: "Is NEET qualification required?",
      a: "Yes, Indian students must qualify NEET to pursue MBBS at The University of Georgia.",
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
The University of Georgia (UG) is one of the largest private universities in Tbilisi, known for its advanced medical faculty, modern labs, and international recognition.

UG offers a globally accepted MD program taught fully in English, providing hands-on clinical exposure from early years and excellent FMGE passing support for Indian students.

Strong Indian community, affordable living, and a safe European environment make UG one of the most preferred MBBS destinations.
`,
};

// export default function UniversityGeorgia() {
//   return <UniversityLayout university={UniversityGeorgia} />;
// }
export default function UniversityGeorgia() {
  return <UniversityLayout university={universityData} />;
}
