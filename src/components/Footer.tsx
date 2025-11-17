import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useNavData } from "./University/University";

const currentYear = new Date().getFullYear();

function Footer() {
  const { data: CATEGORIES, isLoading, isError, error } = useNavData();

  return (
    <footer className="bg-[rgb(10,11,26)] text-white pt-6 pb-6 overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-5">
            <p className="text-gray-400 mb-4">
              Your trusted educational consultancy with 20+ years of experience
              in university admissions, overseas education, work visas and
              educational loans.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/vsourcembbsabroad"
                className="group"
              >
                <img
                  src="/images/icons/fb.webp"
                  alt="Facebook"
                  className="w-16 h-16 hover:scale-110 transition-transform duration-300"
                />
              </a>
              <a
                href="https://www.instagram.com/vsource_mbbs_abroad/"
                className="group"
              >
                <img
                  src="/images/icons/insta.webp"
                  alt="Instagram"
                  className="w-16 h-16 hover:scale-110 transition-transform duration-300"
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UCNVjrnqI9L873rkB-5_p4kA"
                className="group"
              >
                <img
                  src="/images/icons/yt.webp"
                  alt="YouTube"
                  className="w-16 h-16 hover:scale-110 transition-transform duration-300"
                />
              </a>
              <a
                href="https://in.linkedin.com/company/vsource-company"
                className="group"
              >
                <img
                  src="/images/icons/linked in.webp"
                  alt="LinkedIn"
                  className="w-16 h-16 hover:scale-110 transition-transform duration-300"
                />
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", to: "/" },
                { name: "About", to: "/about" },
                { name: "Gallery", to: "/gallery" },
                { name: "Disclaimer", to: "/" },
                { name: "Contact", to: "/contact" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-xl font-semibold mb-4">Universities</h3>
            {isLoading && (
              <p className="text-gray-500 text-sm">Loading universities...</p>
            )}

            {isError && (
              <p className="text-red-400 text-sm">
                Failed to load universities
              </p>
            )}
            {!isLoading && !isError && (
              <ul className="space-y-2 text-sm">
                {CATEGORIES?.flatMap((category) =>
                  category?.items?.map((uni, id) => (
                    <li key={uni?.to}>
                      <Link
                        to={uni?.to}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {uni?.name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <a
                  href="tel:+919912611119"
                  className="text-gray-400  hover:text-white"
                >
                  +91 99126 11119
                </a>
              </li>
              <li className="flex items-center flex-wrap">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <a
                  href="mailto:Support@vsourceadmissions.com"
                  className="text-gray-400 break-all hover:text-white"
                >
                  Support@vsourceadmissions.com
                </a>
              </li>
              <li className="flex">
                <MapPin className="w-5 h-5 mr-3 text-primary shrink-0 mt-1" />
                <span className="text-gray-400">
                  Near Shashi Hospital, Metro pillar no-1519, Dilsukhnagar,
                  Hyderabad- 500060, Telangana.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 md:pt-8 pt-5">
          <h2 className="text-2xl font-bold mb-6">CORPORATE OFFICE</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-xl">TELANGANA</h4>
              {[
                {
                  name: "DILSUKHNAGAR",
                  address:
                    "Vsource, Near Shashi Hospital, Metro pillar no-1519, Dilsukhnagar, Hyderabad- 500060, Telangana.",
                },
                {
                  name: "AMEERPET",
                  address:
                    "Vsource, Vsource Building, Kamma Sangam lane, Ameerpet, Hyderabad-500073, Telangana.",
                },
                {
                  name: "KPHB- JNTU",
                  address:
                    "Vsource, Beside JNTU Metro station Near ICICI Bank, Hyderabad, Telangana.",
                },
              ].map((branch) => (
                <div key={branch.name} className="mb-2">
                  <h5 className="font-medium text-md">{branch.name}</h5>
                  <p className="text-gray-400 text-sm">{branch.address}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-xl">ANDHRA PRADESH</h4>
              {[
                {
                  name: "VIJAYAWADA",
                  address:
                    "Vsource, 1st floor, Mouli Towers, Beside Reliance Trends, Benz Circle, Vijayawada, Andhra Pradesh.",
                },
                {
                  name: "TIRUPATHI",
                  address:
                    "Vsource, 19-3-1/s, 3rd Floor, Renigunta Rd, Postal Colony, Near Jawa Show Room, Tirupathi - 517501.",
                },
                {
                  name: "VISAKHAPATNAM",
                  address:
                    "Vsource, RK, Annapurna Nilayam 2nd Floor, Opposite Hotel Kamat, Lawson's Bay Colony, Dr NTR Beach Rd, Visakhapatnam, Andhra Pradesh 530017.",
                },
              ].map((branch) => (
                <div key={branch.name} className="mb-2">
                  <h5 className="font-medium text-md">{branch.name}</h5>
                  <p className="text-gray-400 text-sm">{branch.address}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-xl">KARNATAKA</h4>
              {[
                {
                  name: "BENGALURU",
                  address:
                    "Vsource, #88, 9th cross G- Block Sahakar Nagar Bengaluru-560092 Karnataka.",
                },
              ].map((branch) => (
                <div key={branch.name} className="mb-2">
                  <h5 className="font-medium text-md">{branch.name}</h5>
                  <p className="text-gray-400 text-sm">{branch.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {currentYear}{" "}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
              className="text-white hover:underline"
            >
              Vsource Admissions
            </a>{" "}
            All rights reserved.
          </p>

          <div className="flex justify-center md:justify-end space-x-6">
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms and Conditions
            </Link>

            <Link
              to="/disclaimer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
