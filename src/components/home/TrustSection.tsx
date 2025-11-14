import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { User, GraduationCap, MapPin, Utensils } from "lucide-react";

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  backgroundImage: string;
}

const services: Service[] = [
  {
    backgroundImage:
      "https://res.cloudinary.com/dch00stdh/image/upload/v1762706926/Dedicated_Counsellor_mypjj8.webp",
    icon: <User size={40} color="#ffffff" />,
    title: "Expert Consultation",
    description:
      "We assigned a high professional Expert Counselors, gives thorough knowledge on the MBBS offered by ABROAD Universities",
  },
  {
    backgroundImage:
      "https://res.cloudinary.com/dch00stdh/image/upload/v1762706925/accommodation-food_suedpf.webp",
    icon: <GraduationCap size={40} color="#ffffffff" />,
    title: "Admission & Documentation",
    description:
      "We Provide Admission with all Documents in order to ensure the success of Admission & Visa Process",
  },
  {
    backgroundImage:
      "https://res.cloudinary.com/dch00stdh/image/upload/v1762706929/Loan_Assistance_u5idg4.webp",
    icon: <Utensils size={40} color="#ffffffff" />,
    title: "Accommodation & INDIAN Food",
    description:
      "Separate Hostel for Boy & Girls with INDIAN Food 24/7 CCTV surveillance to ensure student security",
  },
  {
    backgroundImage:
      "https://res.cloudinary.com/dch00stdh/image/upload/v1762706937/pre-post-landing_rk8hka.webp",
    icon: <MapPin size={40} color="#ffffffff" />,
    title: "Pre & Post Landing Support",
    description:
      "We Make sure you informed & prepared before- after you travel abroad, Pre & Post landing, in a way to ease the entry of Indian Students.",
  },
];

const TrustSection: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section style={styles.section}>
      <h2
        style={styles.title}
        data-aos-anchor-placement="center-bottom"
        data-aos="zoom-in"
      >
        Our Services
      </h2>
      <div className="scroll-container">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            style={{
              backgroundImage: ` url(${service.backgroundImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition:
                index === services.length - 1 ? "center 15%" : "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50 rounded-[16px]"></div>
            <div className="relative z-10 flex flex-col items-center text-white">
              <div
                className="icon-wrapper mb-4"
                data-aos="fade-right"
                data-aos-delay={index * 200}
                data-aos-anchor-placement="center-bottom"
              >
                {service.icon}
              </div>
              <h3
                className="text-lg font-bold mb-2 text-blue-500"
                data-aos="fade-right"
                data-aos-delay={index * 200}
                data-aos-anchor-placement="center-bottom"
              >
                {service.title}
              </h3>
              <p
                className="text-sm"
                data-aos="fade-right"
                data-aos-delay={index * 200}
                data-aos-anchor-placement="center-bottom"
              >
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Inline CSS for responsive behavior & animation */}
      <style>{`
        .scroll-container {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 16px;
          scroll-snap-type: x mandatory;
          padding-bottom: 10px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .service-card {
          position: relative;
          flex: 0 0 90%;
          max-width: 90%;
          scroll-snap-align: start;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: start;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          height: 60px;
        }

        @media (min-width: 768px) {
          .scroll-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            overflow: visible;
            gap: 24px;
          }

          .service-card {
            flex: none;
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: "40px 20px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "30px",
    color: "#000", // Black heading
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: 600,
    marginBottom: "12px",
    color: "#ffffffff", // Red title
  },
  cardDesc: {
    fontSize: "14px",
    color: "#ffffff",
  },
};

export default TrustSection;
