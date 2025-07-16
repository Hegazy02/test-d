"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

// Define service data for better maintainability
const services = [
  {
    id: "media-production",
    title: "Media Production",
    features: [
      "Interview Production",
      "Documentary Film Production",
      "Podcast Production",
      "Advertising Production",
      "Portrait Photography",
      "Event Photography",
    ],
    image: "/images/homepage/OurServices/S1.png",
    alt: "Media Production Services",
  },
  {
    id: "corporate-events",
    title: "Corporate Events",
    features: [
      "End-to-End Event Production",
      "LED Screen Rental",
      "Professional Sound System Rental",
      "On-Ground Event Operations",
      "Guest Experience Management",
      "Stage & Lighting Design",
      "Venue Branding & Setup",
    ],
    image: "/images/homepage/OurServices/S2.png",
    alt: "Corporate Events Services",
  },
  {
    id: "printing",
    title: "Printing",
    features: [
      "Gift Items",
      "Small Format Printing",
      "Wide Format Printing",
      "Sign Boards",
      "Roll-up & Pop-up Banners",
      "Stickers & Labels",
      "Custom Packaging",
      "Promotional Materials",
    ],
    image: "/images/homepage/OurServices/S3.png",
    alt: "Printing Services",
  },
  {
    id: "booth-production",
    title: "Booth Production",
    features: [
      "Custom Booth Design",
      "Full Construction & Installation",
      "3D Visualization & Mockups",
      "Lighting & Display Integration",
      "Interactive Elements & Touchpoints",
      "On-Site Support & Maintenance",
    ],
    image: "/images/homepage/OurServices/S4.png",
    alt: "Booth Production Services",
  },
];

export default function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="bg-white mb-10 px-[7px] sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        {/* Heading with semantic markup for SEO */}
        <header className="text-center mx-auto mb-4 md:mb-8 max-w-[1070px]">
          {/* للكمبيوتر */}
          <h2
            id="services-heading"
            className="text-[28px] sm:text-[36px] md:text-[46px] leading-tight md:leading-[52px] tracking-[0.92px] text-[#2F2E0C] mt-5 sm:mt-5 hidden sm:block"
            style={{
              fontSize: "clamp(1rem, 2vw, 3rem)",
              lineHeight: "clamp(2rem, 4vw, 4.5rem)",
            }}
          >
            <span className="font-bold">Our Services</span>{" "}
            <span className="font-normal">
              Comprehensive printing solutions tailored for businesses, events,
              and government needs.
            </span>
          </h2>
          {/* للتليفون */}
          <h2
            id="services-heading"
            className="text-[28px] sm:hidden leading-tight md:leading-[52px] tracking-[0.92px] text-[#2F2E0C] mt-5 sm:mt-5 "
          >
            <div className="font-bold h2CSS">Our Services</div>
            <div className="h2-description-text">
              Comprehensive printing solutions tailored for businesses, events,
              and government needs.
            </div>
          </h2>
        </header>

        {/* Service cards grid with the same responsive layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 lg:gap-10">
          {services.map((service) => (
            <Card
              key={service.id}
              className="bg-white shadow-md overflow-hidden h-full flex flex-col border-0 rounded-none"
            >
              <div className="w-full relative h-[180px] overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.alt}
                  fill
                  className="object-cover w-full h-full"
                  priority={true}
                  quality={75}
                  sizes="(max-width: 1023px) 50vw, 25vw"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
              </div>

              <CardContent className="p-4 sm:p-5 flex-grow">
                <h3 className="text-sm sm:text-lg font-bold text-[#2F2E0C] mb-2">
                  {service.title}
                </h3>
                <ul className="list-disc pl-2 sm:pl-5 space-y-1 text-[10px] sm:text-sm sm:text-md text-[#2F2E0C]">
                  {service.features.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
