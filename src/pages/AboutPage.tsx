import { useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import styled from "styled-components";
import AboutSection from "./AboutSection";
import { useAboutBanner, useTeamMembers } from "@/lib/types/LandingPage";
import { toast } from "sonner";
import TeamSkeleton from "@/Loaders/about-us/TeamSkeleton";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";

const StyledTeamWrapper = styled.div`
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 50px 20px;
    padding: 10px;
  }

  .profile-card {
    position: relative;
    width: 100%;
    max-width: 260px;
    height: 355px;
    background: #fff;
    padding: 20px 20px 0px 20px;
    border-radius: 15px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    text-align: center;
    font-family: "Poppins", Arial, sans-serif;
    display: flex;
    flex-direction: column;
  }
  .jIozqo .img img {
    width: 200px !important;
    height: 200px !important;
    /* object-fit: cover; */
    border-radius: 15px;
    -shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    margin-left: 20px;
  }
  .profile-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
  }

  .profile-card .img {
    width: 100%;
    height: 200px; /* Fixed height for image container */
    position: relative;
    transform: translateY(-45px);
    margin-bottom: 15px;
  }

  .img img {
    width: 200px !important;
    height: 200px !important;
    // object-fit: cover; /* Ensures images maintain aspect ratio */
    border-radius: 15px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    margin-left: 20px;
  }

  .profile-card:hover .img img {
    transform: scale(1.05);
  }

  .caption {
    margin-top: 10px;
    transform: translateY(-45px);
  }

  .caption h3 {
    font-size: clamp(0.7rem, 2.5vw, 1.1rem);
    margin: 0;
    color: #333;
    word-wrap: break-word;
  }

  .caption p {
    font-size: clamp(0.7rem, 2vw, 1rem);
    color: rgb(243, 35, 8);
    margin: 5px 0 5px;
    word-wrap: break-word;
  }

  .extra-info {
    font-size: clamp(0.5rem, 2vw, 1rem);
    color: #555;
    opacity: 1;
    transform: translateY(-45px);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  .profile-card,
  .img img,
  .extra-info {
    transition: all 0.3s ease-in-out;
  }

  @media (min-width: 768px) {
    .main {
      gap: 50px 30px;
    }

    .profile-card {
      max-width: 280px;
      height: 395px; /* Maintain same height on desktop */
      padding: 30px 30px 0px 30px;
    }

    .profile-card .img {
      height: 220px; /* Slightly larger images on desktop */
    }
  }

  @media (max-width: 460px) {
    .main {
      gap: 50px 30px;
    }
    .profile-card {
      max-width: 260px;
      height: 320px; /* Slightly smaller on mobile */
      padding: 10px 10px 0px 10px;
    }

    .profile-card .img {
      height: 180px; /* Slightly smaller images on mobile */
    }

    .caption h3 {
      font-size: clamp(1rem, 2.2vw, 1.2rem);
    }

    .caption p {
      font-size: clamp(1.1rem, 2vw, 0.9rem);
    }
    .extra-info {
      font-size: clamp(0.8rem, 2vw, 0.9rem);
    }
  }
`;
const AboutPage = () => {
  const { data: aboutData, isLoading, isError, error } = useAboutBanner();

  const {
    data: members,
    isLoading: memberLoading,
    isError: memberError,
    error: memberErr,
  } = useTeamMembers();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    toast.error(error?.message || "failed to load banner");
    console.log("failed to load banner", error);
  }

  if (memberError) {
    toast.error(memberErr?.message || "failed to load Members");
    console.log("failed to load Members", memberErr);
  }

  if (isLoading || !aboutData) {
    return <BannerSkeleton />;
  }

  if (memberLoading || !members) {
    return <TeamSkeleton />;
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="pt-40 pb-36 bg-cover bg-center bg-no-repeat relative text-white"
        style={{
          backgroundImage: `url(/images/about-banner.jpg)`,
        }}
      >
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative w-full max-w-[1400px] mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-red-600 font-bold mb-6">
              About Us
            </h1>
            <p className="text-xl text-gray-300">
              Learn about our journey, our team, and our mission to provide
              exceptional educational consultancy for over 20 years.
            </p>
          </div>
        </div>
      </section>
      <style>{`
      .py-16 {
    padding-top:0.5rem !important;
    padding-bottom: 4rem;
}

      `}</style>

      {/* About Content */}

      <section className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <AboutSection />
        </div>
      </section>

      {/* Team Section */}

      <>
        <section className="py-16 md:py-24">
          <div className="w-full max-w-[1400px] mx-auto px-4">
            <SectionTitle
              title={members?.title || "Our Management Team"}
              subtitle={
                members?.description ||
                "Meet the experts who make Vsource Company a trusted name in educational consultancy"
              }
            />
            <StyledTeamWrapper>
              <div className="main">
                {members &&
                  members?.members &&
                  members?.members?.map((member, index) => {
                    const delay = 50 + index * 100; // 100ms base + 100ms per index
                    return (
                      <div
                        className="profile-card"
                        key={index}
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                        data-aos-delay={delay}
                      >
                        <div className="img">
                          <img
                            src={`${member?.image?.url}`}
                            alt={member.name}
                            data-aos="flip-left"
                            data-aos-anchor-placement="center-bottom"
                            data-aos-delay={delay}
                          />
                        </div>
                        <div className="caption">
                          <h3
                            data-aos="fade-right"
                            data-aos-anchor-placement="center-bottom"
                            data-aos-delay={delay}
                          >
                            {member?.name || "failed to load"}
                          </h3>
                          <p
                            data-aos="fade-right"
                            data-aos-anchor-placement="center-bottom"
                            data-aos-delay={delay}
                          >
                            {member?.position || "failed to load"}
                          </p>
                        </div>
                        <div className="extra-info">
                          {member?.bio || "failed to load"}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </StyledTeamWrapper>
          </div>
        </section>
      </>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Vision */}
            <AnimateOnScroll>
              <div className="border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#E6F0FF] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#0052CC]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-[#0052CC]">
                  Our Vision
                </h3>
                <p className="text-center text-gray-700 mt-4 leading-relaxed">
                  To be the leading educational consultancy in India, recognized
                  for our integrity, personalized approach, and consistent
                  delivery of successful academic and career outcomes for our
                  students.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Mission */}
            <AnimateOnScroll delay={200}>
              <div className="border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#FFF8E1] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#FFC107]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-[#FFC107]">
                  Our Mission
                </h3>
                <p className="text-center text-gray-700 mt-4 leading-relaxed">
                  To empower students with comprehensive guidance, and
                  supportive resources that enable them to make informed
                  decisions about their educational and career paths, both in
                  India and abroad.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
