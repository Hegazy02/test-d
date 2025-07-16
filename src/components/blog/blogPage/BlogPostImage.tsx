import Image from "next/image";

interface BlogPostImageProps {
  image: string;
  title: string;
}

export default function BlogPostImage({ image, title }: BlogPostImageProps) {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-md">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
