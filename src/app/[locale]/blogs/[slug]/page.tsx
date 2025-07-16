// src\app\[locale]\blogs\[slug]\page.tsx
import type { Metadata } from "next";
import { getWebsiteDataByBlogID } from "@/lib/getWebsiteDataByBlogID";
import { getWebsiteDataBySlug } from "@/lib/getWebsiteDataBySlug"; // ✅ إضافة البحث بالـ slug
import BlogPostContainer from "@/components/blog/blogPage/BlogPostContainer";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/BlogPost";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

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
  blogID?: string;
}

async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    await dbConnect();
    const decodedSlug = decodeURIComponent(slug);
    const post = await Blog.findOne({ slug: decodedSlug }).lean();

    if (!post) {
      return null;
    }

    return {
      ...post,
      _id: post._id.toString(),
    } as BlogPost;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isRTL = locale === "ar";

  const post = await getBlogPostBySlug(slug);

  let pageData = null;

  // ✅ محاولة البحث بـ blogID أولاً
  if (post && post.blogID) {
    pageData = await getWebsiteDataByBlogID(post.blogID);
  }

  // ✅ إذا لم يتم العثور على pageData، ابحث بالـ slug
  if (!pageData && post && post.slug) {
    pageData = await getWebsiteDataBySlug(post.slug);
  }

  // ✅ إذا لم يتم العثور بعد، جرب البحث بالـ slug المُمرر في الـ URL
  if (!pageData) {
    pageData = await getWebsiteDataBySlug(slug);
  }

  const defaultTitle = isRTL
    ? post
      ? `${post.title} - درب للإنتاج`
      : "مقال - درب للإنتاج"
    : post
      ? `${post.title} - Darb Productions`
      : "Article - Darb Productions";

  const defaultDescription = isRTL
    ? post?.excerpt ||
      "اقرأ أحدث المقالات والأفكار من فريق درب للإنتاج حول الإنتاج الإعلامي وإدارة الفعاليات والطباعة."
    : post?.excerpt ||
      "Read the latest articles and insights from Darb Productions team about media production, event management, and printing.";

  const defaultKeywords = isRTL
    ? "مقال، مدونة، إنتاج إعلامي، إدارة فعاليات، طباعة، إنتاج أجنحة، السعودية، الإمارات"
    : "article, blog post, media production, event management, printing, booth production, Saudi Arabia, UAE";

  // ✅ استخدام بيانات pageData إذا وُجدت
  const title = pageData
    ? isRTL
      ? pageData.metaTitleAr || defaultTitle
      : pageData.metaTitleEn || defaultTitle
    : defaultTitle;

  const description = pageData
    ? isRTL
      ? pageData.metaDescriptionAr || defaultDescription
      : pageData.metaDescriptionEn || defaultDescription
    : defaultDescription;

  const ogImage =
    post?.featuredImage ||
    post?.image ||
    "https://www.darbproductions.com/images/blog/post-og-image.jpg";

  const twitterImage =
    post?.featuredImage ||
    post?.image ||
    "https://www.darbproductions.com/images/blog/post-twitter-image.jpg";

  return {
    title,
    description,
    keywords: defaultKeywords,
    openGraph: {
      title,
      description,
      url: `https://www.darbproductions.com+${locale=="ar"?"/ar":""}/blogs/${slug}`,
      siteName: "Darb Productions",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: isRTL ? "مقال درب للإنتاج" : "Darb Productions Article",
        },
      ],
      locale: isRTL ? "ar_SA" : "en_US",
      type: "article",
      ...(post && {
        publishedTime: post.publishedAt,
        authors: [post.author],
        tags: post.tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImage],
    },
    alternates: {
      canonical: `https://www.darbproductions.com+${locale=="ar"?"/ar":""}/blogs/${slug}`,
      languages: {
        en: `https://www.darbproductions.com/blogs/${slug}`,
        ar: `https://www.darbproductions.com/ar/blogs/${slug}`,
      },
    },
    other: post
      ? {
          "script:ld+json": JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: ogImage,
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Darb Productions",
              logo: {
                "@type": "ImageObject",
                url: "https://www.darbproductions.com/images/logo.png",
              },
            },
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.darbproductions.com+${locale=="ar"?"/ar":""}/blogs/${slug}`,
            },
          }),
        }
      : {},
  };
}

export default function BlogPostPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <BlogPostContainer />
      </main>
    </div>
  );
}
