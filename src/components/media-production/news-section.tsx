"use client";

import Image from "next/image";

export default function NewsSection() {
  const newsItems = [
    {
      id: 1,
      image: "/images/homepage/news/2.webp",
      title:
        "Darb Productions held the opening event for the Business Outsourcing Center.",
      link: "/news/business-outsourcing-center",
    },
    {
      id: 2,
      image: "/images/homepage/news/3.webp",
      title:
        "Darb Productions Implemented the live broadcast of the listing of Americana simultaneously between Saudi Arabia and UAE",
      link: "/news/americana-listing",
    },
    {
      id: 3,
      image: "/images/homepage/news/1.webp",
      title:
        "Darb Productions Provides the media coverage of the first Saudi Accountants Conference",
      link: "/news/saudi-accountants-conference",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="px-[30px] sm:container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="h2CSS mb-2">Darb News</h2>
          <p className="h2-description-text">
            The latest updates and news about Darb Productions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-4">
                <p className="text-[#004549] font-medium leading-tight text-sm">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
