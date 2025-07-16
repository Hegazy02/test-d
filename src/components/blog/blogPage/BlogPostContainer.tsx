"use client";

import { useParams } from "next/navigation";
import useBlogStore from "@/store/store.ts";
import BlogPostPageContent from "@/components/blog/blogPage/BlogPostPageContent";
import BlogPostLoading from "@/components/blog/blogPage/BlogPostLoading";
import BlogPostError from "@/components/blog/blogPage/BlogPostError";
import { useEffect } from "react";

interface BlogPost {
  featuredImage: any;
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  imageAlt: string;
  category: string;
  categorySlug: string;
  publishedAt: string;
  author: string;
  tags: string[];
  slug: string;
  blogID?: string; // إضافة blogID
}

interface BlogPostContainerProps {
  onPostFound?: (post: BlogPost) => void; // دالة callback لتمرير المقال للصفحة الأب
}

export default function BlogPostContainer({
  onPostFound,
}: BlogPostContainerProps) {
  const params = useParams();
  const slug = params?.slug as string;
  const { blogs, isLoading, error } = useBlogStore();
  const decoded = decodeURIComponent(slug);

  const post = blogs.find((blog: BlogPost) => blog.slug === decoded);

  console.log("Blog post:", post);

  // تمرير المقال للصفحة الأب عند العثور عليه
  useEffect(() => {
    if (post && onPostFound) {
      onPostFound(post);
    }
  }, [post, onPostFound]);

  if (isLoading) {
    return <BlogPostLoading />;
  }

  if (!isLoading && (error || !post)) {
    return <BlogPostError error={error || "Blog post not found"} />;
  }

  return <BlogPostPageContent post={post} />;
}
