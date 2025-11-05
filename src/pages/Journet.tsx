// import styles from "./page.module.css";
import JourneyCard from "@/utils/JourneyCard";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import styles from "@/utils/style.module.css";

type JourneyCardProps = {
  i: any;
  description?: any;
  color: any;
  progress: any;
  range: any;
  targetScale: any;
  desktop: any;
  mobile: any;
  caption: any;
  ctaHref?: any;
  ctaText?: any;
};

const projects = [
  {
    desktop:
      "/images/universities/University-of-Georgia/university-of-georgia.jpg",
    mobile:
      "/images/universities/University-of-Georgia/university-of-georgia-mobile.jpg",
    caption: "The University Of Georgia",
    description:
      "One of Georgia’s leading medical universities, offering internationally recognized MBBS programs with modern infrastructure and global exposure.",
    ctaHref: "/mbbs-abroad/georgia/university-of-georgia",
    ctaText: "Explore More",
    color: "#BBACAF",
  },
  {
    desktop:
      "/images/universities/UniversityKenWalker/ken-walker-international-university.jpg",
    mobile:
      "/images/universities/UniversityKenWalker/ken-walker-international-university-mobile.jpg",
    caption: "Ken Walker International University",
    description:
      "Known for its American-style curriculum and English-taught MBBS programs, KWU prepares students for international medical licensing exams.",
    ctaHref: "/mbbs-abroad/georgia/ken-walker-international-university",
    ctaText: "Explore More",
    color: "#977F6D",
  },
  {
    desktop:
      "/images/universities/Tbilisi-StateMedical-University/Tbilisi-University.webp",
    mobile:
      "/images/universities/Tbilisi-StateMedical-University/Tbilisi-State-Medical-University-mobile.jpg",
    caption: "Tbilisi State Medical University",
    description:
      "A prestigious government university with over 100 years of excellence in medical education and strong clinical partnerships across Europe.",
    ctaHref: "/mbbs-abroad/georgia/tbilisi-state-medical-university",
    ctaText: "Explore More",
    color: "#B62429",
  },
  {
    desktop: "/images/universities/Ilia-State-University/ilia-state.jpg",
    mobile:
      "/images/universities/Ilia-State-University/ilia-state-university-mobile.jpg",
    caption: "Ilia State University",
    description:
      "A progressive institution in Tbilisi offering high-quality medical and research programs with modern facilities and global collaborations.",
    ctaHref: "/mbbs-abroad/georgia/ilia-state-university",
    ctaText: "Explore More",
    color: "#BBACAF",
  },
  {
    desktop:
      "/images/universities/AkakiTsereteli-StateUniversity/Akaki-Tsereteli-State-University-scaled.jpg",
    mobile:
      "/images/universities/AkakiTsereteli-StateUniversity/Akaki-Tsereteli-State-University-mobile.jpg",
    caption: "Akaki Tsereteli State University",
    description:
      "Renowned for its affordable education and experienced faculty, ATSU is among the oldest and most respected universities in Georgia.",
    ctaHref: "/mbbs-abroad/georgia/akaki-tsereteli-state-university",
    ctaText: "Explore More",
    color: "#C2491D",
  },
  {
    desktop:
      "/images/universities/Belgorod-State-NationalResearch-University/Belgorod-State-University.jpg",
    mobile:
      "/images/universities/Belgorod-State-NationalResearch-University/Belgorod-State-National-Research-University-mobile.jpg",
    caption: "Belgorod State National Research University",
    description:
      "A top-ranked Russian university focusing on innovation and advanced medical training, recognized by WHO and MCI for its MBBS program.",
    ctaHref: "/mbbs-abroad/russia/belgorod-state-national-research-university",
    ctaText: "Explore More",
    color: "#977F6D",
  },
];

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main ref={container} className={styles.main}>
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <JourneyCard
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.15, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}
