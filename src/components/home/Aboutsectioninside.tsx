"use client";
import React, { useState, useEffect, useRef } from "react";

const stats = [
  {
    id: 1,
    value: 100000,
    suffix: "+",
    label: "Students Empowered",
    icon: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762770342/hat_phpbum.gif",
  },
  {
    id: 2,
    value: 20,
    suffix: "+",
    label: "Years of\nExperience",
    icon: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762770342/handshake_ewjcsn.gif",
  },
  {
    id: 3,
    value: 10,
    suffix: "+",
    label: "Study Destinations",
    icon: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762770342/earth_vhzkro.gif",
  },
];

/* Counter hook */
function useCounter(end: number, active: boolean, start = 0, duration = 2000) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [end, start, duration, active]);

  return count;
}

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-10 sm:py-12 px-4 sm:px-6 md:px-8"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center mx-auto ">
        {/* LEFT TEXT SECTION */}
        <div className="basis-[50%] min-w-[50%]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1e73be] mb-3 sm:mb-4">
            About Vsource Admissions
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-semibold text-black mb-3 sm:mb-4 text-justify">
            South India&apos;s Leading Educational Group for Higher Education
          </p>

          <p className="text-black mb-3 sm:mb-4 leading-relaxed text-justify">
            Vsource Admissions specializes in assisting aspiring doctors with
            their journey to study MBBS abroad. We provide end-to-end guidance,
            from university selection to visa processing, ensuring a seamless
            and worry-free experience.
          </p>

          <p className="text-black mb-3 sm:mb-4 leading-relaxed text-justify">
            We are proud to offer{" "}
            <span className="font-semibold text-black">
              100% Educational Loan Assistance
            </span>{" "}
            to all eligible students, helping you achieve your dream of becoming
            a doctor without financial barriers. Our focus is on placing you in
            globally recognized universities with no capitation fees.
          </p>

          <ul className="mt-3 sm:mt-4 space-y-2 text-black text-sm sm:text-base text-justify list-disc list-inside">
            <li>Top Medical Universities Globally</li>
            <li>No NEET for Admissions</li>
            <li>Direct Admissions &amp; Visa Processing</li>
            <li>MCI / NMC &amp; WHO Recognitions</li>
            <li>Complete Financial &amp; Post-Admission Support</li>
          </ul>
        </div>

        {/* RIGHT IMAGE/QUOTE SECTION */}
        <div className="basis-[50%] min-w-[50%] flex items-center justify-center">
          <div className="flex flex-col items-center text-center rounded-xl p-3 sm:p-4">
            <img
              src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762754020/imgi_5_founder_pcglp8.jpg"
              alt="Founder"
              className="rounded-lg w-full max-w-md object-cover aspect-[4/3] sm:aspect-[3/2]"
            />
            <p className="mt-3 sm:mt-4 text-sm md:text-base text-gray-700 italic max-w-prose">
              <strong className="text-xl">“</strong>
              Redefining Education for Tomorrow’s Innovators
              <strong className="text-xl">”</strong>
            </p>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-8 sm:mt-12 gap-4 sm:gap-6 ">
        {stats.map((stat) => {
          const count = useCounter(stat.value, isVisible);
          return (
            <div
              key={stat.id}
              className="w-full border border-blue-400 rounded-xl p-4 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <img
                  src={stat.icon}
                  alt={stat.label}
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0"
                />
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1e73be]">
                  {count.toLocaleString("en-US")}
                  {stat.suffix}
                </p>
              </div>
              <p className="mt-2 text-sm md:text-base font-semibold text-gray-800 text-end">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutSection;
