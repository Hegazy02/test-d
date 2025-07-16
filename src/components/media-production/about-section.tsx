import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  return (
    <section className="py-6 sm:py-16 bg-[#f8f9fa] px-[7px] sm:px-0 sm:mx-0">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="h2CSS">About us</h2>
          <p className="text-gray-700">
            Founded in 2011 in Riyadh, Darb Productions began as a specialized
            media production house. Over the years, we have grown and expanded
            to adapt to changes in the market, evolving into a comprehensive
            media solutions provider.
          </p>
          <p className="text-gray-700">
            Our services now include media production, event management,
            printing solutions, and custom exhibition booth fabrication. In
            2018, the company opened a branch in Dubai, United Arab Emirates, to
            better serve clients across the Gulf region.
          </p>
          <p className="text-gray-700">
            Continuing its growth, Darb Productions launched its team in Jeddah,
            confirming its ability to service high-profile, fully customized
            print solutions with greater efficiency and control.
          </p>
          <p className="text-gray-700">
            After a clear vision and a commitment to excellence, Darb
            Productions has become one of the most trusted production partners
            in both Saudi Arabia and the UAE.
          </p>
          <Button
            variant="outline"
            className="bg-[#823548] text-white 
            px-5 py-2.5 sm:px-6 sm:py-3 md:px-[2.5rem] md:py-[1.5rem] 
            rounded-sm w-fit hover:bg-[#682a39] transition 
            font-bold "
          >
            Read more
          </Button>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="/images/homepage/aboutus/base.webp"
            alt="Darb Productions Office"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
