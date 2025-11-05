"use client";
import { AboutUs, AboutUsBanner } from "@/lib/types/LandingPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

const fetchAboutus = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/landing-pages?populate[Sections][on][blocks.about-us][populate][about_list][populate][Image_or_gif][fields][0]=url&populate[Sections][on][blocks.about-us][populate][about_list][populate][Image_or_gif][fields][1]=alternativeText&populate[Sections][on][blocks.about-us][populate][About_us_count][populate][image_or_gif][fields][0]=url&populate[Sections][on][blocks.about-us][populate][About_us_count][populate][image_or_gif][fields][1]=alternativeText&populate[Sections][on][blocks.about-us][populate][chairmanImage][fields][0]=url&populate[Sections][on][blocks.about-us][populate][chairmanImage][fields][1]=alternativeText`
  );
  return data.data[0].Sections[0];
};
const stats = [
  {
    id: 1,
    value: 100000,
    suffix: "+",
    label: "Students Empowered",
    icon: "https://cdn-icons-gif.flaticon.com/6454/6454106.gif",
  },
  {
    id: 2,
    value: 20,
    suffix: "+",
    label: "Years of Experience",
    icon: "https://cdn-icons-gif.flaticon.com/15370/15370761.gif",
  },
  {
    id: 3,
    value: 10,
    suffix: "+",
    label: "Study Destinations",
    icon: "https://cdn-icons-gif.flaticon.com/15747/15747340.gif",
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
  const {
    data: aboutData,
    isLoading,
    isError,
    error,
  } = useQuery<AboutUs>({
    queryKey: ["about-us"],
    queryFn: fetchAboutus,
    staleTime: Infinity,
  });
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
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
        {/* LEFT TEXT SECTION */}
        <div className="w-full lg:w-3/5">
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
        <div className="w-full lg:w-2/5">
          <div className="flex flex-col items-center text-center border border-gray-300 rounded-xl p-3 sm:p-4">
            <img
              src="https://vsourcevarsity.com/assets/images/founder.webp"
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
      {/* <div className="max-w-7xl mx-auto mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const count = useCounter(stat.value, isVisible);
          return (
            <div
              key={stat.id}
              className="w-full border border-blue-400 rounded-xl p-4 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
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
              <p className="mt-2 text-sm md:text-base font-semibold text-gray-800 text-justify">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div> */}
      <div className="bottom-section">
        {aboutData?.About_us_count?.map((stat, i) => {
          return (
            <div
              key={stat.id}
              className="stat-box"
              data-aos="fade-up"
              data-aos-delay={i * 200}
              data-aos-duration="1000"
              data-aos-anchor-placement="center-bottom"
            >
              <div className="left-box">
                <img
                  src={`${stat?.image_or_gif?.url}`}
                  alt=""
                  className="icon"
                />
                <div className="count text-[#1e73be]">
                  {Number(stat?.count).toLocaleString("en-US")}+
                </div>
              </div>
              <div className="label">{stat?.About_text}</div>
            </div>
          );
        })}
      </div>
      <style>{`
        .about-section {
          padding: clamp(32px, 4vw, 50px) 16px;
          background: #fff;
          font-family: 'Barlow', sans-serif;
          color: #111;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .top-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .top-section {
            grid-template-columns: 65% 30%;
            gap: 32px;
            align-items: start;
          }
        }
        .left { min-width: 0; }
        .right { display: flex; flex-direction: column; align-items: center; }
        h2 { font-size: clamp(30px, 3.6vw, 32px); font-weight: 700; margin: 0; }
        .desc { font-size: clamp(20px, 2.5vw, 25px); margin: 8px 0 0; line-height: 1.6; }
        .para { font-size: clamp(15px, 2.3vw, 15px); margin: 8px 0 0; }
        .features { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 10px; }
        .features li { display: grid; grid-template-columns: 22px 1fr; gap: 10px; font-size: clamp(15px, 2.3vw, 15px); }
        .features li img { width: 22px; height: 22px; margin-top: 2px; }
        .founder-img { width: 100%; max-width: 450px; border-radius: 10px; border: 1px solid #e5e7eb; }
        .quote { font-style: italic; margin-top: 10px; text-align: center; font-size: 15px; }
        .bottom-section {
          margin-top: clamp(28px, 6vw, 50px);
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          width: 80%;
          margin: clamp(28px, 6vw, 50px) auto 0;
        }
        @media (min-width: 640px) {
          .bottom-section {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .bottom-section {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .stat-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #0069E9;
          border-radius: 8px;
          padding: 13px;
          min-height: 80px;
          background: #fff;
          box-sizing: border-box;
        }
        .left-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          object-fit: contain;
        }
        .bottom-section .stat-box:first-child .icon {
          width: 52px;
          height: 52px;
        }
        .count {
          font-size: clamp(20px, 4.5vw, 30px);
          font-weight: 800;
          margin: 0;
          white-space: nowrap;
        }
        .label {
          font-size: clamp(13px, 3.5vw, 15px);
          font-weight: 600;
          color: #111;
          line-height: 1.3;
          text-align: right;
          margin-left: 10px;
          width: 34%;
        }
        @media (max-width: 380px) {
          .stat-box { gap: 8px; padding: 10px; }
          .count { font-size: 18px; }
          .label { font-size: 12px; }
        }
        @media (max-width: 540px) {
          .left-box {
              width: 50%;
              justify-content: space-between;
            }
          .stat-box:first-child .left-box {
              width: 60%;
              justify-content: space-between;
            }
          }
        @media (max-width: 640px) {
          .bottom-section{
            display:none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-section * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
