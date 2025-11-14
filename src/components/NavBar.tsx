import React, { useEffect, useState, useRef, memo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Uni = { name: string; to: string };
type Category = { key: "georgia" | "russia"; label: string; items: Uni[] };

const CATEGORIES: Category[] = [
  {
    key: "georgia",
    label: "MBBS IN GEORGIA",
    items: [
      {
        name: "The University Of Georgia",
        to: "/mbbs-abroad/georgia/university-of-georgia",
      },
      {
        name: "Ken Walker International University",
        to: "/mbbs-abroad/georgia/ken-walker-international-university",
      },
      {
        name: "Tbilisi State Medical University",
        to: "/mbbs-abroad/georgia/tbilisi-state-medical-university",
      },
      {
        name: "Ilia State University",
        to: "/mbbs-abroad/georgia/ilia-state-university",
      },
      {
        name: "Akaki Tsereteli State University",
        to: "/mbbs-abroad/georgia/akaki-tsereteli-state-university",
      },
    ],
  },
  {
    key: "russia",
    label: "MBBS IN RUSSIA",
    items: [
      {
        name: "Belgorod State National Research University",
        to: "/mbbs-abroad/russia/belgorod-state-national-research-university",
      },
    ],
  },
];

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [tab, setTab] = useState<Category["key"]>("georgia");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ddRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onScroll = () => {
        setIsScrolled(window.scrollY > 10);
        const top = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docH > 0 ? (top / docH) * 100 : 0);
      };
      onScroll();
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onDocClick = (e: MouseEvent) => {
        if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
          setOpenDropdown(false);
        }
      };
      document.addEventListener("mousedown", onDocClick);
      return () => document.removeEventListener("mousedown", onDocClick);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const body = document.body;
      if (isOpen) {
        const prev = body.style.overflow;
        body.style.overflow = "hidden";
        return () => {
          body.style.overflow = prev;
        };
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(path + "/");

  const linkCls = (active: boolean) =>
    cn(
      "font-medium tracking-wide px-1 transition-colors",
      active
        ? "text-red-600"
        : isScrolled
        ? "text-black hover:text-red-600"
        : "text-white hover:text-red-600"
    );

  const currentCategory = CATEGORIES.find((c) => c.key === tab)!;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300 py-2",
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 relative z-20">
          <img
            alt="Vsource Logo"
            className="h-16 md:h-20 w-auto object-contain rounded-xl"
            src="/images/vsourcess.webp"
          />
          <img
            src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_200,c_limit,dpr_auto/v1762706239/nav-badge20years_re4asz.webp"
            alt="20 Years Logo"
            className="h-20 md:h-18 ml-3 w-auto object-contain drop-shadow-md"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={linkCls(isActive("/"))}>
            Home
          </Link>
          <Link to="/about" className={linkCls(isActive("/about"))}>
            About
          </Link>
          <div
            className="relative"
            ref={ddRef}
            onMouseEnter={() => setOpenDropdown(true)}
            onMouseLeave={() => setOpenDropdown(false)}
          >
            <button
              type="button"
              onClick={() => setOpenDropdown((v) => !v)}
              className={cn(
                "flex items-center gap-1",
                linkCls(isActive("/mbbs-abroad"))
              )}
            >
              MBBS-ABROAD <ChevronDown className="h-4 w-4" />
            </button>
            <div
              className={cn(
                "fixed left-2/3 -translate-x-1/2 mt-3 w-[720px] max-w-[95vw] grid grid-cols-[220px_1fr] rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-200 z-50",
                openDropdown ? "opacity-100 visible" : "opacity-0 invisible"
              )}
              style={{ top: "5rem" }}
            >
              <div className="p-3 space-y-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.key}
                    onMouseEnter={() => setTab(c.key)}
                    onFocus={() => setTab(c.key)}
                    onClick={() => setTab(c.key)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold transition-colors",
                      tab === c.key
                        ? "text-blue-500 bg-gray-50"
                        : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="p-3">
                <ul className="divide-y">
                  {currentCategory.items.map((u) => (
                    <li key={u.to}>
                      <Link
                        to={u.to}
                        className={cn(
                          "block px-3 py-2 rounded-md text-sm md:text-base transition-colors",
                          isActive(u.to)
                            ? "text-red-600"
                            : "text-gray-900 hover:bg-gray-100 hover:text-red-600"
                        )}
                      >
                        {u.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <NavLink to="/view-360" className={linkCls(isActive("/view-360"))}>
            360_VIEW
          </NavLink>
          <NavLink to="/gallery" className={linkCls(isActive("/gallery"))}>
            GALLERY
          </NavLink>
          <NavLink to="/contact" className={linkCls(isActive("/contact"))}>
            CONTACT
          </NavLink>
        </nav>
        <button
          className={cn(isScrolled ? "text-black" : "text-white", "md:hidden")}
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={40} strokeWidth={3} />
          ) : (
            <Menu size={40} strokeWidth={4} />
          )}
        </button>
      </div>
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-white z-10 transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 pt-28 pb-8 space-y-4">
          <Link
            to="/"
            className={cn(
              "block py-2 text-lg font-medium transition-colors",
              isActive("/")
                ? "text-red-600"
                : "text-gray-800 hover:text-red-600"
            )}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={cn(
              "block py-2 text-lg font-medium transition-colors",
              isActive("/about")
                ? "text-red-600"
                : "text-gray-800 hover:text-red-600"
            )}
          >
            About
          </Link>
          <MobileAccordion label="MBBS-ABROAD">
            <div className="space-y-3 pl-2">
              {CATEGORIES.map((c) => (
                <div key={c.key}>
                  <div className="mt-1 mb-1 text-[11px] font-semibold uppercase text-gray-500">
                    {c.label}
                  </div>
                  <div className="space-y-1">
                    {c.items.map((u) => (
                      <Link
                        key={u.to}
                        to={u.to}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block py-2 text-[15px] font-medium transition-colors",
                          isActive(u.to)
                            ? "text-red-600"
                            : "text-gray-800 hover:text-red-600"
                        )}
                      >
                        {u.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordion>
          <a
            href="https://vsourceoverseas.com/360View/"
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className={cn(
              "block py-2 text-lg font-medium transition-colors",
              isActive("/360-view")
                ? "text-red-600"
                : "text-gray-800 hover:text-red-600"
            )}
          >
            360 View
          </a>
          <Link
            to="/gallery"
            onClick={() => setIsOpen(false)}
            className={cn(
              "block py-2 text-lg font-medium transition-colors",
              isActive("/gallery")
                ? "text-red-600"
                : "text-gray-800 hover:text-red-600"
            )}
          >
            Gallery
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={cn(
              "block py-2 text-lg font-medium transition-colors",
              isActive("/contact")
                ? "text-red-600"
                : "text-gray-800 hover:text-red-600"
            )}
          >
            Contact
          </Link>
          <div className="h-10" />
        </div>
      </div>
    </header>
  );
}

function MobileAccordion({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-gray-200">
      <button
        type="button"
        className="w-full flex items-center justify-between px-3 py-3 font-semibold text-gray-900"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden px-4">{children}</div>
      </div>
    </div>
  );
}

export default memo(Navbar);
