import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ChevronRight } from "lucide-react";
import { createLocalizedPath } from "@/components/Nav";
import { usePathname } from "next/navigation";

interface FeaturedPostProps {
  post: {
    _id: string;
    title: string;
    excerpt: string;
    image: string;
    imageAlt: string;
    featuredImage: string;
    category: string;
    publishedAt: string;
    author: string;
    readTime?: string;
    slug: string;
  };
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const imageName = post.featuredImage?.split("/").pop() || "";
  const pathname = usePathname();
  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 dark:bg-[#434343] bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="lg:col-span-3 relative aspect-[16/9] lg:aspect-auto">
          <Image
            src={`/api/images/${imageName}` || "/placeholder.svg"}
            alt={post.imageAlt || `صورة توضيحية لمقال: ${post.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          {post.category && (
            <div className="absolute top-4 left-4 bg-[#004B4B] text-white text-sm font-semibold px-3 py-1.5 rounded shadow-md">
              {post.category}
            </div>
          )}
        </div>
        <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-center">
          <div className="flex items-center text-sm dark:text-white text-gray-500 mb-3 space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-[#D4B82C]" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US")}
              </span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1 text-[#D4B82C]" />
              <span>{post.author}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-[#D4B82C]" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-900 mb-4">
            {post.title}
          </h2>
          <p className="dark:text-white text-gray-600 mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-auto">
            <Link href={createLocalizedPath(`/blogs/${post.slug}`, pathname)}>
              <Button className="bg-[#004B4B] hover:bg-[#003838] text-white">
                Read Article <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
