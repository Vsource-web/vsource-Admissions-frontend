import React, { useState, useEffect, useRef } from "react";
import "./UniversityAnimation.css";
import { Link } from "react-router-dom";

const CarouselSlider: React.FC = () => {
  const [animationType, setAnimationType] = useState<"next" | "prev" | null>(
    null
  );
  const [items, setItems] = useState([
    {
      id: 1,
      desktop: "/images/universities/university-of-georgia.jpg",
      caption: "The University Of Georgia",
      description:
        "One of Georgia's leading medical universities, offering internationally recognized MBBS programs with modern infrastructure and global exposure.",
      ctaHref: "/mbbs-abroad/georgia/university-of-georgia",
      ctaText: "Explore More",
      color: "#BBACAF",
    },
    {
      id: 2,
      desktop: "/images/universities/ken-walker-international-university.jpg",
      caption: "Ken Walker International University",
      description:
        "Known for its American-style curriculum and English-taught MBBS programs, KWU prepares students for international medical licensing exams.",
      ctaHref: "/mbbs-abroad/georgia/ken-walker-international-university",
      ctaText: "Explore More",
      color: "#977F6D",
    },
    {
      id: 3,
      desktop: "/images/universities/Tbilisi-University.webp",
      caption: "Tbilisi State Medical University",
      description:
        "A prestigious government university with over 100 years of excellence in medical education and strong clinical partnerships across Europe.",
      ctaHref: "/mbbs-abroad/georgia/tbilisi-state-medical-university",
      ctaText: "Explore More",
      color: "#B62429",
    },
    {
      id: 4,
      desktop: "/images/universities/ilia-state.jpg",
      caption: "Ilia State University",
      description:
        "A progressive institution in Tbilisi offering high-quality medical and research programs with modern facilities and global collaborations.",
      ctaHref: "/mbbs-abroad/georgia/ilia-state-university",
      ctaText: "Explore More",
      color: "#BBACAF",
    },
    {
      id: 5,
      desktop:
        "/images/universities/Akaki-Tsereteli-State-University-scaled.jpg",
      caption: "Akaki Tsereteli State University",
      description:
        "Renowned for its affordable education and experienced faculty, ATSU is among the oldest and most respected universities in Georgia.",
      ctaHref: "/mbbs-abroad/georgia/akaki-tsereteli-state-university",
      ctaText: "Explore More",
      color: "#C2491D",
    },
    {
      id: 6,
      desktop: "/images/universities/Belgorod-State-University.jpg",
      caption: "Belgorod State National Research University",
      description:
        "A top-ranked Russian university focusing on innovation and advanced medical training, recognized by WHO and MCI for its MBBS program.",
      ctaHref:
        "/mbbs-abroad/russia/belgorod-state-national-research-university",
      ctaText: "Explore More",
      color: "#977F6D",
    },
  ]);

  const [thumbnails, setThumbnails] = useState([
    {
      id: 1,
      image: "/images/universities/ken-walker-international-university.jpg",
      title: "Ken Walker International University",
      description: "Description",
    },
    {
      id: 2,
      image: "/images/universities/Tbilisi-University.webp",
      title: "Tbilisi State Medical University",
      description: "Description",
    },
    {
      id: 3,
      image: "/images/universities/ilia-state.jpg",
      title: "Ilia State University",
      description: "Description",
    },
    {
      id: 4,
      image: "/images/universities/Akaki-Tsereteli-State-University-scaled.jpg",
      title: "Akaki Tsereteli State University",
      description: "Description",
    },
    {
      id: 5,
      image: "/images/universities/Belgorod-State-University.jpg",
      title: "Belgorod State National Research University",
      description: "Description",
    },
    {
      id: 6,
      image: "/images/universities/university-of-georgia.jpg",
      title: "The University Of Georgia",
      description: "Description",
    },
  ]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoNextRef = useRef<NodeJS.Timeout | null>(null);

  const TIME_RUNNING = 3000;
  const TIME_AUTO_NEXT = 7000;

  const showSlider = (type: "next" | "prev") => {
    setAnimationType(type);

    setItems((prevItems) => {
      if (type === "next") return [...prevItems.slice(1), prevItems[0]];
      return [prevItems[prevItems.length - 1], ...prevItems.slice(0, -1)];
    });

    setThumbnails((prevThumbs) => {
      if (type === "next") return [...prevThumbs.slice(1), prevThumbs[0]];
      return [prevThumbs[prevThumbs.length - 1], ...prevThumbs.slice(0, -1)];
    });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAnimationType(null), TIME_RUNNING);

    if (autoNextRef.current) clearTimeout(autoNextRef.current);
    autoNextRef.current = setTimeout(() => showSlider("next"), TIME_AUTO_NEXT);
  };

  useEffect(() => {
    autoNextRef.current = setTimeout(() => showSlider("next"), TIME_AUTO_NEXT);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (autoNextRef.current) clearTimeout(autoNextRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen pt-[50px]">
      <div className={`carousel-container ${animationType || ""}`}>
        <div className="list relative w-full h-full">
          {items.map((item) => (
            <div key={item.id} className="carousel-item relative">
              <img src={item.desktop} alt={item.caption} />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.4), rgba(255,255,255,0))",
                }}
              />

              <div className="carousel-content absolute top-[20%] left-[50%] translate-x-[-50%] w-[1140px] max-w-[80%] pr-[30%] text-white">
                <div
                  className="content-title text-[50px] font-bold leading-[1.3em]"
                  style={{ textShadow: "0 5px 10px #0e1221" }}
                >
                  {item.caption}
                </div>

                <div className="content-des text-[15px] mt-4">
                  {item.description}
                </div>

                <div className="content-buttons  gap-[5px] mt-5">
                  <Link
                    className="border-none bg-red-600 text-white  font-medium p-[10px] rounded-sm"
                    to={item.ctaHref}
                  >
                    Explore More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- THUMBNAILS --- */}
        <div className="thumbnail-container absolute bottom-[50px] left-[50%] z-[30] flex gap-5">
          {thumbnails.map((item) => (
            <div
              key={`thumb-${item.id}`}
              className="thumbnail-item w-[150px] h-[220px] flex-shrink-0 relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-[20px]"
              />
              <div
                className="absolute inset-0 rounded-[20px]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.4), rgba(255,255,255,0))",
                }}
              />
              <div className="absolute bottom-[10px] left-[10px] right-[10px] text-white">
                <div className="font-medium text-xs">{item.title}</div>
                <div className="font-light text-[10px]">Description</div>
              </div>
            </div>
          ))}
        </div>

        {/* --- ARROWS --- */}
        <div className="absolute top-[80%] right-[52%] z-[20] w-[300px] max-w-[30%] flex gap-[10px] items-center">
          <button
            onClick={() => showSlider("prev")}
            className="arrow-btn w-[40px] h-[40px] rounded-full bg-[rgba(255,0,0,0.77)] border-none text-white font-bold transition-all duration-500 hover:bg-white hover:text-black"
          >
            &lt;
          </button>
          <button
            onClick={() => showSlider("next")}
            className="arrow-btn w-[40px] h-[40px] rounded-full bg-[rgba(255,0,0,0.77)] border-none text-white font-bold transition-all duration-500 hover:bg-white hover:text-black"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlider;
