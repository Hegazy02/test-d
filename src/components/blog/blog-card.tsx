import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";
import { createLocalizedPath } from "@/components/Nav";
export interface BlogCardProps {
  featuredImage: string;
  isFeatured: unknown;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category?: string;
  publishedAt: string;
  slug: string;
  author?: string;
  tags?: string[];
}

export default function BlogCard({
  title,
  excerpt,
  image,
  imageAlt,
  category,
  publishedAt,
  slug,
  author,
  tags = [],
}: BlogCardProps) {
  const pathname = usePathname();
  // تحويل slug الفئة إلى الاسم المعروض
  const getCategoryDisplayName = (categorySlug?: string) => {
    const categoryMap: Record<string, string> = {
      "media-production": "Media Production",
      "event-management": "Event Management",
      "booth-production": "Booth Production",
      printing: "Printing",
    };
    return categorySlug ? categoryMap[categorySlug] || "Other" : "Other";
  };

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const displayTags = tags.slice(0, 2);
  // استخدام الدالة الجديدة لعرض اسم الفئة
  const displayCategory = getCategoryDisplayName(category);
  const imageName = image?.split("/").pop() || "";

  // تحديد مصدر الصورة بناءً على الشرط
  const imageSrc =
    image === "/placeholder.svg"
      ? "/placeholder.svg"
      : `/api/images/${imageName}`;
  return (
    <article className="flex flex-col overflow-hidden border border-transparent light:border-gray-200 dark:bg-[#434343] shadow-sm hover:shadow-md transition-shadow min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px]">
      <Link
        href={createLocalizedPath(`/blogs/${slug}`, pathname)}
        className="group"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden ">
          <Image
            src={imageSrc}
            alt={imageAlt || `صورة توضيحية لمقال: ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />

          {/* Category badge positioned on top of the image */}
          <div className="absolute top-4 left-4 bg-[#004B4B] text-white text-xs font-semibold px-3 py-1.5 rounded shadow-md">
            {category}
          </div>
        </div>
        <div className="p-5">
          {/* Tags */}
          {/* {displayTags.length > 0 && (
            <div className="flex gap-2 mb-2">
              {displayTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs font-medium bg-gray-100  text-gray-800 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )} */}

          <h2 className="text-lg dark:text-gray-100 text-gray-900 mb-2 light:group-hover:text-[#004B4B] transition-colors">
            {title}
          </h2>
          <p className="dark:text-white text-gray-700 mb-3 line-clamp-3">
            {excerpt}
          </p>

          <div className="flex items-center justify-between text-sm dark:text-white text-gray-500">
            <div className="flex items-center">
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Author */}
          {author && (
            <div className="flex items-center mt-3 text-sm dark:text-white text-gray-600">
              <User className="h-4 w-4 mr-1" />
              <span>{author}</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
