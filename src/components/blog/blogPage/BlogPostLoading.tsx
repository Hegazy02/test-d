export default function BlogPostLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* مساحة فارغة لشريط التنقل */}
        <div className="h-[15px] w-full bg-transparent"></div>

        {/* Skeleton للرأس */}
        <div className="relative w-full h-[20vh] min-h-[400px] bg-[#004B4B]">
          {/* Skeleton للصورة الخلفية */}
          <div className="absolute inset-0 bg-[#004B4B]/50"></div>

          {/* Skeleton للمحتوى */}
          <div className="absolute inset-0 ">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="w-full sm:w-[80%] mx-auto space-y-6">
                {/* Skeleton للفئة */}
                <div className="inline-block px-4 py-2 bg-gray-200 rounded-full w-32 h-8 animate-pulse"></div>

                {/* Skeleton للعنوان */}
                <div className="space-y-3">
                  <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>

                {/* Skeleton للنص */}
                <div className="space-y-2 max-w-3xl">
                  <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                </div>

                {/* Skeleton للمؤلف والتاريخ */}
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton للمحتوى */}
        <article className="container mx-auto px-4 py-12">
          {/* Featured Image Skeleton */}
          <div className="mb-8 w-full sm:w-[80%] items-center mx-auto">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <div className="w-full h-full bg-gray-200">
                <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="w-full sm:w-[80%] mx-auto space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Tags Skeleton */}
          <div className="w-full sm:w-[80%] mx-auto mt-8 flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-8 bg-gray-200 rounded-full w-20 animate-pulse"
              ></div>
            ))}
          </div>

          {/* Author Bio Skeleton */}
          <div className="w-full sm:w-[80%] mx-auto mt-12">
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
