import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-darkblue to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Branches</h1>
            <p className="text-xl text-gray-300">
              Visit our offices across India for in-person consultations
            </p>
          </div>
        </div>
      </section>

      {/* Branch Locations */}
      <section className="py-16 md:py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                city: "Dilsukhnagar",
                address:
                  "Vsource, Near Shashi Hospital, Metro pillar no-1519, Dilsukhnagar, Hyderabad- 500060, Telangana.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl:
                  "https://www.google.com/maps/place/VSource/@17.3692602,78.519197,17z/data=!3m1!4b1!4m5!3m4!1s0x3bcb98f7d166d455:0x1d4049b98242ba23!8m2!3d17.3692602!4d78.5213857",
                imageUrl:
                  "https://lh3.googleusercontent.com/p/AF1QipMKzDcJJiP9PWWv6TVLljm-1EWGx9fu1R6Fb0qW=w408-h272-k-no",
              },
              {
                city: "Ameerpet",
                address:
                  "Vsource Building, Kamma Sangam lane, Ameerpet, Hyderabad- 500073, Telangana.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl:
                  "https://www.google.com/maps/place/Vsource+Overseas+Consultants+Pvt+Ltd",
                imageUrl:
                  "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v169763103616/gipsmkbbewuew7kh690d.jpg",
              },
              {
                city: "KPHB - JNTU",
                address:
                  "Beside JNTU Metro station Near ICICI Bank, Hyderabad, Telangana.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl:
                  "https://www.google.com/maps/place/Vsource+Overseas+Consultants+Pvt+Ltd",
                imageUrl: "/images/branches/jntu branch.jpg",
              },
              {
                city: "Vijayawada",
                address:
                  "1st floor, Mouli Towers, Beside Reliance Trends, Benz Circle, Vijayawada, AP.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl:
                  "https://www.google.com/maps/place/VSource+Educational+Consultants+Pvt+Ltd",
                imageUrl: "/images/branches/vijaywada branch.jpeg",
              },
              {
                city: "Visakhapatnam",
                address:
                  "Annapurna Nilayam 2nd Floor, Opp Hotel Kamat, Lawson's Bay Colony, Visakhapatnam, AP.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl:
                  "https://www.google.com/maps/place/Annapurna+Nilayam/@17.7260105,83.3154943,15z/data=!4m10!1m2!2m1!1sAnnapurna+Nilayam+2nd+Floor,+Opp+Hotel+Kamat,+Lawson's+Bay+Colony,+Visakhapatnam,+AP.!3m6!1s0x3a3943003fa4956b:0xc818085c92e6c50c!8m2!3d17.7260105!4d83.3345487!15sClVBbm5hcHVybmEgTmlsYXlhbSAybmQgRmxvb3IsIE9wcCBIb3RlbCBLYW1hdCwgTGF3c29uJ3MgQmF5IENvbG9ueSwgVmlzYWtoYXBhdG5hbSwgQVAukgESYXBhcnRtZW50X2J1aWxkaW5nqgHPARABKlQiUGFubmFwdXJuYSBuaWxheWFtIDJuZCBmbG9vciBvcHAgaG90ZWwga2FtYXQgbGF3c29uJ3MgYmF5IGNvbG9ueSB2aXNha2hhcGF0bmFtIGFwKAAyHxABIhvuhInUa5mDOARt2VWc3lqHzM6Cr3G5c1dyBg0yVBACIlBhbm5hcHVybmEgbmlsYXlhbSAybmQgZmxvb3Igb3BwIGhvdGVsIGthbWF0IGxhd3NvbidzIGJheSBjb2xvbnkgdmlzYWtoYXBhdG5hbSBhcOABAA!16s%2Fg%2F11vxmf0vlw?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D",
                imageUrl:
                  "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1763103829/p9rbcd5ihlkr3wxn3x4k.jpg",
              },
              {
                city: "Tirupathi",
                address:
                  "19-3-1/s, 3rd Floor, Renigunta Rd, Near Jawa showroom, Tirupathi - 517501.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl:
                  "https://www.google.com/maps/place/Vsource+tirupathi",
                imageUrl: "/images/branches/tirupati branch.jpeg",
              },

              {
                city: "Bengaluru",
                address:
                  "#88, 9th cross G-Block, Sahakar Nagar, Bengaluru-560092, Karnataka.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl:
                  "https://www.google.com/maps/place/VSOURCE+BENGALURU",
                imageUrl:
                  "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1763103616/eyhy0tiintaiqqd3d7jq.jpg",
              },
            ].map((branch, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-56 bg-gray-200">
                    {branch.imageUrl ? (
                      <img
                        src={branch.imageUrl}
                        alt={`${branch.city} Branch`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <MapPin className="h-10 w-10 text-primary/60" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between flex-grow p-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        {branch.city} Branch
                      </h3>
                      <div className="space-y-3">
                        <div className="flex">
                          <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-700">
                            {branch.address}
                          </span>
                        </div>
                        <div className="flex">
                          <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{branch.phone}</span>
                        </div>
                        <div className="flex">
                          <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{branch.email}</span>
                        </div>
                        <div className="flex">
                          <Clock className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{branch.hours}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={branch.locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded font-medium transition-colors inline-flex items-center justify-center"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/*       */}
    </>
  );
};

export default ContactPage;
