"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Phone,
  MessageCircle,
  Download,
  MapPin,
  ChevronRight,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Utilities & Types
// -----------------------------------------------------------------------------

type FeeRow = {
  year: number;
  tuition: number;
  hostel?: number;
  insurance?: number;
  other?: number;
  notes?: string;
};

function computeTotals(rows: FeeRow[]) {
  const base = { tuition: 0, hostel: 0, insurance: 0, other: 0 };
  const out = rows.reduce((acc, r) => {
    acc.tuition += r.tuition || 0;
    acc.hostel += r.hostel || 0;
    acc.insurance += r.insurance || 0;
    acc.other += r.other || 0;
    return acc;
  }, base);
  return {
    ...out,
    grand: out.tuition + out.hostel + out.insurance + out.other,
  };
}

function formatINR(n: number) {
  return Math.round(n).toLocaleString("en-IN");
}

// -----------------------------------------------------------------------------
// Lightweight test cases (console-based) for computeTotals (non-blocking)
// -----------------------------------------------------------------------------
// NOTE: These run once at module load time and do not affect UI rendering.
(function runTests() {
  const rows: FeeRow[] = [
    { year: 1, tuition: 6000, hostel: 1000, insurance: 100, other: 200 },
    { year: 2, tuition: 4000 },
  ];
  const t = computeTotals(rows);
  console.assert(t.tuition === 10000, "Test#1 tuition should be 10000");
  console.assert(t.hostel === 1000, "Test#1 hostel should be 1000");
  console.assert(t.insurance === 100, "Test#1 insurance should be 100");
  console.assert(t.other === 200, "Test#1 other should be 200");
  console.assert(t.grand === 11300, "Test#1 grand should be 11300");

  const rows2: FeeRow[] = [];
  const t2 = computeTotals(rows2);
  console.assert(t2.grand === 0, "Test#2 grand should be 0 for empty rows");
})();

// -----------------------------------------------------------------------------
// Mock Data (replace with Strapi content)
// -----------------------------------------------------------------------------
const MOCK_UNI = {
  name: "Tbilisi State Medical University",
  slug: "tsmu",
  city: "Tbilisi",
  country: "Georgia",
  recognitions: ["WHO", "NMC (India)", "WFME", "EHEA"],
  logo: "", // placeholder
  hero: "/images/gallery/imgi_6_un1.jpg", // placeholder
  highlights: [
    { label: "Established", value: "1918" },
    { label: "Program", value: "MBBS / MD (6 Years)" },
    { label: "Medium", value: "English" },
    { label: "Intakes", value: "Sep / Feb" },
  ],
  fees: {
    currency: "USD" as const,
    rows: [
      {
        year: 1,
        tuition: 6000,
        hostel: 1200,
        insurance: 150,
        other: 200,
        notes: "One-time admission ~ $300",
      },
      { year: 2, tuition: 6000, hostel: 1200, insurance: 150, other: 200 },
      { year: 3, tuition: 6000, hostel: 1200, insurance: 150, other: 200 },
      { year: 4, tuition: 6000, hostel: 1200, insurance: 150, other: 200 },
      { year: 5, tuition: 6000, hostel: 1200, insurance: 150, other: 200 },
      { year: 6, tuition: 6000, hostel: 1200, insurance: 150, other: 200 },
    ] as FeeRow[],
    includes: ["Tuition", "Hostel", "Insurance"],
    excludes: ["Food", "Books", "Airfare", "Visa Fees"],
    fxRate: 83, // indicative INR snapshot
  },
  programStructure: [
    {
      title: "Years 1–2",
      points: [
        "Basic Sciences",
        "Anatomy, Physiology, Biochemistry",
        "Intro to Clinical Skills",
      ],
    },
    {
      title: "Years 3–5",
      points: [
        "Clinical Rotations",
        "Medicine, Surgery, Pediatrics, OBGYN",
        "Electives",
      ],
    },
    { title: "Year 6", points: ["Internship / Clerkship", "Licensing Prep"] },
  ],
  hostelCity: {
    hostel: [
      "On/near-campus hostels with shared rooms",
      "Estimated living costs: $150–250/month (excluding hostel fee)",
      "Indian mess options nearby",
    ],
    city: [
      "Safe, student-friendly capital city",
      "Well-connected public transport",
      "Mild winters, vibrant culture",
    ],
  },
  faqs: [
    {
      q: "Is NEET required?",
      a: "NEET qualification is required for Indian students to practice in India post-graduation.",
    },
    {
      q: "Medium of instruction?",
      a: "Full-time English medium for international students.",
    },
    {
      q: "Intake months?",
      a: "September and February (varies by program/policy).",
    },
  ],
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
export default function UniversityPage() {
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [compare, setCompare] = useState(false);
  const inr = (usd: number) => formatINR(usd * MOCK_UNI.fees.fxRate);

  const feeTotals = useMemo(() => computeTotals(MOCK_UNI.fees.rows), []);

  return (
    <div className=" bg-gray-50 text-slate-900">
      {/* Header */}
      {/* <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
          <img
            src={MOCK_UNI.logo}
            alt={MOCK_UNI.name}
            className="h-10 w-auto"
          />
          <div className="flex-1">
            <h1 className="text-lg font-semibold leading-tight">
              {MOCK_UNI.name}
            </h1>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {MOCK_UNI.city}, {MOCK_UNI.country}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="secondary"
              className="gap-2"
              data-event="phone_click"
            >
              <Phone className="h-4 w-4" /> Call
            </Button>
            <Button className="gap-2" data-event="whatsapp_click">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
            <Button className="gap-2" data-event="apply_now">
              Apply Now
            </Button>
          </div>
        </div>
      </header> */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[400px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://vsourceadmissions.com/images/kenwalker/slider3.png')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            University of Ken Walker International
          </h2>
          <p className="mt-2 text-lg">Trusted by top universities worldwide</p>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-200">
                <img
                  src={MOCK_UNI.hero}
                  alt="Campus"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <div className="flex flex-wrap items-center gap-2">
                    {MOCK_UNI.recognitions.map((r) => (
                      <Badge
                        key={r}
                        variant="secondary"
                        className="bg-red-600 text-white"
                      >
                        {r}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              {/* Highlights */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MOCK_UNI.highlights.map((h) => (
                  <Card key={h.label} className="border-slate-200">
                    <CardContent className="p-4">
                      <p className="text-xs text-slate-500">{h.label}</p>
                      <p className="font-semibold">{h.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            {/* Sidebar Lead Widget */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-24 border-emerald-200">
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold">
                    Book Free Counseling
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Get guidance on eligibility, fees & admissions timeline.
                  </p>
                  <form
                    className="space-y-3"
                    onSubmit={(e) => e.preventDefault()}
                    data-event="lead_submit"
                  >
                    <Input placeholder="Full Name" required />
                    <Input type="tel" placeholder="Phone" required />
                    <Input type="email" placeholder="Email (optional)" />
                    <Select defaultValue="Sep 2025">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Intake" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sep 2025">Sep 2025</SelectItem>
                        <SelectItem value="Feb 2026">Feb 2026</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea placeholder="Questions (optional)" />
                    <Button className="w-full">Request Callback</Button>
                    <p className="text-[11px] text-slate-500">
                      By submitting, you agree to our Privacy Policy.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      {/* Main Tabs */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList className="grid grid-cols-2 sm:grid-cols-7 w-full sm:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="fees">Fees</TabsTrigger>
              <TabsTrigger value="admissions">Admissions</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="student-life">Student Life</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <div className="hidden sm:flex items-center gap-2">
              <label className="text-sm mr-2">Currency</label>
              <div className="inline-flex rounded-full border p-1">
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-3 py-1 text-sm rounded-full ${
                    currency === "USD"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700"
                  }`}
                >
                  USD
                </button>
                <button
                  onClick={() => setCurrency("INR")}
                  className={`px-3 py-1 text-sm rounded-full ${
                    currency === "INR"
                      ? "bg-slate-900 text-white"
                      : "text-slate-700"
                  }`}
                >
                  INR
                </button>
              </div>
            </div>
          </div>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-xl font-semibold">
                    Why choose {MOCK_UNI.name}?
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-emerald-600" />{" "}
                      Government public university with century-long legacy.
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-emerald-600" />{" "}
                      English-medium MD/MBBS track for international students.
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-emerald-600" />{" "}
                      Clinical exposure across teaching hospitals from Year 3.
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-emerald-600" />{" "}
                      Affordable total cost of study; Indian food & community
                      nearby.
                    </li>
                  </ul>

                  <div>
                    <h4 className="font-semibold mb-2">
                      What the University Offers
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Card>
                        <CardContent className="p-4 text-sm">
                          <p className="font-medium">Program Tracks</p>
                          <p className="text-slate-600 mt-1">
                            MD/MBBS (6Y) with pre-clinical + clinical rotations
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-sm">
                          <p className="font-medium">Teaching Hospitals</p>
                          <p className="text-slate-600 mt-1">
                            Affiliated clinics, hands-on rotations, OSCE prep
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-sm">
                          <p className="font-medium">Support</p>
                          <p className="text-slate-600 mt-1">
                            Visa guidance, airport pickup, accommodation
                            onboarding
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Program Structure</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {MOCK_UNI.programStructure.map((s) => (
                        <Card key={s.title}>
                          <CardContent className="p-4">
                            <p className="text-sm font-medium">{s.title}</p>
                            <ul className="mt-2 space-y-1 text-xs text-slate-600">
                              {s.points.map((p) => (
                                <li key={p} className="flex gap-2">
                                  <span className="text-emerald-600">•</span>
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-5">
                  <div>
                    <h4 className="font-semibold">Quick Facts</h4>
                    <div className="mt-3 space-y-2 text-sm">
                      <p>
                        <span className="text-slate-500">City:</span>{" "}
                        {MOCK_UNI.city}
                      </p>
                      <p>
                        <span className="text-slate-500">Intakes:</span> Sep /
                        Feb
                      </p>
                      <p>
                        <span className="text-slate-500">Medium:</span> English
                      </p>
                      <p>
                        <span className="text-slate-500">Duration:</span> 6
                        Years
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold">Why Vsource</h4>
                    <ul className="mt-2 space-y-1 text-sm text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-emerald-600">•</span> End-to-end
                        support: shortlisting → visa → departure
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-600">•</span> Transparent
                        fee guidance & university verification
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-600">•</span> Dedicated
                        counselors & WhatsApp updates
                      </li>
                    </ul>
                  </div>

                  <Button
                    variant="secondary"
                    className="w-full gap-2"
                    data-event="brochure_download"
                  >
                    <Download className="h-4 w-4" /> Download Brochure
                  </Button>

                  <div className="border-t pt-4">
                    <p className="text-xs text-slate-500">Comparing options?</p>
                    <Button
                      className="mt-2 w-full"
                      variant={compare ? "default" : "outline"}
                      onClick={() => setCompare(!compare)}
                      data-event="compare_use"
                    >
                      {compare ? "Added to Compare" : "Add to Compare"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FEES */}
          <TabsContent value="fees" className="mt-6">
            <Card>
              <CardContent className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left">Year</th>
                        <th className="px-4 py-3 text-left">Tuition</th>
                        <th className="px-4 py-3 text-left">Hostel</th>
                        <th className="px-4 py-3 text-left">Insurance</th>
                        <th className="px-4 py-3 text-left">Other</th>
                        <th className="px-4 py-3 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_UNI.fees.rows.map((r) => (
                        <tr
                          key={r.year}
                          className="odd:bg-white even:bg-slate-50"
                        >
                          <td className="px-4 py-3 font-medium">
                            Year {r.year}
                          </td>
                          <td className="px-4 py-3">
                            {currency === "USD"
                              ? `$${r.tuition.toLocaleString()}`
                              : `₹${inr(r.tuition)}`}
                          </td>
                          <td className="px-4 py-3">
                            {currency === "USD"
                              ? `$${(r.hostel || 0).toLocaleString()}`
                              : `₹${inr(r.hostel || 0)}`}
                          </td>
                          <td className="px-4 py-3">
                            {currency === "USD"
                              ? `$${(r.insurance || 0).toLocaleString()}`
                              : `₹${inr(r.insurance || 0)}`}
                          </td>
                          <td className="px-4 py-3">
                            {currency === "USD"
                              ? `$${(r.other || 0).toLocaleString()}`
                              : `₹${inr(r.other || 0)}`}
                          </td>
                          <td className="px-4 py-3 text-slate-500">
                            {r.notes || "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-100 font-semibold">
                        <td className="px-4 py-3">Total</td>
                        <td className="px-4 py-3">
                          {currency === "USD"
                            ? `$${feeTotals.tuition.toLocaleString()}`
                            : `₹${inr(feeTotals.tuition)}`}
                        </td>
                        <td className="px-4 py-3">
                          {currency === "USD"
                            ? `$${feeTotals.hostel.toLocaleString()}`
                            : `₹${inr(feeTotals.hostel)}`}
                        </td>
                        <td className="px-4 py-3">
                          {currency === "USD"
                            ? `$${feeTotals.insurance.toLocaleString()}`
                            : `₹${inr(feeTotals.insurance)}`}
                        </td>
                        <td className="px-4 py-3">
                          {currency === "USD"
                            ? `$${feeTotals.other.toLocaleString()}`
                            : `₹${inr(feeTotals.other)}`}
                        </td>
                        <td className="px-4 py-3">
                          Grand:{" "}
                          {currency === "USD"
                            ? `$${feeTotals.grand.toLocaleString()}`
                            : `₹${inr(feeTotals.grand)}`}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border-t">
                  <div>
                    <h4 className="font-semibold mb-2">Includes</h4>
                    <ul className="text-sm text-emerald-700 space-y-1">
                      {MOCK_UNI.fees.includes.map((i) => (
                        <li key={i} className="flex gap-2">
                          <Check className="h-4 w-4" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Excludes</h4>
                    <ul className="text-sm text-rose-700 space-y-1">
                      {MOCK_UNI.fees.excludes.map((i) => (
                        <li key={i} className="flex gap-2">
                          <span>•</span>
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t">
                  <p className="text-xs text-slate-500">
                    * INR amounts are indicative at ₹
                    {MOCK_UNI.fees.fxRate.toLocaleString("en-IN")} per $ and may
                    vary. Always confirm latest fee policy with the university.
                  </p>
                  <Button
                    variant="outline"
                    className="gap-2"
                    data-event="fee_export"
                  >
                    <Download className="h-4 w-4" /> Export as CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ADMISSIONS */}
          <TabsContent value="admissions" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardContent className="p-6">
                  <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        t: "Eligibility Review",
                        d: "Share 12th PCB%, NEET status, passport.",
                      },
                      {
                        t: "Document Prep",
                        d: "10th/12th marksheets, passport, photos, NEET (if applicable).",
                      },
                      {
                        t: "Application Submit",
                        d: "University form + initial processing fees.",
                      },
                      {
                        t: "Offer & Invitation",
                        d: "Receive conditional offer & invitation letter.",
                      },
                      {
                        t: "Visa",
                        d: "File submission, biometrics, approval.",
                      },
                      {
                        t: "Travel & Enrollment",
                        d: "Fly to Tbilisi, hostel check-in, campus registration.",
                      },
                    ].map((s, i) => (
                      <li key={i} className="rounded-xl border bg-white p-4">
                        <p className="text-sm font-medium">
                          {i + 1}. {s.t}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">{s.d}</p>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button className="gap-2" data-event="appointment_request">
                      Book Counseling <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" /> Download Checklist
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Mini Eligibility Check</h4>
                  <form
                    className="space-y-3"
                    onSubmit={(e) => e.preventDefault()}
                    data-event="eligibility_check_complete"
                  >
                    <Input type="number" placeholder="12th PCB % (e.g., 60)" />
                    <Select defaultValue="Qualified">
                      <SelectTrigger>
                        <SelectValue placeholder="NEET Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Qualified">
                          NEET Qualified
                        </SelectItem>
                        <SelectItem value="Not Qualified">
                          NEET Not Qualified
                        </SelectItem>
                        <SelectItem value="NA">Not Applicable</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full">Check</Button>
                    <p className="text-xs text-slate-500">
                      A counselor will verify and advise next steps.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ELIGIBILITY */}
          <TabsContent value="eligibility" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">
                      Eligibility Criteria (Indicative)
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-emerald-600">•</span> Age 17+ at
                        time of admission.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-600">•</span> 12th grade
                        with Physics, Chemistry, Biology; ≥ 50% aggregate (GEN)
                        / per regulatory norms.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-600">•</span> NEET
                        qualification as applicable for practice in India.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Documents Required</h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex gap-2">
                        <span className="text-emerald-600">•</span> Passport,
                        photos.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-600">•</span> 10th & 12th
                        marksheets/certificates.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-600">•</span> NEET
                        scorecard (if applicable), medical fitness certificate.
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  * Criteria may vary; final decision rests with the university
                  and regulators. Always verify the latest circulars.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* STUDENT LIFE */}
          <TabsContent value="student-life" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3">Hostel Facility</h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span> Shared rooms;
                      limited single occupancy.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span> Estimated
                      living costs $150–250/mo (excl. hostel fee).
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span> Indian mess &
                      vegetarian options near campus.
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3">
                    University Infrastructure & Campus
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span> Lecture halls,
                      labs, simulation centers.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span> Affiliated
                      hospitals for clinical rotations.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span> Library &
                      research access; student clubs.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FAQS */}
          <TabsContent value="faqs" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <Accordion type="single" collapsible>
                  {[
                    {
                      q: "Is NEET required?",
                      a: "For Indian students planning to practice in India, NEET qualification is required as per current regulations.",
                    },
                    {
                      q: "What is the annual tuition?",
                      a: "Indicative tuition is ~$6,000 per year; verify latest circulars before applying.",
                    },
                    {
                      q: "Is instruction in English?",
                      a: "Yes, full-time English-medium track for international students.",
                    },
                    {
                      q: "Are hostels on campus?",
                      a: "University-arranged hostels and nearby apartments are common; availability varies by intake.",
                    },
                    {
                      q: "When are the intakes?",
                      a: "Typically September and February; seats and programs may vary.",
                    },
                  ].map((f, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="px-4 py-3 text-left">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 text-sm text-slate-700">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GALLERY */}
          <TabsContent value="gallery" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "/images/gallery/imgi_6_un1.jpg",
                    "/images/gallery/imgi_7_un2.jpg",
                    "/images/gallery/imgi_8_un33.jpg",
                    "/images/gallery/imgi_9_un4.jpg",
                    "/images/gallery/imgi_10_un55.jpg",
                    "/images/gallery/imgi_11_un6.jpg",
                    "/images/gallery/imgi_12_un7.jpg",
                    "/images/gallery/imgi_13_un8.jpg",
                    "/images/gallery/imgi_14_un9.jpg",
                    "/images/gallery/imgi_15_un10.jpg",
                    "/images/gallery/imgi_16_un11.jpg",
                    "/images/gallery/imgi_17_un133.jpg",
                  ].map((i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] overflow-hidden rounded-lg bg-slate-200"
                    >
                      <img
                        src={i}
                        alt={`TSMU campus ${i}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ABOUT */}
          <TabsContent value="about" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-3">
                <h4 className="font-semibold">About {MOCK_UNI.name}</h4>
                <p className="text-sm text-slate-700">
                  Founded in 1918, {MOCK_UNI.name} is a leading public medical
                  university in Georgia with strong emphasis on clinical
                  teaching and research. The international MD/MBBS program is
                  delivered in English, with clinical training at affiliated
                  hospitals in and around Tbilisi.
                </p>
                <p className="text-xs text-slate-500">
                  * This is a concise summary for quick scanning. Full
                  institutional details can be provided in an extended article
                  or downloadable brochure.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white p-3 flex items-center justify-between md:hidden">
        <Button variant="secondary" className="gap-2" data-event="phone_click">
          <Phone className="h-4 w-4" /> Call
        </Button>
        <Button className="gap-2" data-event="whatsapp_click">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </Button>
        <Button className="gap-2" data-event="apply_now">
          Apply
        </Button>
      </div>

      {/* Footer mini */}
      <footer className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-slate-500">
          © {new Date().getFullYear()} Vsource Admissions • Fees subject to
          change by university. Verify latest policy before applying.
        </div>
      </footer>
    </div>
  );
}
