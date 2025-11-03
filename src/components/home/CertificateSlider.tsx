import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

// Certificate component
const CertificateSlider: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-red-700 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Prestigious Certificates
        </motion.h2>
        <div
          ref={containerRef}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {certificates.map((certificate, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.02}
              transitionSpeed={300}
            >
              <motion.div
                className="certificate-card break-inside-avoid relative bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ y: yRange }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div
                  className="p-6"
                  onClick={() => setSelectedCertificate(certificate)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setSelectedCertificate(certificate)
                  }
                >
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-56 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {certificate.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {certificate.description}
                  </p>
                  <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>

      {/* Shadcn Dialog for viewing certificate */}
      <Dialog
        open={!!selectedCertificate}
        onOpenChange={() => setSelectedCertificate(null)}
      >
        <DialogContent className="sm:max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              {selectedCertificate?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-3">
              {selectedCertificate?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <img
              src={selectedCertificate?.image}
              alt={selectedCertificate?.title}
              className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificateSlider;
