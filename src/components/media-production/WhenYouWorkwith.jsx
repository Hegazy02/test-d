"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OurOnlineStore = () => {
  return (
    <div className="w-full max-h-[70vh] flex flex-col md:flex-row bg-[#004E53] px-[24px] sm:px-0 sm:mx-0 gap-4 py-5">
      <div className="w-full md:w-1/2 min-h-full flex items-center justify-center order-2 md:order-1">
        <div className="flex flex-col max-w-[550px] w-full px-6 md:px-8 lg:px-10 gap-4">
          <h2 className="h2CSS font-bold text-white">
            When you work with us, you’re not just getting a video or Photo
          </h2>
          <p className="text-lg text-white">
            you're getting a tailored, high-quality solution that enhances your
            brand and message. Here’s why businesses choose us
          </p>
          <Link href="https://darbprint.com/">
            <button
              className="bg-white text-[#004E53] 
                              px-5 py-2.5 sm:px-6 sm:py-3 md:px-[3.5rem] md:py-[0.9rem] 
                              rounded-sm w-fit hover:bg-teal-700 transition 
                              font-bold text-sm sm:text-base md:text-xl"
            >
              Contact Us
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full md:max-w-1/2 md:w-1/2 flex items-center justify-center p-1 md:p-10 order-1 md:order-2">
        <div className="w-[85%]  flex items-center justify-center">
          <Image
            src="/images/media-production/whenyouwork/base.svg"
            alt="Printing Products"
            width={1200}
            height={600}
            sizes="100vw"
            className="rounded-lg object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default OurOnlineStore;
