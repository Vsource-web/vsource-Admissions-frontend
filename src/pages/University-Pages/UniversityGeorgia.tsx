import { useGeorgia } from "@/components/University/University";
import UniversityLayout from "@/components/University/UniversityLayout";
import { HeroBannerSkeleton } from "@/Loaders/about-us/BannerSkeleton";
import { Link, useParams } from "react-router-dom";

export default function UniversityGeorgia() {
  const { slug } = useParams();
  const { data, isLoading, isError, error, refetch, isPending } = useGeorgia();

  if (isLoading) return <HeroBannerSkeleton />;

  if (isError) {
    return (
      <div className="p-28 text-center flex items-center justify-center flex-col min-h-screen">
        <h2 className="text-2xl font-bold text-red-600 mb-3">
          Failed to Load University Data
        </h2>
        <p className="text-gray-700 mb-5">
          {error?.message || "Something went wrong while fetching data."}
        </p>
        <button
          disabled={isLoading || isPending}
          onClick={() => refetch()}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-10 text-center text-lg text-gray-600 mt-28">
        No universities found for Georgia.
      </div>
    );
  }

  const universityData = data.find((uni) => uni.slug === slug);

  if (!universityData) {
    return (
      <div className="p-10 text-center flex items-center justify-center flex-col min-h-screen bg-gray-300 overflow-hidden">
        <h2 className="text-2xl font-bold text-red-600 mb-3">
          University Not Added Yet
        </h2>
        <p className="text-black mb-5">
          This university is not added yet. It will be available soon.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return <UniversityLayout university={universityData} />;
}
