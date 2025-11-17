import axios from "axios";
import { Check, Dot, X } from "lucide-react";
import React, { memo, useMemo, useState } from "react";
import { toast } from "sonner";
import { FeeRow, University } from "./University";

type Props = {
  university: University;
};

function computeTotals(rows: FeeRow[]) {
  const base = { tuition: 0, hostel: 0, insurance: 0, other: 0 };
  const out = rows.reduce((acc, r) => {
    acc.tuition += Number(r.tuition) || 0;
    acc.hostel += Number(r.hostel) || 0;
    acc.insurance += Number(r.insurance) || 0;
    acc.other += Number(r.other) || 0;
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

function formatNumber(n: number, decimals = 2) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const TABS = [
  "Overview",
  "Fees",
  "Admissions",
  "Eligibility",
  "Student Life",
  "Gallery",
  "About",
] as const;

function UniversityLayout({ university }: Props) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Overview");
  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState<string | null>(null);
  const [studentLifeImage, setStudentLifeImage] = useState<string | null>(null);
  const [currency, setCurrency] = useState<"INR" | "USD" | "GEL" | "RUB">(
    "INR"
  );
  const [feeViewMode, setFeeViewMode] = useState<"year" | "semester">("year");

  const fxRates = useMemo(() => {
    const rates = university?.fees;
    return {
      INR: 1,
      USD: rates?.USD ?? 0.012,
      GEL: rates?.GEL ?? 0.034,
      RUB: rates?.RUB ?? 1.08,
    } as Record<string, number>;
  }, [university]);

  const convert = (amountInBase: number) => {
    if (!Number.isFinite(amountInBase)) return 0;
    const mult = fxRates[currency] ?? 1;
    return amountInBase * mult;
  };

  const symbolFor = (c: string) => {
    switch (c) {
      case "INR":
        return "₹";
      case "USD":
        return "$";
      case "GEL":
        return "₾";
      case "RUB":
        return "₽";
      default:
        return "";
    }
  };

  const fmt = (amountInBase: number) => {
    if (currency === "INR") {
      return `${symbolFor(currency)}${formatINR(convert(amountInBase))}`;
    }
    return `${symbolFor(currency)}${formatNumber(convert(amountInBase), 2)}`;
  };

  const rows = university?.fees?.fees_details || [];

  const yearsMap = useMemo(() => {
    const map = new Map<number, FeeRow[]>();
    const yearlyOnly: Record<number, FeeRow | undefined> = {};

    rows.forEach((r) => {
      const yearNum = Number(r.year);
      if (r.semester) {
        if (!map.has(yearNum)) map.set(yearNum, []);
        map.get(yearNum)!.push(r);
      } else {
        yearlyOnly[yearNum] = r;
      }
    });

    const yearsSet = new Set<number>([
      ...Array.from(map.keys()),
      ...Object.keys(yearlyOnly).map(Number),
    ]);

    yearsSet.forEach((y) => {
      const existing = map.get(y) ?? [];
      if (existing.length === 0) {
        const yr = yearlyOnly[y];
        if (yr) {
          const half = (v?: string) => (v ? Number(v) / 2 : 0);
          const sem1: FeeRow = {
            year: y,
            semester: "Semester 1",
            tuition: String(half(yr.tuition)),
            hostel: yr.hostel ? String(half(yr.hostel)) : undefined,
            insurance: yr.insurance ? String(half(yr.insurance)) : undefined,
            other: yr.other ? String(half(yr.other)) : undefined,
            notes: yr.notes,
          };
          const sem2: FeeRow = {
            year: y,
            semester: "Semester 2",
            tuition: String(half(yr.tuition)),
            hostel: yr.hostel ? String(half(yr.hostel)) : undefined,
            insurance: yr.insurance ? String(half(yr.insurance)) : undefined,
            other: yr.other ? String(half(yr.other)) : undefined,
          };
          map.set(y, [sem1, sem2]);
        }
      }
    });

    return map;
  }, [rows]);

  const semesterRowsFlattened = useMemo(() => {
    const years = Array.from(yearsMap.keys()).sort((a, b) => a - b);
    const output: FeeRow[] = [];
    years.forEach((y) => {
      const sems = yearsMap.get(y) || [];
      const sorted = sems.slice().sort((a, b) => {
        const sa = (a.semester || "").toLowerCase();
        const sb = (b.semester || "").toLowerCase();
        if (sa.includes("1") && sb.includes("2")) return -1;
        if (sa.includes("2") && sb.includes("1")) return 1;
        return 0;
      });
      sorted.forEach((s) => output.push(s));
    });
    return output;
  }, [yearsMap]);

  const yearRows = useMemo(() => {
    const years = Array.from(yearsMap.keys()).sort((a, b) => a - b);
    return years.map((y) => {
      const sems = yearsMap.get(y) || [];
      const totalsBase = computeTotals(sems);
      return { year: y, semesters: sems, totalsBase };
    });
  }, [yearsMap]);

  const overallTotalsBase = computeTotals(
    rows.length ? rows : semesterRowsFlattened
  );

  const [uniName, setUniName] = useState("");
  const [uniPhone, setUniPhone] = useState("");
  const [uniService, setUniService] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const services = ["Masters in abroad", "Education Loan Guidance"];

  const handleSidebarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (uniPhone.length < 10 || uniName.trim().length === 0) {
      toast.error("Please enter your name and valid phone number.");
      return;
    }
    if (!/^\d{10}$/.test(uniPhone)) {
      toast.error("Enter a valid 10-digit phone number.");
      return;
    }
    setLoading(true);
    const payload = {
      data: {
        student_name: uniName,
        number: uniPhone,
        service_required: uniService,
      },
    };
    try {
      const { status } = await axios.post(
        `${import.meta.env.VITE_CMS_GLOBALURL}/api/fintech-enquires`,
        payload
      );
      if (status === 200 || status === 201) {
        toast.success("Submitted successfully!");
        setUniName("");
        setUniPhone("");
        setUniService("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  const Form = (
    <div className="sticky top-24 rounded-xl bg-white p-5 shadow">
      <h3 className="text-lg font-semibold mb-2">Book Free Counseling</h3>
      <form className="flex flex-col gap-3" onSubmit={handleSidebarSubmit}>
        <input
          className="border p-2 rounded"
          placeholder="Full Name"
          value={uniName}
          onChange={(e) => setUniName(e.target.value)}
          required
        />
        <div className="flex border rounded overflow-hidden">
          <div className="bg-gray-100 text-gray-700 px-3 flex items-center border-r">
            +91
          </div>
          <input
            className="p-2 w-full outline-none"
            type="tel"
            placeholder="Phone Number"
            value={uniPhone}
            onChange={(e) =>
              setUniPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            required
            maxLength={10}
          />
        </div>
        <div className="relative">
          <div
            className="border rounded p-2 cursor-pointer bg-white flex justify-between items-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>{uniService || "Select Service Required"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {showDropdown && (
            <div className="absolute bg-white w-full border rounded shadow-md z-10">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setUniService(s);
                    setShowDropdown(false);
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-red-600 text-white py-2 font-medium"
        >
          {loading ? "Submitting..." : "Request Callback"}
        </button>
        <p className="text-xs text-slate-500 mt-1">
          By submitting, you agree to our Privacy Policy.
        </p>
      </form>
    </div>
  );

  const renderOverview = () => (
    <div>
      <h3 className="text-xl font-semibold mb-3">
        Why choose {university?.name}?
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        {university?.highlights?.map((h, i) => (
          <li key={h?.id || i} className="flex gap-2 items-center">
            <span className="text-emerald-600">•</span>
            {h?.label}: {h?.value}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <h4 className="font-semibold mb-2">Program Structure</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded border p-4 bg-white">
            <p className="text-sm font-medium">Admission Requirements</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-600">
              {university?.admission_requirements?.map((p, i) => (
                <li key={p?.id || i} className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  {p?.lists}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded border p-4 bg-white">
            <p className="text-sm font-medium">Admission Process</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-600">
              {university?.admission_process?.map((p, i) => (
                <li key={p?.id || i} className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  {p?.lists}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFees = () => (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-700">View:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFeeViewMode("year")}
              className={`px-3 py-1 rounded text-sm border ${
                feeViewMode === "year"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-slate-800 border-slate-300 hover:bg-slate-100"
              }`}
            >
              Year
            </button>
            <button
              onClick={() => setFeeViewMode("semester")}
              className={`px-3 py-1 rounded text-sm border ${
                feeViewMode === "semester"
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-slate-800 border-slate-300 hover:bg-slate-100"
              }`}
            >
              Semester
            </button>
          </div>
        </div>
        <div className="text-sm text-slate-600">
          Showing amounts in: <strong>{currency}</strong>
        </div>
      </div>

      {feeViewMode === "year" && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm mt-2 border shadow rounded">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">Year</th>
                <th className="px-4 py-3 text-left">Semester</th>
                <th className="px-4 py-3 text-left">Tuition</th>
                <th className="px-4 py-3 text-left">Hostel</th>
                <th className="px-4 py-3 text-left">Insurance</th>
                <th className="px-4 py-3 text-left">Other</th>
                <th className="px-4 py-3 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {yearRows.map(({ year, semesters, totalsBase }) => (
                <React.Fragment key={year}>
                  <tr className="bg-slate-50 font-semibold">
                    <td className="px-4 py-3">Year {year}</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">{fmt(totalsBase?.tuition)}</td>
                    <td className="px-4 py-3">{fmt(totalsBase?.hostel)}</td>
                    <td className="px-4 py-3">{fmt(totalsBase?.insurance)}</td>
                    <td className="px-4 py-3">{fmt(totalsBase?.other)}</td>
                    <td className="px-4 py-3">Year total</td>
                  </tr>
                  {semesters.map((s, i) => (
                    <tr key={i} className="odd:bg-white even:bg-slate-50">
                      <td className="px-4 py-3"></td>
                      <td className="px-4 py-3">
                        {s?.semester ?? `Semester ${i + 1}`}
                      </td>
                      <td className="px-4 py-3">{fmt(Number(s?.tuition))}</td>
                      <td className="px-4 py-3">
                        {s?.hostel ? fmt(Number(s?.hostel)) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        ?{s?.insurance ? fmt(Number(s?.insurance)) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        {s?.other ? fmt(Number(s?.other)) : "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {s?.notes || "—"}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-semibold">
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3">{fmt(overallTotalsBase?.tuition)}</td>
                <td className="px-4 py-3">{fmt(overallTotalsBase?.hostel)}</td>
                <td className="px-4 py-3">
                  {fmt(overallTotalsBase?.insurance)}
                </td>
                <td className="px-4 py-3">{fmt(overallTotalsBase?.other)}</td>
                <td className="px-4 py-3">
                  Grand: {fmt(overallTotalsBase?.grand)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {feeViewMode === "semester" && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm mt-2 border shadow rounded">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">Year</th>
                <th className="px-4 py-3 text-left">Semester</th>
                <th className="px-4 py-3 text-left">Tuition</th>
                <th className="px-4 py-3 text-left">Hostel</th>
                <th className="px-4 py-3 text-left">Insurance</th>
                <th className="px-4 py-3 text-left">Other</th>
                <th className="px-4 py-3 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {semesterRowsFlattened?.map((r, i) => (
                <tr key={i} className="odd:bg-white even:bg-slate-50">
                  <td className="px-4 py-3 font-medium">Year {r?.year}</td>
                  <td className="px-4 py-3">{r?.semester ?? "—"}</td>
                  <td className="px-4 py-3">{fmt(Number(r.tuition))}</td>
                  <td className="px-4 py-3">
                    {r?.hostel ? fmt(Number(r?.hostel)) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {r?.insurance ? fmt(Number(r?.insurance)) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {r?.other ? fmt(Number(r?.other)) : "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {r?.notes || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-semibold">
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3">{fmt(overallTotalsBase.tuition)}</td>
                <td className="px-4 py-3">{fmt(overallTotalsBase.hostel)}</td>
                <td className="px-4 py-3">
                  {fmt(overallTotalsBase.insurance)}
                </td>
                <td className="px-4 py-3">{fmt(overallTotalsBase.other)}</td>
                <td className="px-4 py-3">
                  Grand: {fmt(overallTotalsBase.grand)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-1">Includes</h4>
          <ul className="text-sm text-emerald-700">
            {university?.fees?.includes?.map((i, idx) => (
              <li key={i?.id || idx} className="flex gap-2 items-center">
                <Check className="h-4 w-4" />
                {i?.lists}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Excludes</h4>
          <ul className="text-sm text-red-600">
            {university?.fees?.excludes?.map((i, idx) => (
              <li key={i?.id || idx} className="flex gap-2 items-center">
                <Dot className="h-4 w-4 text-red-600" />
                {i?.lists}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderAdmissions = () => (
    <div>
      <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {university?.university_requirements?.accordion?.map((item, i) => (
          <li key={item?.id || i} className="rounded-xl border bg-white p-4">
            <p className="text-sm font-medium">{item?.question}</p>
            <p className="text-xs text-slate-600 mt-1">{item?.answer}</p>
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
            {university?.admission_requirements?.map((r, i) => (
              <li key={r?.id || i} className="flex gap-2">
                <span className="text-emerald-600">•</span>
                {r?.lists}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Documents Required</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span>Valid Passport
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span>10th & 12th Marksheets
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span>NEET Scorecard
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">•</span>Medical Fitness
              Certificate
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderStudentLife = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded border p-4 bg-white">
          <h4 className="font-semibold mb-3">Hostel Facility</h4>
          <ul className="space-y-2 text-sm text-slate-700 mb-4">
            {university?.hostelfacility?.map((item, i) => (
              <li key={item?.id || i} className="flex gap-2">
                <span className="text-emerald-600">•</span>
                {item?.lists}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 auto-rows-[100px] sm:auto-rows-[140px]">
            {university?.hostelimage?.map((img, i) => (
              <div
                key={img?.id || i}
                onClick={() => setStudentLifeImage(img?.url)}
                className={`relative rounded-lg overflow-hidden cursor-pointer group ${
                  i % 5 === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <img
                  src={img?.url}
                  alt="Hostel"
                  className="w-full h-full object-cover transition group-hover:scale-105 duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded border p-4 bg-white">
          <h4 className="font-semibold mb-3">
            University Infrastructure & Campus
          </h4>
          <ul className="space-y-2 text-sm text-slate-700 mb-4">
            {university?.university_infrastructure?.map((item, i) => (
              <li key={item?.id || i} className="flex gap-2">
                <span className="text-emerald-600">•</span>
                {item?.lists}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 auto-rows-[100px] sm:auto-rows-[140px]">
            {university?.university_infrastructure_images?.map((img, i) => (
              <div
                key={img?.id || i}
                onClick={() => setStudentLifeImage(img?.url)}
                className={`relative rounded-lg overflow-hidden cursor-pointer group ${
                  i % 5 === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <img
                  src={img?.url}
                  alt="Campus"
                  className="w-full h-full object-cover transition group-hover:scale-105 duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {studentLifeImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setStudentLifeImage(null)}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white bg-black/80 rounded-full w-9 h-9 flex items-center justify-center text-xl"
              onClick={() => setStudentLifeImage(null)}
            >
              x
            </button>
            <img
              src={studentLifeImage}
              className="w-full h-auto rounded-lg"
              alt="preview"
            />
          </div>
        </div>
      )}
    </>
  );

  const renderGallery = () => {
    const handleOpen = (src: string) => {
      setCurrentImg(src);
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      setCurrentImg(null);
    };

    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {university?.gallery?.map((img, i) => (
            <div
              key={img?.id || i}
              onClick={() => handleOpen(img.url)}
              className={`cursor-pointer overflow-hidden rounded-lg group ${
                i === 0 ? "col-span-2 row-span-2" : ""
              } ${i === 3 ? "col-span-2" : ""}`}
            >
              <img
                src={img.url}
                alt={`gallery-${i}`}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300 rounded-lg"
              />
            </div>
          ))}
        </div>

        {open && (
          <div
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full p-2"
            >
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow text-black hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={currentImg || ""}
                className="rounded-lg w-full max-h-[90vh] object-contain"
              />
            </div>
          </div>
        )}
      </>
    );
  };

  const renderAbout = () => (
    <div className="rounded border p-6 bg-white">
      <h4 className="font-semibold mb-2">About {university?.name}</h4>
      <div className="text-sm text-slate-700 whitespace-pre-line">
        {university?.about}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 text-slate-900 min-h-screen">
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[320px] sm:h-[400px] flex items-center justify-center"
        style={{ backgroundImage: `url('${university?.banner?.url}')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white max-w-screen-sm px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {university?.name}
          </h2>
          <p className="mt-2 text-base md:text-lg">
            {university?.city}, {university?.country}
          </p>
        </div>
      </section>

      <section className="relative py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="relative w-full overflow-hidden rounded-2xl bg-slate-200 h-48 sm:h-64 md:h-80 lg:h-full">
                <img
                  src={university?.about_img?.url}
                  alt="University campus"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <div className="flex flex-wrap gap-2">
                    {university?.recognitions?.map((r, i) => (
                      <span
                        key={r?.id || i}
                        className="rounded-full bg-red-600 text-[10px] sm:text-xs px-2 py-1 whitespace-nowrap shadow-lg backdrop-blur-md"
                      >
                        {r?.lists}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {university?.highlights?.map((h, i) => (
                  <div
                    key={h?.id || i}
                    className="rounded-xl border p-3 sm:p-4 border-slate-200 bg-white flex flex-col items-start shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <span className="text-[11px] sm:text-xs text-slate-500">
                      {h?.label}
                    </span>
                    <span className="font-semibold text-sm sm:text-base">
                      {h?.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-1 hidden md:block">{Form}</aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {TABS.map((tab, i) => (
                <button
                  key={tab || i}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded font-medium text-sm border transition ${
                    activeTab === tab
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-slate-800 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 justify-end">
              <span className="text-sm text-slate-700">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="border border-red-600 rounded-full px-3 py-1 text-sm focus:outline-none"
              >
                <option value="INR">INR ₹</option>
                <option value="USD">USD $</option>
                <option value="GEL">GEL ₾</option>
                <option value="RUB">RUB ₽</option>
              </select>
            </div>
          </div>

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

      <aside className="lg:col-span-1 md:hidden block px-4 pb-8">{Form}</aside>
    </div>
  );
}

export default memo(UniversityLayout);
