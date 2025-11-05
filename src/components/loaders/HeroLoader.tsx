import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroLoader = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* === Desktop Skeleton === */}
      <div className="hidden sm:flex relative items-center mt-28 mb-10">
        <div className="w-full mx-auto max-w-screen-xl px-4 sm:px-6 text-left space-y-4">
          <Skeleton height={60} width="60%" borderRadius={10} />
          <Skeleton height={20} width="80%" count={2} borderRadius={8} />
          <Skeleton height={80} width={160} borderRadius={12} />
          <Skeleton height={50} width={250} borderRadius={8} />
          <div className="flex flex-wrap gap-4 pt-4">
            <Skeleton height={20} width={150} borderRadius={6} />
            <Skeleton height={20} width={180} borderRadius={6} />
            <Skeleton height={20} width={200} borderRadius={6} />
          </div>
        </div>
      </div>

      {/* === Mobile Skeleton === */}
      <div className="relative z-10 sm:hidden w-full px-4 pt-28 pb-10">
        <div className="w-[70%] bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-3 mb-5">
          <Skeleton height={30} width="100%" borderRadius={6} />
          <Skeleton height={25} width="70%" borderRadius={6} />
          <div className="flex space-x-2 mt-2">
            <Skeleton circle height={24} width={24} />
            <Skeleton circle height={24} width={24} />
          </div>
          <Skeleton height={15} count={2} borderRadius={4} />
          <Skeleton height={60} width={80} borderRadius={10} />
          <Skeleton height={35} width={160} borderRadius={8} />
        </div>
      </div>
    </section>
  );
};

export default HeroLoader;
