// StudentWall.jsx
import { Students } from "@/lib/types/Gallery";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { toast } from "sonner";

const studentImages = [
  // Replace with real image URLs or import from Supabase
  "/images/students/1.jpeg",
  "/images/students/1.jpg",
  "/images/students/2.jpeg",
  "/images/students/3.jpeg",
  "/images/students/4.jpeg",

  "/images/students/8.jpeg",
  "/images/students/9.jpeg",
  "/images/students/10.jpeg",
  "/images/students/11.jpeg",
  "/images/students/12.jpeg",
  "/images/students/13.jpeg",
  "/images/students/14.jpg",

  "/images/students/16.jpeg",
  "/images/students/17.jpeg",
  "/images/students/18.jpeg",
  "/images/students/19.jpeg",
  "/images/students/20.jpeg",
  "/images/students/21.jpeg",
  "/images/students/22.jpeg",
  "/images/students/23.jpeg",
  "/images/students/24.jpeg",
  "/images/students/25.jpeg",
  "/images/students/26.jpeg",
  "/images/students/27.jpeg",
  "/images/students/28.jpeg",
  "/images/students/29.jpeg",
  "/images/students/30.jpeg",
  "/images/students/31.jpeg",
  "/images/students/32.jpeg",
  "/images/students/33.jpeg",
  // '/images/students/34.jpeg',
  "/images/students/35.jpeg",

  "/images/students/36.jpg",
  "/images/students/37.jpg",
  "/images/students/38.jpg",
  "/images/students/39.jpg",
  "/images/students/40.jpg",
  "/images/students/41.jpg",

  "/images/students/43.jpg",
  "/images/students/44.jpg",
  "/images/students/45.jpg",
  "/images/students/46.jpg",
  "/images/students/47.jpg",
  "/images/students/48.jpg",
  "/images/students/49.jpg",
  "/images/students/50.jpg",
  "/images/students/51.jpg",
  "/images/students/52.jpg",
  "/images/students/53.jpg",
  "/images/students/54.jpg",
  "/images/students/55.jpg",
  "/images/students/56.jpg",
  "/images/students/57.jpg",
  "/images/students/58.jpg",
  "/images/students/59.jpg",
  "/images/students/60.jpg",
  "/images/students/61.jpg",
  "/images/students/62.jpg",
  "/images/students/63.jpg",
  "/images/students/64.jpg",
  "/images/students/65.jpg",
  "/images/students/66.jpg",
  "/images/students/67.jpg",
  "/images/students/68.jpg",
  "/images/students/69.jpg",
  "/images/students/70.jpg",
  "/images/students/71.jpg",
  "/images/students/72.jpg",
  "/images/students/73.jpg",

  "/images/students/75.jpg",
  // '/images/students/76.jpg',
  "/images/students/77.jpg",
  "/images/students/78.jpg",
  "/images/students/79.jpg",
  "/images/students/80.jpg",
  "/images/students/81.jpg",
  "/images/students/82.jpg",
  "/images/students/83.jpg",
  "/images/students/84.jpg",
  "/images/students/85.jpg",

  // Add as many as needed...
];

export const fetchStudents = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/gallery?populate[blocks][on][gallery.student-images][populate][students_images][fields][0]=url&populate[blocks][on][gallery.student-images][populate][students_images][fields][1]=name&populate[blocks][on][gallery.student-images][populate][students_images][fields][2]=alternativeText&populate[blocks][on][gallery.student-images][populate][students_images][fields][3]=documentId`
  );
  return data.data.blocks[0] || {};
};

const StudentWall = () => {
  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useQuery<Students>({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  if (isError) {
    toast.error("failed to load students");
    console.error("failed to students", error);
    return null;
  }

  if (isLoading || !students) {
    return <BannerSkeleton />;
  }

  return (
    <section className="student-wall-section">
      <div className="student-wall">
        {/* Top Card */}
        <div className="info-card top-card">
          {students?.card_title || (
            <>
              {" "}
              <h2>S U C C E S S</h2>
              <p>OF VSOURCE</p>
            </>
          )}
        </div>

        {/* Student Image Grid */}
        <div className="student-grid">
          {students &&
            students?.students_images &&
            students?.students_images.map((img, index) => (
              <img
                key={img?.id || index}
                src={`${img?.url}`}
                alt={`Student ${index + 1}`}
              />
            ))}
        </div>

        {/* Bottom Card */}
        <div className="info-card bottom-card">
          {students?.card_title1 || (
            <>
              <h2>
                TRUSTED BY <span>100000+</span>
              </h2>
              <p>STUDENTS</p>
            </>
          )}
        </div>
      </div>
      <style>{`
       /* StudentWall.css */

.student-wall-section {
  background: #fff;
  padding: 0;
  position: relative;
  overflow: hidden;
}

.student-wall {
  position: relative;
  max-width: 1200px;
  margin: auto;
  padding: 2rem 0;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  padding: 0 20px;
}

.student-grid img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0,0,0,0.2);
}

.info-card {
  position: absolute;
  width: 100%;
  text-align: center;
  color: white;
  padding: 20px 0;
  background-color: rgba(255, 165, 0, 0.8);
  font-family: Arial, sans-serif;
  z-index: 2;
}
@media (max-width: 768px) {
  .student-grid {
    grid-template-columns: repeat(6, 1fr) !important;
  }
}
.top-card {
  top: 20%;
  transform: translateY(-50%);
}

.bottom-card {
  bottom: 40%;
  transform: translateY(50%);
}

.info-card h2 {
    font-size: 2rem;
    letter-spacing: 5px;
    margin: 0;
    font-weight:500 !important;
}

.info-card p {
  font-size: 1.2rem;
  margin: 5px 0 0 0;
}

.bottom-card h2 span {
  
  font-size: 2.5rem;
}


      `}</style>
    </section>
  );
};

export default StudentWall;
