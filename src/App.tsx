import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import NotFound from "./pages/NotFound";
import { Footer } from "./components/ui/footer";
import ScrollToTop from "./ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTopButton from "./components/ScrollToTopButton";
import DelayedPopup from "./components/DelayedPopup";
import Navbar from "./components/ui/navbar";
import { Toaster } from "sonner";
import UniversityGeorgia from "./pages/University-Pages/UniversityGeorgia";
import UniversityKenWalker from "./pages/University-Pages/UniversityKenWalker";
import UniversityTbilisiStateMedical from "./pages/University-Pages/UniversityTbilisiStateMedical";
import UniversityIliaState from "./pages/University-Pages/UniversityIliaState";
import UniversityAkakiTsereteliState from "./pages/University-Pages/UniversityAkakiTsereteliState";
import UniversityBelgorodStateNationalResearch from "./pages/University-Pages/UniversityBelgorodStateNationalResearch";
import HeroLoader from "./components/loaders/HeroLoader";

const Home = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
=======
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Disclaimer from "./pages/Disclaimer";
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const View360 = lazy(() => import("./pages/View360"));
const Contact = lazy(() => import("./pages/Contact"));
const ContactBar = lazy(() => import("./components/ContactBar"));
const GoVirtual = lazy(() => import("./services/GoVirtual"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      retry: false,
    },
  },
});

const AppContent = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation(); //
  const [showFormIcon, setShowFormIcon] = useState(false);
  const isGoVirtualPage = location.pathname === "/meeting";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollTop / docHeight >= 0.2) {
        setShowForm(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({ once: false, mirror: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <Layout>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {!isGoVirtualPage && <Navbar />}
        <main>
          <Suspense fallback={<HeroLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/view-360" element={<View360 />} />
              <Route
                path="/mbbs-abroad/georgia/university-of-georgia"
                element={<UniversityGeorgia />}
              />
              <Route
                path="/mbbs-abroad/georgia/ken-walker-international-university"
                element={<UniversityKenWalker />}
              />
              <Route
                path="/mbbs-abroad/georgia/tbilisi-state-medical-university"
                element={<UniversityTbilisiStateMedical />}
              />
              <Route
                path="/mbbs-abroad/georgia/tbilisi-state-medical-university"
                element={<UniversityTbilisiStateMedical />}
              />
              <Route
                path="/mbbs-abroad/georgia/ilia-state-university"
                element={<UniversityIliaState />}
              />
              <Route
                path="/mbbs-abroad/georgia/akaki-tsereteli-state-university"
                element={<UniversityAkakiTsereteliState />}
              />
              <Route
                path="/mbbs-abroad/russia/belgorod-state-national-research-university"
                element={<UniversityBelgorodStateNationalResearch />}
              />

              <Route path="/meeting" element={<GoVirtual />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/disclaimer" element={<Disclaimer />} />
            </Routes>
          </Suspense>
        </main>

        {!isGoVirtualPage && <ContactBar />}
        {!isGoVirtualPage && <Footer />}

        <ScrollToTopButton
          showFormIcon={showFormIcon}
          onFormIconClick={() => {
            setShowForm(true);
            setShowFormIcon(false);
          }}
        />

        {showForm && (
          <DelayedPopup
            onMinimize={() => {
              setShowForm(false);
              setShowFormIcon(true);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

const App = () => {
  // Init AOS
  useEffect(() => {
    AOS.init({ once: false, mirror: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
