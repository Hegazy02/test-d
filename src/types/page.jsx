"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  User,
  Clock,
  Search,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import useBlogStore from "@/store/store.ts";
import { loadBlogsData } from "@/lib/loadBlogs";
import { usePathname } from "next/navigation";

export default function LatestArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    blogs,
    filteredBlogs,
    isLoading,
    error,
    setBlogs,
    setLoading,
    setError,
  } = useBlogStore();
  const pathname = usePathname();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        await loadBlogsData();
      } catch (err) {
        setError(
          "حدث خطأ أثناء تحميل المقالات. يرجى المحاولة مرة أخرى لاحقاً."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredPosts = filteredBlogs.filter((post) => {
    if (searchQuery.trim() === "") {
      return true;
    }

    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query)
    );
  });

  // Loading State Component
  const LoadingState = () => (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004B4B]"></div>
      <p className="mt-4 text-gray-600">جاري تحميل المقالات...</p>
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <div className="bg-red-50 p-4 rounded-lg flex items-center space-x-3 mb-4">
        <AlertCircle className="h-6 w-6 text-red-500" />
        <p className="text-red-700">{error}</p>
      </div>
      <Button
        className="bg-[#004B4B] hover:bg-[#003838]"
        onClick={() => window.location.reload()}
      >
        إعادة المحاولة
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* مساحة فارغة لشريط التنقل (85 بكسل) */}
        <div className="h-[85px] w-full bg-transparent"></div>

        {/* قسم العنوان الرئيسي */}
        <section className="bg-[#004B4B] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                أحدث المقالات
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                ابق على اطلاع بأحدث رؤانا وأخبارنا وقصصنا من عالم الإنتاج
                الإعلامي
              </p>

              {/* شريط البحث مع تحديث فوري */}
              <div className="relative max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="ابحث عن المقالات..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
              </div>
            </div>
          </div>
        </section>

        {/* قسم المقالات */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState />
            ) : filteredPosts.length === 0 ? (
              // عرض رسالة عندما لا توجد نتائج بحث
              <div className="text-center min-h-[400px] flex flex-col items-center justify-center">
                <Image
                  src="/no-results-found.png"
                  alt="لا توجد نتائج"
                  width={150}
                  height={150}
                  className="mb-4 opacity-70"
                />
                <p className="text-gray-500 text-lg">
                  لم يتم العثور على مقالات تطابق معايير البحث الخاصة بك.
                </p>
                <Button
                  className="mt-4 bg-[#004B4B] hover:bg-[#003838]"
                  onClick={() => setSearchQuery("")}
                >
                  مسح البحث
                </Button>
              </div>
            ) : (
              <>
                {/* المقال المميز (المقال الأول) - يظهر فقط إذا كانت هناك نتائج */}
                {filteredPosts.length > 0 && (
                  <div className="mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white rounded-xl overflow-hidden shadow-lg">
                      <div className="lg:col-span-3 relative aspect-[16/9] lg:aspect-auto">
                        <Image
                          src={filteredPosts[0].image || "/placeholder.svg"}
                          alt={filteredPosts[0].title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                        {filteredPosts[0].category && (
                          <div className="absolute top-4 left-4 bg-[#004B4B] text-white text-sm font-semibold px-3 py-1.5 rounded shadow-md">
                            {filteredPosts[0].category}
                          </div>
                        )}
                      </div>
                      <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-center">
                        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-[#D4B82C]" />
                            <span>
                              {new Date(
                                filteredPosts[0].publishedAt
                              ).toLocaleDateString("ar-SA")}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1 text-[#D4B82C]" />
                            <span>{filteredPosts[0].author}</span>
                          </div>
                          {filteredPosts[0].readTime && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-[#D4B82C]" />
                              <span>{filteredPosts[0].readTime}</span>
                            </div>
                          )}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                          {filteredPosts[0].title}
                        </h2>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {filteredPosts[0].excerpt}
                        </p>
                        <div className="mt-auto">
                          <Link
                            href={createLocalizedPath(
                              `/blogs/${filteredPosts[0].slug}`,
                              pathname
                            )}
                          >
                            <Button className="bg-[#004B4B] hover:bg-[#003838] text-white">
                              قراءة المقال{" "}
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* باقي المقالات - تظهر فقط إذا كان هناك أكثر من مقال */}
                {filteredPosts.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.slice(1).map((post) => (
                      <article
                        key={post._id}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                      >
                        <Link
                          href={createLocalizedPath(
                            `/blogs/${post.slug}`,
                            pathname
                          )}
                          className="block"
                        >
                          <div className="relative aspect-[16/9]">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {post.category && (
                              <div className="absolute top-4 left-4 bg-[#004B4B] text-white text-xs font-semibold px-3 py-1.5 rounded shadow-md">
                                {post.category}
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <div className="flex items-center text-xs text-gray-500 mb-2 space-x-3">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1 text-[#D4B82C]" />
                                <span>
                                  {new Date(
                                    post.publishedAt
                                  ).toLocaleDateString("ar-SA")}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <User className="h-3 w-3 mr-1 text-[#D4B82C]" />
                                <span>{post.author}</span>
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center text-[#004B4B] font-medium text-sm">
                              قراءة المزيد{" "}
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* قسم النشرة الإخبارية */}
        <section className="py-16 bg-[#004B4B] text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                ابق على اطلاع
              </h2>
              <p className="text-lg opacity-90 mb-8">
                اشترك في نشرتنا الإخبارية لتلقي أحدث المقالات والتحديثات مباشرة
                في بريدك الإلكتروني
              </p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="عنوان بريدك الإلكتروني"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  required
                />
                <Button className="bg-[#D4B82C] hover:bg-[#c5aa28] text-[#004B4B] font-medium whitespace-nowrap">
                  اشتراك
                </Button>
              </form>

              <p className="text-xs opacity-70 mt-4">
                بالاشتراك، فإنك توافق على سياسة الخصوصية الخاصة بنا وتوافق على
                تلقي تحديثات من شركتنا.
              </p>
            </div>
          </div>

          {/* العناصر الزخرفية */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4B82C]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4B82C]/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </section>
      </main>
    </div>
  );
}
