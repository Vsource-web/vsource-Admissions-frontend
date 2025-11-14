import HeroLoader from "@/components/loaders/HeroLoader";
import { lazy, Suspense } from "react";
const Hero = lazy(() => import("./Hero"));
const AboutSection = lazy(() => import("./AboutSection"));
const Accreditation = lazy(() => import("./AccreditationSection"));
const TrustSection = lazy(() => import("@/components/home/TrustSection"));
const CertificateSlider = lazy(
  () => import("@/components/home/CertificateSlider")
);
const VideoSection = lazy(() => import("@/components/VideoSection"));
const TestimonialsSection = lazy(
  () => import("@/components/home/TestimonialsSection")
);
const VideoCarousel = lazy(() => import("@/components/home/VideoCarousel"));
const UniversityAnimation = lazy(
  () => import("@/components/animation/UniversityAnimation")
);

function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<HeroLoader />}>
        <Hero />
        <AboutSection />
        <Accreditation />
        <UniversityAnimation />
        <TrustSection />
        <CertificateSlider />
        <VideoSection />
        <VideoCarousel />
        <TestimonialsSection />
      </Suspense>
    </div>
  );
}

export default Home;
