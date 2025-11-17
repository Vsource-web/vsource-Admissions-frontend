import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "sonner";

import NotFound from "./pages/NotFound";
import Footer from "@/components/Footer";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Navbar from "@/components/NavBar";
import HeroLoader from "./components/loaders/HeroLoader";

const Home = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const View360 = lazy(() => import("./pages/View360"));
const Contact = lazy(() => import("./pages/Contact"));

const ContactBar = lazy(() => import("./components/ContactBar"));
const DelayedPopup = lazy(() => import("./components/DelayedPopup"));

const UniversityGeorgia = lazy(
  () => import("./pages/University-Pages/UniversityGeorgia")
);

const UniversityOfRussia = lazy(
  () => import("./pages/University-Pages/UniversityOfRussia")
);

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
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [showFormIcon, setShowFormIcon] = useState(false);

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

  // AOS init
  useEffect(() => {
    AOS.init({ once: false, mirror: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main>
        <Suspense fallback={<HeroLoader />}>
          <Routes>
            {/* MAIN ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/view-360" element={<View360 />} />

            {/* UNIVERSITY PAGES */}
            <Route
              path="/mbbs-abroad/georgia/:slug"
              element={<UniversityGeorgia />}
            />
            <Route
              path="/mbbs-abroad/russia/:slug"
              element={<UniversityOfRussia />}
            />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/disclaimer" element={<Disclaimer />} />

            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* CONTACT BAR (lazy) */}
          <ContactBar />
        </Suspense>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* SCROLL TO TOP BUTTON */}
      <ScrollToTopButton
        showFormIcon={showFormIcon}
        onFormIconClick={() => {
          setShowForm(true);
          setShowFormIcon(false);
        }}
      />

      {/* POPUP FORM */}
      {showForm && (
        <Suspense fallback={<div />}>
          <DelayedPopup
            onMinimize={() => {
              setShowForm(false);
              setShowFormIcon(true);
            }}
          />
        </Suspense>
      )}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
