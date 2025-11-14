import React, { useState } from "react";
import { motion } from "framer-motion";
import { PopupModal } from "react-calendly";
const Hero = () => {
  const [openCalendly, setOpenCalendly] = useState(false);
  const handleGoVirtual = () => {
    setOpenCalendly(true);
  };
  return (
    <section className="relative w-full text-white overflow-hidden">
      {/* === Desktop Background Image === */}
      <div
        className="hidden sm:block absolute inset-0 bg-no-repeat bg-cover bg-center shrink-0"
        style={{
          backgroundImage: `url('/images/admission-banner.webp')`,
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
                <span className="block text-red-600 text-xl">MBBS Abroad</span>
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
                Pursue your dream of becoming a doctor with world-class medical
                education.
              </p>
              <img
                src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_400,c_limit,dpr_auto/v1762702830/20-years-logo_be7aro.webp"
                alt="20 Years Logo"
                className="w-20 h-auto mt-4 "
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  onClick={handleGoVirtual}
                  className="bg-red-600 text-white  rounded-md font-semibold text-[12px] p-2 flex items-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Book Free Counseling</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Desktop Layout === */}
      <div className="hidden sm:flex relative  items-center mt-28 mb-10 ">
        <div className="w-full mx-auto max-w-screen-xl px-4 sm:px-6 text-white text-left">
          <h1 className="font-bold text-[clamp(28px,6vw,56px)] leading-tight">
            Study MBBS Abroad
          </h1>
          <p className="mt-4 text-white/90 text-[clamp(14px,4vw,20px)] max-w-[90vw] sm:max-w-xl">
            Become a doctor in{" "}
            <span className="font-semibold text-red-600">Georgia</span> and{" "}
            <span className="font-semibold text-red-600">Russia</span>.
            Top-ranked universities, affordable fees, and a safe, welcoming
            student
          </p>
          <div className="flex justify-start pt-6">
            <img
              src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_400,c_limit,dpr_auto/v1762702830/20-years-logo_be7aro.webp"
              alt="20 Years Logo"
              className="w-36 h-auto"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              onClick={handleGoVirtual}
              className="bg-red-600 text-white   px-6 py-3 rounded-md font-semibold text-lg hover:bg-white transition-colors hover:text-red-600  flex items-center space-x-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Book Free Counseling</span>
            </a>
          </div>
          {/* Rating Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="text-sm text-white">4.9/5 Rating</span>
            </div>
            <div className="text-sm font-semibold text-white">
              100,000+ Students Guided
            </div>
            <div className="text-sm font-semibold text-white">
              250+ Global University Partners
            </div>
          </motion.div>
        </div>
      </div>

      <PopupModal
        url="https://calendly.com/server-vsourceoverseas/30min"
        open={openCalendly}
        onModalClose={() => setOpenCalendly(false)}
        rootElement={document.getElementById("root")}
        pageSettings={{ hideEventTypeDetails: false }}
      />
    </section>
  );
};

export default Hero;
