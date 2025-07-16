"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const Header = ({
  title,
  desc,
  buttonName,
  buttonURL,
  imageSRC,
  imageSRC2,
}) => {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const images = [imageSRC, imageSRC2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-[70vh] w-full flex flex-col md:flex-row mt-20">
      {/* Left Content Section */}
      <div className="w-full md:w-1/2 bg-[#F5F5F5] flex flex-col justify-center px-6 py-6 sm:p-8 md:p-10 lg:p-16 xl:p-24 order-2 md:order-1 ">
        <div className="max-w-[604px] mx-auto md:mx-0 md:ml-[2vw] lg:ml-[2vw] flex flex-col gap-5">
          {/* Responsive Heading */}
          <h1
            className="font-['Inter'] font-bold text-[#2F2E0C] tracking-normal"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 3.625rem)",
              lineHeight: "clamp(2rem, 4vw, 4.5rem)",
            }}
          >
            {title}
          </h1>

          {/* Responsive Paragraph */}
          <p
            className="font-['Inter'] font-normal text-[#2F2E0C]
                        text-sm sm:text-base md:text-[17.3px] 
                        leading-relaxed sm:leading-relaxed md:leading-[25.2px] 
                        max-w-[90%] sm:max-w-[535.93px]
                        w-full sm:px-0 sm:mx-0"
          >
            {desc}
          </p>

          {/* Contact Button */}
          <button
            onClick={scrollToContact}
            className="bg-[#07676D] text-white 
                      px-5 py-2.5 sm:px-6 sm:py-3 md:px-[3.5rem] md:py-[0.9rem] 
                      rounded-sm w-fit hover:bg-[#004B4B] transition 
                      font-bold text-sm sm:text-base md:text-xl"
          >
            {buttonName}
          </button>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 relative order-1 md:order-2">
        {/* Mobile: Fixed height with optimized image */}
        <div className="block md:hidden h-[35vh] sm:h-[50vh] relative bg-gray-100">
          {imageSRC2 != "" ? (
            images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className={`object-cover absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                  index === currentImageIndex
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
                priority={index === 0}
                quality={70}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ))
          ) : (
            <Image
              src={imageSRC}
              alt="Printing Products"
              fill
              className="object-cover"
              priority
              quality={70}
              sizes="100vw"
              fetchPriority="high"
            />
          )}
        </div>

        {/* Desktop: Full height */}
        <div className="hidden md:block h-full min-h-[55vh] relative bg-gray-100 ">
          {imageSRC2 != "" ? (
            images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className={`object-cover absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                  index === currentImageIndex
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
                priority={index === 0}
                quality={70}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ))
          ) : (
            <Image
              src={imageSRC}
              alt="Printing Products"
              fill
              className="object-cover"
              priority
              quality={70}
              sizes="50vw"
              fetchPriority="high"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
