import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import AboutSection from "./AboutSection";
import Accreditation from "./AccreditationSection";
// import Journey from "@/components/home/Journey";
import TrustSection from "@/components/home/TrustSection";
import CertificateSlider from "@/components/home/CertificateSlider";
import VideoSection from "@/components/VideoSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CertificateBentoGrid from "@/components/home/CertificateSlider";
// import JourneyCard from "@/utils/JourneyCard";

import Journey from "@/pages/Journet.tsx";

type Slide = {
  img: string;
  title: React.ReactNode;
  alt: string;
  subtitle: string;
  cta: { href: string; label: string };
};

const slides: Slide[] = [
  {
    img: "/images/hero1.jpg",
    title: (
      <>
        Study <span className="text-red-600">MBBS</span> Abroad
      </>
    ),
    alt: "Study MBBS Abroad",
    subtitle: "Top universities • Transparent guidance • End-to-end support",
    cta: { href: "/contact", label: "Get Counselling" },
  },
  {
    img: "/images/hero2.jpg",
    title: (
      <>
        MBBS in <span className="text-red-600">Georgia </span> &amp;{" "}
        <span className="text-red-600">Russia</span>
      </>
    ),
    alt: "MBBS in Georgia & Russia",
    subtitle: "Affordable tuition • International exposure",
    cta: { href: "/mbbs-abroad/georgia", label: "Explore Georgia" },
  },
  {
    img: "/images/hero3.jpg",
    title: (
      <>
        Prefix <span className="text-red-600">Your Name</span> With{" "}
        <span className="text-red-600">Doctor</span>
      </>
    ),
    alt: "Prefix Your Name With Doctor",
    subtitle: "18+ years • 100,000+ enrolled students",
    cta: { href: "/about", label: "Why VSource" },
  },
];

function Home() {
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [isNextLoaded, setIsNextLoaded] = useState(true); // true for initial render
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<number | null>(null);
  const loadedRef = useRef<{ [key: number]: boolean }>({});

  const start = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      goTo((i) => (i + 1) % slides.length);
    }, 5000);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onVis = () => (document.hidden ? stop() : start());
      start();
      document.addEventListener("visibilitychange", onVis);
      return () => {
        stop();
        document.removeEventListener("visibilitychange", onVis);
      };
    }
  }, [start, stop]);

  const goTo = (updater: (i: number) => number) => {
    setPrevIdx((p) => {
      const current = idx;
      const next = updater(current);
      setIsNextLoaded(!!loadedRef.current[next]);
      setIdx(next);
      return current;
    });
  };

  // touch swipe
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (delta > threshold) goTo((i) => (i - 1 + slides.length) % slides.length);
    else if (delta < -threshold) goTo((i) => (i + 1) % slides.length);
    touchStartX.current = null;
  };

  const fadeDur = prefersReducedMotion ? 0 : 0.9;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full text-white overflow-hidden">
        {/* === Desktop Background Image === */}
        <div
          className="hidden sm:block absolute inset-0 bg-no-repeat bg-cover bg-center shrink-0"
          style={{
            backgroundImage: `url(/images/admission-banner.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* === Mobile Background Image === */}
        <div className="relative z-10 sm:hidden w-full px-4 pt-28 pb-10 overflow-hidden shrink-0">
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(/images/admission-mobile.jpg)`,
            }}
          >
            {/* <div className="absolute inset-0 bg-black/60" /> */}
          </div>

          {/* Mobile Content */}
          <div className="relative z-10 flex flex-col justify-between min-h-full">
            <div className="flex">
              <div className="w-[50%] bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex flex-col justify-center space-y-3 mb-5">
                <h1 className="text-2xl font-bold leading-snug">
                  Study{" "}
                  <span className="block text-red-600 text-xl">
                    MBBS Abroad
                  </span>
                </h1>
                <div className="flex items-center space-x-2 mt-2">
                  <img
                    src="https://flagcdn.com/ge.svg"
                    alt="Georgia"
                    className="w-6 h-6 object-cover rounded-full"
                  />
                  <img
                    src="https://flagcdn.com/ru.svg"
                    alt="Russia"
                    className="w-6 h-6 object-cover rounded-full"
                  />
                </div>
                <p className="text-white text-sm">
                  Pursue your dream of becoming a doctor with world-class
                  medical education.
                </p>
                <img
                  src="/images/20 years logo.png"
                  alt="20 Years Logo"
                  className="w-20 h-auto mt-4 "
                />
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="#apply"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-white hover:text-red-600 transition-colors"
                  >
                    Book Free Counseling
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === Desktop Layout === */}
        <div className="hidden sm:flex relative z-10 items-center h-[70svh] md:h-[85svh] lg:h-[90svh] min-h-[420px] max-h-[900px]">
          <div className="w-full mx-auto max-w-screen-xl px-4 sm:px-6 text-white text-left">
            <h1 className="font-bold text-[clamp(28px,6vw,56px)] leading-tight">
              Study MBBS Abroad
            </h1>
            <p className="mt-4 text-white/90 text-[clamp(14px,4vw,20px)] max-w-[90vw] sm:max-w-xl">
              Pursue your dream of becoming a doctor with world-class medical
              education in{" "}
              <span className="font-semibold text-red-600">Georgia</span> and{" "}
              <span className="font-semibold text-red-600">Russia</span>.
              Affordable tuition fees, globally recognized universities, and
              safe, welcoming environments await you.
            </p>
            <div className="flex justify-start pt-6">
              <img
                src="/images/20 years logo.png"
                alt="20 Years Logo"
                className="w-36 h-auto"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-red-600 text-white text-sm md:text-base hover:bg-white hover:text-red-600 transition-colors"
              >
                Book Free Counseling
              </a>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />

      <Accreditation />

      {/* <Journey /> */}
      {/* <JourneyCard /> */}
      <Journey />

      <TrustSection />

      <CertificateBentoGrid />

      <VideoSection />

      <TestimonialsSection />
    </div>
  );
}

export default Home;
