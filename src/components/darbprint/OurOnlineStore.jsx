"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { createLocalizedPath } from "../Nav";

const OurOnlineStore = ({
  title,
  paragraph,
  paragraph2,
  paragraph3,
  buttonNAME,
  ButtonURL,
  imageSRC,
}) => {
  const pathname = usePathname();

  // Check if we're on darbprint or events-management pages
  const isSpecialPage =
    pathname === "/ar/darbprint" ||
    pathname === "/en/darbprint" ||
    pathname === "/ar/events-management" ||
    pathname === "/en/events-management";
  console.log("isspeci", isSpecialPage);
  // Set image max-width based on the page
  const imageMaxWidth = isSpecialPage ? "xl:max-w-[50%]" : "xl:max-w-[75%]";
  return (
    <div className="w-full flex flex-col md:flex-row dark:bg-gradient-to-r from-[#1B2F2E] to-[#1C1C1C] bg-[#F5F5F5] px-4 sm:px-6 md:px-8 lg:px-10 gap-4 py-5 md:py-10">
      <div className="w-full md:w-1/2 flex items-center justify-center order-2 md:order-1">
        <div className="flex flex-col w-full max-w-[90%] sm:max-w-[80%] md:max-w-[550px] lg:max-w-[650px] px-4 sm:px-6 md:px-8 lg:px-10 gap-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {title}
          </h2>
          <p className="text-base sm:text-lg dark:text-white text-gray-500">
            {paragraph}
          </p>
          <p className="text-base sm:text-lg dark:text-white text-gray-500">
            {paragraph2}
          </p>
          {paragraph3 && (
            <p className="text-base sm:text-lg dark:text-white text-gray-500">
              {paragraph3}
            </p>
          )}
          <div className="w-fit relative z-10">
            <Link
              href={createLocalizedPath(ButtonURL, pathname)}
              className="inline-block"
            >
              <Button
                variant="outline"
                className="bg-gray-500/20 dark:text-white text-black  hover:text-white cursor-pointer
            px-5 py-2.5 sm:px-6 sm:py-3 md:px-[2.5rem] md:py-[1.5rem] 
            rounded-2xl w-fit hover:bg-gray-500 transition 
            font-bold border-2 border-gray-500/50 "
              >
                {buttonNAME}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 order-1 md:order-2">
        <div
          className={`w-full max-w-[80%] ${imageMaxWidth} flex items-center justify-center`}
        >
          <Image
            src={imageSRC}
            alt="Printing Products"
            width={1200}
            height={480}
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
            className="rounded-lg object-contain"
            priority
            style={{ pointerEvents: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default OurOnlineStore;
