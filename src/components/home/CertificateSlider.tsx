import React from "react";

interface Certificate {
  image: string;
  title: string;
  description: string;
}

const certificates: Certificate[] = [
  {
    image: "/images/cert/cert9.jpg",
    title: "Certificate of Partnership",
    description:
      "Authorizes VSource as student recruiter for Dai Nam University.",
  },
  {
    image: "/images/cert/cert8.jpg",
    title: "Certificate of Partnership",
    description:
      "Authorizes VSource as recruiting agent for Ken Walker International University.",
  },
  {
    image: "/images/cert/cert7.jpg",
    title: "Certificate of Partnership",
    description:
      "Certifies VSource Educational Services as recruiting agent for University of Georgia.",
  },
  {
    image: "/images/cert/cert1.jpg",
    title: "Extract from Registry of Legal Entities",
    description: "Proof of company registration in Georgia Public Registry.",
  },
  {
    image: "/images/cert/cert6.jpg",
    title: "Certificate of Incorporation",
    description: "Proof of VSource legal incorporation in India.",
  },
  {
    image: "/images/cert/cert5.jpg",
    title: "Certificate of Partnership",
    description:
      "Recognizes VSource as student recruitment agent for Belgorod State National Research University.",
  },
  {
    image: "/images/cert/cert4.jpg",
    title: "Russian Tax Registration Certificate",
    description:
      "Confirms tax registration of VSource-IND in Russia (Belgorod).",
  },
  {
    image: "/images/cert/cert2.jpg",
    title: "Certificate of Authorization",
    description:
      "Authorizes VSource to recruit for Caucasus International University.",
  },
  {
    image: "/images/cert/cert3.jpg",
    title: "Certificate of Partnership",
    description:
      "Authorizes VSource to recruit for University of Georgia programs.",
  },
];

const CertificateBentoGrid: React.FC = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
        Our Certificates & Authorizations
      </h2>

      {/* Bento-style grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className={`relative overflow-hidden shadow-md group bg-white border-4 border-red-600 rounded-lg ${
              index % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""
            }`}
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <h3 className="text-base font-semibold text-white">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-200">{cert.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateBentoGrid;
