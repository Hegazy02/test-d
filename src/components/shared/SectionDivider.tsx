import Image from "next/image";

export default function SectionDivider() {
  return (
    <div className="w-full flex justify-center items-center relative py-8 md:py-12">
      {/* Dark Mode Line */}
      <div className="absolute min-w-full h-[2px] hidden dark:block">
        <Image
          src="/images/Line.png"
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Light Mode Line */}
      <div className="absolute min-w-full h-[2px] block dark:hidden">
        <Image
          src="/images/LineLight.png"
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
      </div>
    </div>
  );
}
