import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSkeleton = () => {
  return (
    <section className="min-h-screen relative w-full text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-50" />

      {/* === Mobile Layout === */}
      <div className="relative z-10 sm:hidden w-full px-4 pt-28 pb-10">
        <div className="relative z-10 flex flex-col justify-between min-height-full">
          <div className="flex">
            <div className="w-[50%] bg-white/70 backdrop-blur-sm rounded-2xl p-4 space-y-3">
              {/* Title */}
              <Skeleton
                height={24}
                width={`80%`}
                baseColor="#d3d3d3"
                highlightColor="#f1f1f1"
              />

              {/* Small Text */}
              <Skeleton
                height={16}
                width={60}
                baseColor="#d3d3d3"
                highlightColor="#f1f1f1"
              />

              {/* Logo */}
              <Skeleton
                height={50}
                width={80}
                baseColor="#d3d3d3"
                highlightColor="#f1f1f1"
                className="mt-3"
              />

              {/* Paragraph */}
              <Skeleton
                height={35}
                width={`90%`}
                baseColor="#d3d3d3"
                highlightColor="#f1f1f1"
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* === Desktop Layout === */}
      <div className="hidden sm:flex relative items-center mt-28 mb-10">
        <div className="w-full mx-auto max-w-screen-xl px-4 sm:px-6">
          {/* Title */}
          <Skeleton
            height={50}
            width={`50%`}
            baseColor="#cfcfcf"
            highlightColor="#efefef"
          />

          {/* Paragraph */}
          <Skeleton
            height={20}
            width={`70%`}
            baseColor="#cfcfcf"
            highlightColor="#efefef"
            className="mt-4"
          />

          {/* Logo */}
          <div className="flex justify-start pt-6">
            <Skeleton
              height={80}
              width={120}
              baseColor="#cfcfcf"
              highlightColor="#efefef"
            />
          </div>

          {/* CTA Button */}
          <Skeleton
            height={50}
            width={180}
            baseColor="#cfcfcf"
            highlightColor="#efefef"
            className="mt-6"
          />

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Skeleton
              height={24}
              width={120}
              baseColor="#cfcfcf"
              highlightColor="#efefef"
            />
            <Skeleton
              height={24}
              width={150}
              baseColor="#cfcfcf"
              highlightColor="#efefef"
            />
            <Skeleton
              height={24}
              width={180}
              baseColor="#cfcfcf"
              highlightColor="#efefef"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
