import { Check, Dot, DotSquare, MailCheck } from "lucide-react";
import React, { useMemo, useState } from "react";

export type FeeRow = {
  year: number;
  tuition: number;
  hostel?: number;
  insurance?: number;
  other?: number;
  notes?: string;
};

export type UniversityData = {
  name: string;
  city: string;
  country: string;
  recognitions: string[];
  hero: string;
  highlights: { label: string; value: string }[];
  fees: {
    currency: "USD" | "INR";
    rows: FeeRow[];
    fxRate: number;
    includes: string[];
    excludes: string[];
  };
  programStructure: { title: string; points: string[] }[];
  hostelCity: { hostel: string[]; city: string[] };
  faqs: { q: string; a: string }[];
  gallery: string[];
  about: string;
  hostelImages: string[];
  infraImages: string[];
};

type Props = {
  university: UniversityData;
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

const TABS = [
  "Overview",
  "Fees",
  "Admissions",
  "Eligibility",
  "Student Life",
  "Gallery",
  "About",
];

export default function UniversityLayout({ university }: Props) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [currency, setCurrency] = useState<"USD" | "INR">(
    university.fees.currency
  );
  const inr = (usd: number) => formatINR(usd * university.fees.fxRate);
  const feeTotals = useMemo(
    () => computeTotals(university.fees.rows),
    [university]
  );

  // SIDEBAR FORM (right on desktop, under highlights on mobile)
  const Form = (
    <div className="sticky top-24  rounded-xl  bg-white p-5 shadow">
      <h3 className="text-lg font-semibold mb-2">Book Free Counseling</h3>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="border p-2 rounded"
          placeholder="Full Name"
          required
        />
        <input
          className="border p-2 rounded"
          type="tel"
          placeholder="Phone"
          required
        />
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="Email (optional)"
        />
        <select className="border p-2 rounded" defaultValue="Sep 2025">
          <option>Sep 2025</option>
          <option>Feb 2026</option>
        </select>
        <textarea
          className="border p-2 rounded"
          placeholder="Questions (optional)"
        />
        <button
          type="submit"
          className="w-full rounded bg-red-600 text-white py-2 font-medium"
        >
          Request Callback
        </button>
        <p className="text-xs text-slate-500 mt-1">
          By submitting, you agree to our Privacy Policy.
        </p>
      </form>
    </div>
  );

  // --- TAB CONTENTS ---
  const renderOverview = () => (
    <div>
      <h3 className="text-xl font-semibold mb-3">
        Why choose {university.name}?
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        {university.highlights.map((h) => (
          <li key={h.label} className="flex gap-2 items-center">
            <span className="text-emerald-600">•</span>
            {h.label}: {h.value}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <h4 className="font-semibold mb-2">Program Structure</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {university.programStructure.map((s) => (
            <div className="rounded border p-4 bg-white" key={s.title}>
              <p className="text-sm font-medium">{s.title}</p>
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-emerald-600">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFees = () => (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm mt-2 border shadow rounded">
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
            {university.fees.rows.map((r) => (
              <tr key={r.year} className="odd:bg-white even:bg-slate-50">
                <td className="px-4 py-3 font-medium">Year {r.year}</td>
                <td className="px-4 py-3">
                  {currency === "USD" ? `$${r.tuition}` : `₹${inr(r.tuition)}`}
                </td>
                <td className="px-4 py-3">
                  {currency === "USD"
                    ? `$${r.hostel}`
                    : `₹${inr(r.hostel || 0)}`}
                </td>
                <td className="px-4 py-3">
                  {currency === "USD"
                    ? `$${r.insurance}`
                    : `₹${inr(r.insurance || 0)}`}
                </td>
                <td className="px-4 py-3">
                  {currency === "USD" ? `$${r.other}` : `₹${inr(r.other || 0)}`}
                </td>
                <td className="px-4 py-3 text-slate-500">{r.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-semibold">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3">
                {currency === "USD"
                  ? `$${feeTotals.tuition}`
                  : `₹${inr(feeTotals.tuition)}`}
              </td>
              <td className="px-4 py-3">
                {currency === "USD"
                  ? `$${feeTotals.hostel}`
                  : `₹${inr(feeTotals.hostel)}`}
              </td>
              <td className="px-4 py-3">
                {currency === "USD"
                  ? `$${feeTotals.insurance}`
                  : `₹${inr(feeTotals.insurance)}`}
              </td>
              <td className="px-4 py-3">
                {currency === "USD"
                  ? `$${feeTotals.other}`
                  : `₹${inr(feeTotals.other)}`}
              </td>
              <td className="px-4 py-3">
                Grand:{" "}
                {currency === "USD"
                  ? `$${feeTotals.grand}`
                  : `₹${inr(feeTotals.grand)}`}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-1">Includes</h4>
          <ul className="text-sm text-emerald-700">
            {university.fees.includes.map((i) => (
              <li key={i} className="flex gap-2 items-center">
                <span>
                  <Check className="h-4 w-4" />
                </span>
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Excludes</h4>
          <ul className="text-sm text-red-600">
            {university.fees.excludes.map((i) => (
              <li key={i} className="flex gap-2 items-center">
                <span>
                  <Dot className="h-4 w-4 text-red-600" />
                </span>
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-xs text-slate-500 mt-3">
        * INR amounts are indicative at ₹{university.fees.fxRate} per $ and may
        vary.
      </div>
    </div>
  );

  const renderAdmissions = () => (
    <div>
      <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            t: "Eligibility Review",
            d: "Share 12th PCB%, NEET status, passport.",
          },
          {
            t: "Document Prep",
            d: "10th/12th marksheets, passport, photos, NEET.",
          },
          {
            t: "Application Submit",
            d: "University form + initial processing fees.",
          },
          {
            t: "Offer & Invitation",
            d: "Conditional offer & invitation letter.",
          },
          { t: "Visa", d: "File submission, biometrics, approval." },
          {
            t: "Travel & Enrollment",
            d: "Fly to campus, hostel check-in, registration.",
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
    </div>
  );

  const renderEligibility = () => (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2">
            Eligibility Criteria (Indicative)
          </h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span> Age 17+ at admission.
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span> 12th with Physics,
              Chemistry, Biology; ≥ 50% (GEN).
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span> NEET qualification as
              applicable for India.
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Documents Required</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span> Passport, photos.
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span> 10th & 12th
              marksheets.
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span> NEET scorecard &
              medical certificate.
            </li>
          </ul>
        </div>
      </div>
      <div className="text-xs text-slate-500 mt-4">
        * Criteria may vary; final authority is the university and regulator.
      </div>
    </div>
  );

  const renderStudentLife = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded border p-4 bg-white">
        <h4 className="font-semibold mb-3">Hostel Facility</h4>
        <ul className="space-y-2 text-sm text-slate-700 mb-4">
          {university.hostelCity.hostel.map((str) => (
            <li className="flex gap-2" key={str}>
              <span className="text-emerald-600">•</span>
              {str}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-2">
          {university.hostelImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Hostel"
              className="w-full rounded h-24 object-cover"
            />
          ))}
        </div>
      </div>
      <div className="rounded border p-4 bg-white">
        <h4 className="font-semibold mb-3">
          University Infrastructure & Campus
        </h4>
        <ul className="space-y-2 text-sm text-slate-700 mb-4">
          {university.hostelCity.city.map((str) => (
            <li className="flex gap-2" key={str}>
              <span className="text-emerald-600">•</span>
              {str}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-2">
          {university.infraImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Campus"
              className="w-full rounded h-24 object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {university.gallery.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`gallery-${i}`}
          className="rounded-lg w-full h-28 object-cover"
        />
      ))}
    </div>
  );

  const renderAbout = () => (
    <div className="rounded border p-6 bg-white">
      <h4 className="font-semibold mb-2">About {university.name}</h4>
      <p className="text-sm text-slate-700">{university.about}</p>
    </div>
  );

  // ---- THE LAYOUT ----
  return (
    <div className="bg-gray-50 text-slate-900 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[320px] sm:h-[400px] flex items-center justify-center"
        style={{ backgroundImage: `url('${university.hero}')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white max-w-screen-sm px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {university.name}
          </h2>
          <p className="mt-2 text-base md:text-lg">
            {university.city}, {university.country}
          </p>
        </div>
      </section>
      {/* Highlights, Main Image, Sidebar Form */}
      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-200">
                <img
                  src={university.hero}
                  alt="University campus"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <div className="flex flex-wrap items-center gap-2">
                    {university.recognitions.map((r) => (
                      <span
                        key={r}
                        className="rounded bg-red-600 text-xs px-2 py-1"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {university.highlights.map((h) => (
                  <div
                    key={h.label}
                    className="rounded-lg border p-4 border-slate-200 bg-white flex flex-col items-start"
                  >
                    <span className="text-xs text-slate-500">{h.label}</span>
                    <span className="font-semibold">{h.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Sticky Sidebar Form */}
            <aside className="lg:col-span-1">{Form}</aside>
          </div>
        </div>
      </section>
      {/* Main Tabs section */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4 overflow-x-auto gap-2">
            <div className="flex gap-2 sm:gap-4 whitespace-nowrap">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded font-medium text-sm border
                    ${
                      activeTab === tab
                        ? "bg-red-600 text-white "
                        : "bg-white  text-slate-800"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <label className="text-sm mr-2">Currency</label>
              <div className="inline-flex rounded-full border border-red-600 p-1">
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-3 py-1 text-sm rounded-full ${
                    currency === "USD"
                      ? "bg-red-600 text-white"
                      : "text-slate-700"
                  }`}
                >
                  USD
                </button>
                <button
                  onClick={() => setCurrency("INR")}
                  className={`px-3 py-1 text-sm rounded-full ${
                    currency === "INR"
                      ? "bg-red-600 text-white"
                      : "text-slate-700"
                  }`}
                >
                  INR
                </button>
              </div>
            </div>
          </div>
          {/* Tabs Content */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            {activeTab === "Overview" && renderOverview()}
            {activeTab === "Fees" && renderFees()}
            {activeTab === "Admissions" && renderAdmissions()}
            {activeTab === "Eligibility" && renderEligibility()}
            {activeTab === "Student Life" && renderStudentLife()}
            {activeTab === "Gallery" && renderGallery()}
            {activeTab === "About" && renderAbout()}
          </div>
        </div>
      </section>
    </div>
  );
}
