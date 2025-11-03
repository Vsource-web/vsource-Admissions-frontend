import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  desktop: string;
  mobile: string;
  caption: string;
  ctaHref?: string;
  ctaText?: string;
};

const slides: Slide[] = [
  {
    desktop: "/images/universities/university-of-georgia.jpg",
    mobile: "/images/universities/university-of-georgia-mobile.jpg",
    caption: "The University Of Georgia",
    ctaHref: "/mbbs-abroad/georgia/university-of-georgia",
    ctaText: "Explore More",
  },
  {
    desktop:
      "/images/universities/ken-walker-international-university.jpg",
    mobile:
      "/images/universities/ken-walker-international-university-mobile.jpg",
    caption: "Ken Walker International University",
    ctaHref: "/mbbs-abroad/georgia/ken-walker-international-university",
    ctaText: "Explore More",
  },
  {
    desktop: "/images/universities/Tbilisi State Medical University.webp",
    mobile:
      "/images/universities/Tbilisi-State-Medical-University-mobile.jpg",
    caption: "Tbilisi State Medical University",
    ctaHref: "/mbbs-abroad/georgia/tbilisi-state-medical-university",
    ctaText: "Explore More",
  },
  {
    desktop: "/images/universities/ilia-state-university.jpg",
    mobile: "/images/universities/ilia-state-university-mobile.jpg",
    caption: "Ilia State University",
    ctaHref: "/mbbs-abroad/georgia/ilia-state-university",
    ctaText: "Explore More",
  },
  {
    desktop:
      "/images/universities/Akaki-Tsereteli-State-University-scaled.jpg",
    mobile:
      "/images/universities/Akaki-Tsereteli-State-University-mobile.jpg",
    caption: "Akaki Tsereteli State University",
    ctaHref: "/mbbs-abroad/georgia/akaki-tsereteli-state-university",
    ctaText: "Explore More",
  },
  {
    desktop:
      "/images/universities/Belgorod State National Research University.jpg",
    mobile:
      "/images/universities/Belgorod-State-National-Research-University-mobile.jpg",
    caption: "Belgorod State National Research University",
    ctaHref: "/mbbs-abroad/russia/belgorod-state-national-research-university",
    ctaText: "Explore More",
  },
];

const Journey: React.FC = () => {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  // Utility: double refresh to settle layout after mount/resize
  const hardRefresh = () => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
      requestAnimationFrame(() => ScrollTrigger.refresh(true));
    });
  };

  useLayoutEffect(() => {
    const pinEl = pinRef.current;
    if (!pinEl) return;

    // panels & parts
    const panels = Array.from(
      pinEl.querySelectorAll<HTMLElement>(".loop-panel")
    );
    const bgs = panels.map((p) => p.querySelector<HTMLElement>(".loop-bg"));
    const caps = panels.map((p) =>
      p.querySelector<HTMLElement>(".loop-caption")
    );

    // Base layout (all stacked). We’ll drive visibility/z-index/pointerEvents manually.
    gsap.set(panels, {
      position: "absolute",
      inset: 0,
      willChange: "transform, opacity",
      pointerEvents: "none", // start disabled; we'll enable on active slides
      zIndex: 1,
      autoAlpha: 0,
      scale: 1.02,
    });
    if (panels[0])
      gsap.set(panels[0], {
        zIndex: 3,
        autoAlpha: 1,
        scale: 1,
        pointerEvents: "auto",
      });
    bgs.forEach((bg, i) => bg && gsap.set(bg, { yPercent: i === 0 ? 0 : 12 }));
    caps.forEach(
      (c, i) =>
        c && gsap.set(c, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 })
    );

    const totalSteps = panels.length - 1;

    // One ScrollTrigger that maps progress -> blend between index i and i+1
    const st = ScrollTrigger.create({
      trigger: pinEl,
      start: "top top",
      end: `+=${panels.length * 100}%`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      fastScrollEnd: false,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress * totalSteps; // 0..(n-1)
        const i = Math.max(0, Math.min(totalSteps, Math.floor(p)));
        const t = p - i; // 0..1 between current and next

        const cur = panels[i];
        const nxt = panels[i + 1];

        // Disable all non-active panels
        panels.forEach((el, idx) => {
          if (idx !== i && idx !== i + 1) {
            gsap.set(el, {
              autoAlpha: 0,
              zIndex: 1,
              scale: 1.02,
              pointerEvents: "none",
            });
            const c = caps[idx];
            const bg = bgs[idx];
            if (c) gsap.set(c, { autoAlpha: 0, y: 20 });
            if (bg) gsap.set(bg, { yPercent: 12 });
          }
        });

        // current fades out
        if (cur) {
          gsap.set(cur, {
            zIndex: 2,
            autoAlpha: 1 - t,
            scale: 1 + 0.02 * t,
            pointerEvents: "auto",
          });
          const ccap = caps[i];
          const cbg = bgs[i];
          if (ccap) gsap.set(ccap, { autoAlpha: 1 - t, y: -15 * t });
          if (cbg) gsap.set(cbg, { yPercent: -12 * t });
        }

        // next fades in
        if (nxt) {
          gsap.set(nxt, {
            zIndex: 3,
            autoAlpha: t,
            scale: 1.02 - 0.02 * t,
            pointerEvents: "auto",
          });
          const ncap = caps[i + 1];
          const nbg = bgs[i + 1];
          if (ncap) gsap.set(ncap, { autoAlpha: t, y: 15 * (1 - t) });
          if (nbg) gsap.set(nbg, { yPercent: 12 * (1 - t) });
        }
      },
    });

    stRef.current = st;
    hardRefresh();

    // Optional: keyboard stepping between slides
    const onKey = (e: KeyboardEvent) => {
      const stLocal = stRef.current;
      if (!stLocal) return;
      const dir =
        e.code === "ArrowDown" || e.code === "PageDown" || e.code === "Space"
          ? 1
          : e.code === "ArrowUp" || e.code === "PageUp"
          ? -1
          : 0;
      if (!dir) return;

      const steps = totalSteps;
      const currentStep = Math.round(stLocal.progress * steps);
      const targetStep = Math.min(steps, Math.max(0, currentStep + dir));
      const targetProgress = targetStep / steps;
      gsap.to(stLocal, {
        progress: targetProgress,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      st.kill();
      stRef.current = null;
      // Ensure no leftover pin-spacer/measurements
      requestAnimationFrame(() => ScrollTrigger.refresh(true));
    };
  }, []);

  useEffect(() => {
    // In case images load after mount, do a safety refresh.
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative w-full">
      {/* ---- Heading area (NOT over the images) ---- */}
      <div className="w-full flex items-center justify-center px-4 pt-10 pb-6">
        <h2
          className="text-center font-extrabold"
          style={{
            color: "#0F172A",
            fontSize: "clamp(1.125rem, 3.6vw, 2.5rem)",
            lineHeight: 1.2,
            letterSpacing: "0.02em",
          }}
        >
          Start your Journey in
        </h2>
      </div>

      {/* ---- Pinned slider area (images live here) ---- */}
      <div
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden"
        style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
      >
        {slides.map((s, idx) => (
          <div key={idx} className="loop-panel">
            {/* Background layer (parallax target) */}
            <div className="loop-bg absolute inset-0 w-full h-full">
              <picture>
                <source media="(max-width: 768px)" srcSet={s.mobile} />
                <img
                  src={s.desktop}
                  alt={s.caption}
                  className="w-full h-full object-cover select-none"
                  loading={idx === 0 ? "eager" : "lazy"}
                  draggable={false}
                />
              </picture>
              {/* Subtle overlay for caption legibility — doesn't catch clicks */}
              <div
                className="absolute inset-0"
                style={{
                  background: "rgba(0,0,0,0.18)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Centered caption/CTA (ensure it can receive clicks) */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div
                className="loop-caption text-center max-w-4xl"
                style={{ pointerEvents: "auto" }}
              >
                <h3
                  className="text-white font-extrabold leading-tight"
                  style={{
                    fontSize: "clamp(1.1rem, 4.2vw, 3rem)",
                    lineHeight: 1.15,
                    textShadow: "0 3px 16px rgba(0,0,0,0.35)",
                  }}
                >
                  {s.caption}
                </h3>
                {s.ctaHref && (
                  <a
                    href={s.ctaHref}
                    className="inline-block mt-5 rounded-lg px-6 py-3 font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                  >
                    {s.ctaText || "Explore More"}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Journey;
