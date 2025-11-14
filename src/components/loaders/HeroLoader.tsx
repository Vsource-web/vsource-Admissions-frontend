import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSkeleton = () => {
  return (
    <section className="relative w-full text-white overflow-hidden">
      {/* Desktop Background */}
      <div className="hidden sm:block absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Mobile Background */}
      <div className="relative z-10 sm:hidden w-full px-4 pt-28 pb-10">
        <div className="absolute inset-0 bg-gray-800" />

        {/* Mobile Content */}
        <div className="relative z-10 flex flex-col justify-between min-h-full">
          <div className="flex">
            <div className="w-[50%] bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-3">
              <Skeleton
                height={24}
                width={`80%`}
                baseColor="#ffffff22"
                highlightColor="#ffffff55"
              />
              <Skeleton
                height={16}
                width={60}
                baseColor="#ffffff22"
                highlightColor="#ffffff55"
              />

              <Skeleton
                height={50}
                width={80}
                baseColor="#ffffff22"
                highlightColor="#ffffff55"
                className="mt-3"
              />

              <Skeleton
                height={35}
                width={`90%`}
                baseColor="#ffffff22"
                highlightColor="#ffffff55"
                className="mt-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* === Desktop Layout === */}
      <div className="hidden sm:flex relative items-center mt-28 mb-10">
        <div className="w-full mx-auto max-w-screen-xl px-4 sm:px-6">
          {/* Heading */}
          <Skeleton
            height={50}
            width={`50%`}
            baseColor="#ffffff22"
            highlightColor="#ffffff55"
          />

          {/* Paragraph */}
          <Skeleton
            height={20}
            width={`70%`}
            baseColor="#ffffff22"
            highlightColor="#ffffff55"
            className="mt-4"
          />

          {/* Logo */}
          <div className="flex justify-start pt-6">
            <Skeleton
              height={80}
              width={120}
              baseColor="#ffffff22"
              highlightColor="#ffffff55"
            />
          </div>

          {/* CTA Button */}
          <Skeleton
            height={50}
            width={180}
            baseColor="#ffffff22"
            highlightColor="#ffffff55"
            className="mt-6"
          />

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Skeleton
              height={24}
              width={120}
              baseColor="#ffffff22"
              highlightColor="#ffffff55"
            />
            <Skeleton
              height={24}
              width={150}
              baseColor="#ffffff22"
              highlightColor="#ffffff55"
            />
            <Skeleton
              height={24}
              width={180}
              baseColor="#ffffff22"
              highlightColor="#ffffff55"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
