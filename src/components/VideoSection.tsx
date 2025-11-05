import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import SectionTitle from "./SectionTitle";
import AnimateOnScroll from "./AnimateOnScroll";
import { Company } from "@/lib/types/LandingPage";

const fetchCompanyVideo = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/landing-pages?populate[Sections][on][blocks.company][populate][thumbnail][fields][0]=url&populate[Sections][on][blocks.company][populate][thumbnail][fields][1]=alternativeText&populate[Sections][on][blocks.company][populate][video][fields][0]=url&populate[Sections][on][blocks.company][populate][video][fields][1]=alternativeText`
  );

  return data.data[0].Sections[0];
};

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    data: video,
    isLoading,
    isError,
    error,
  } = useQuery<Company>({
    queryKey: ["company"],
    queryFn: fetchCompanyVideo,
    staleTime: Infinity,
  });

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (isError) {
    toast.error("failed to load");
    console.log("failed to load", error);
    return null;
  }

  if (isLoading || !video) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-9 md:py-22 bg-gray-50">
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <SectionTitle
          title={video?.title || "Company Video"}
          subtitle={
            video?.description ||
            "Get to know us better through our corporate presentation"
          }
        />

        <AnimateOnScroll>
          <div className="mt-10 relative overflow-hidden rounded-xl shadow-2xl max-w-4xl mx-auto aspect-video">
            {isPlaying ? (
              // <iframe
              //   className="w-full h-full"
              //   src={
              //     `${import.meta.env.VITE_CMS_GLOBALURL}${video?.video?.url}` ||
              //     "https://www.youtube.com/embed/IbjoEr-lTuw?autoplay=1"
              //   }
              //   title="Company Video"
              //   frameBorder="0"
              //   allow="autoplay; encrypted-media"
              //   allowFullScreen
              // />
              <iframe
                className="w-full h-full"
                src={
                  video?.video?.url
                    ? `${import.meta.env.VITE_CMS_GLOBALURL}${
                        video?.video?.url
                      }`
                    : "https://www.youtube.com/embed/IbjoEr-lTuw?autoplay=1"
                }
                title="Company Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <div
                className="absolute inset-0 bg-darkblue/10 flex items-center justify-center group cursor-pointer"
                onClick={handlePlay}
              >
                <img
                  src={
                    video?.thumbnail?.url
                      ? `${import.meta.env.VITE_CMS_GLOBALURL}${
                          video?.thumbnail?.url
                        }`
                      : "https://img.youtube.com/vi/IbjoEr-lTuw/maxresdefault.jpg"
                  }
                  alt="Company Video Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold">CHARAN TEJA</h3>
                  <p className="text-white/80">CEO, Vsource Company</p>
                </div> */}
              </div>
            )}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default VideoSection;
