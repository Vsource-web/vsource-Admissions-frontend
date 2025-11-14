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

export function useCounter(end, start = 0, duration = 2000, active = true) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!active) return;

    let startTime = null;

    const step = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);

      setCount(Math.floor(progress * (end - start) + start));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [end, start, duration, active]);

  return count;
}

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="w-full max-w-[1400px] mx-auto px-4">
        {/* ----- TOP SECTION ----- */}
        <div className="top-section">
          {/* LEFT SIDE */}
          <div className="left">
            <h2
              data-aos="fade-right"
              data-aos-duration="1000"
              className="text-[#1e73be]"
            >
              About Vsource Admissions
            </h2>

            <p className="desc" data-aos="fade-right" data-aos-duration="1000">
              <strong>
                South India&apos;s Leading Educational Group for Higher
                Education
              </strong>
            </p>

            <p className="para" data-aos="fade-right" data-aos-duration="1000">
              Vsource Admissions specializes in assisting aspiring doctors with
              their journey to study MBBS abroad. We provide end-to-end
              guidance, from university selection to visa processing, ensuring a
              seamless and worry-free experience.
            </p>

            <p className="para" data-aos="fade-right" data-aos-duration="1000">
              We are proud to offer{" "}
              <span className="font-bold">
                100% Educational Loan Assistance
              </span>{" "}
              to all eligible students, helping you achieve your dream of
              becoming a doctor without financial barriers. Our focus is on
              placing you in globally recognized universities with no capitation
              fees.
            </p>

            <ul className="features" data-aos="fade-right">
              <li>Top Medical Universities Globally</li>
              <li>No NEET for Admissions</li>
              <li>Direct Admissions &amp; Visa Processing</li>
              <li>MCI / NMC &amp; WHO Recognitions</li>
              <li>Complete Financial &amp; Post-Admission Support</li>
            </ul>
          </div>

          {/* RIGHT SIDE (IMAGE + QUOTE) */}
          <div className="right" data-aos="flip-left" data-aos-duration="2000">
            <img
              src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762754020/imgi_5_founder_pcglp8.jpg"
              className="founder-img"
              alt="Founder"
            />

            <p className="quote">
              “Redefining Education for Tomorrow’s Innovators”
            </p>
          </div>
        </div>

        {/* ----- BOTTOM STATS SECTION ----- */}
        <div className="bottom-section">
          {stats.map((stat, i) => {
            const count = useCounter(stat.value);
            return (
              <div
                key={stat.id}
                className="stat-box"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="left-box">
                  <img src={stat.icon} alt="" className="icon" loading="lazy" />
                  <div className="count text-[#1e73be]">
                    {count.toLocaleString("en-US")}
                    {stat.suffix}
                  </div>
                </div>
                <div className="label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ====== STYLES (ORIGINAL OVERSEAS DESIGN SYSTEM) ====== */}
      <style>{`
        .about-section {
          padding: clamp(32px, 4vw, 50px) 16px;
          background: white;
          font-family: 'Barlow', sans-serif;
          color: #111;
        }

        .top-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        h2 {
          font-size: clamp(30px, 3.6vw, 32px);
          font-weight: 700;
        }

        .desc {
          font-size: clamp(20px, 2.5vw, 25px);
          margin-top: 8px;
          font-weight: bold;
        }

        .para {
          font-size: clamp(15px, 2.3vw, 16px);
          margin-top: 10px;
          line-height: 1.6;
        }

        .features {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-left: 15px;
        }

        .features li {
          font-size: clamp(15px, 2.3vw, 15px);
          list-style: disc
        }

        .founder-img {
          width: 100%;
          max-width: 450px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .right{
          flex-basis: 50%;
          min-width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
          .left{
          flex-basis: 50%;
          min-width: 50%;
        }

        .quote {
          font-style: italic;
          text-align: center;
          margin-top: 10px;
          font-size: 15px;
        }

        .bottom-section {
            display: flex;
            margin-top: clamp(28px, 6vw, 50px);
            width: 93%;
            margin-left: auto;
            margin-right: auto;
            gap: 21px;
            justify-content: center;
        }
        @media (max-width: 950px) {
          .top-section {
            flex-direction: column;
          gap:20px
          }
          .bottom-section {
            flex-direction: column;
        }
      }

        .stat-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #0069E9;
          border-radius: 10px;
          padding: 13px;
          background: white;
          min-height: 80px;
        }

        .left-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon {
          width: 40px;
          height: 40px;
        }

        .count {
          font-size: clamp(20px, 4.5vw, 30px);
          font-weight: 800;
          white-space: nowrap;
        }

        .label {
          font-size: clamp(13px, 3.5vw, 15px);
          font-weight: 600;
          text-align: right;
          width: 34%;
        }

      `}</style>
    </section>
  );
};

export default AboutSection;
