import Image from "next/image";

export default function AdditionalServicesSection() {
  const additionalServices = [
    {
      title: "Corporate Media",
      image: "/images/homepage/test/sunset-cityscape.png",
    },
    {
      title: "Portrait Photography",
      image: "/images/homepage/test/photography-studio.png",
    },
    {
      title: "Event Videography",
      image: "/images/homepage/test/colorful-concert-lights.png",
    },
  ];

  return (
    <section className="py-10">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
        {additionalServices.map((service, i) => (
          <div
            key={i}
            className="relative h-48 rounded-lg overflow-hidden group"
          >
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-4">
              <h3 className="text-white font-bold">{service.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
