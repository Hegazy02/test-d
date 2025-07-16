import React from "react";
import { ShimmerBorderButton } from "./shimmer-border-button";

export function ShimmerBorderDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Shimmer Border Button Demo
        </h1>

        <div className="grid gap-8">
          {/* Basic Examples with bgColor */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              الأمثلة الأساسية مع ألوان الخلفية
            </h2>
            <div className="flex flex-wrap gap-4">
              <ShimmerBorderButton bgColor="bg-blue-600" className="text-white">
                زر أزرق
              </ShimmerBorderButton>

              <ShimmerBorderButton
                variant="primary"
                bgColor="bg-purple-600"
                className="text-white"
              >
                زر بنفسجي
              </ShimmerBorderButton>

              <ShimmerBorderButton
                variant="success"
                bgColor="bg-green-600"
                className="text-white"
              >
                زر أخضر
              </ShimmerBorderButton>

              <ShimmerBorderButton
                variant="warning"
                bgColor="bg-yellow-600"
                className="text-white"
              >
                زر أصفر
              </ShimmerBorderButton>

              <ShimmerBorderButton
                variant="danger"
                bgColor="bg-red-600"
                className="text-white"
              >
                زر أحمر
              </ShimmerBorderButton>
            </div>
          </section>

          {/* Speed Variants */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              سرعات مختلفة
            </h2>
            <div className="flex flex-wrap gap-4">
              <ShimmerBorderButton
                speed="slow"
                bgColor="bg-indigo-600"
                className="text-white"
              >
                بطيء
              </ShimmerBorderButton>

              <ShimmerBorderButton
                speed="normal"
                bgColor="bg-pink-600"
                className="text-white"
              >
                عادي
              </ShimmerBorderButton>

              <ShimmerBorderButton
                speed="fast"
                bgColor="bg-teal-600"
                className="text-white"
              >
                سريع
              </ShimmerBorderButton>
            </div>
          </section>

          {/* Border Radius Variants */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              أشكال مختلفة
            </h2>
            <div className="flex flex-wrap gap-4">
              <ShimmerBorderButton
                rounded="sm"
                bgColor="bg-orange-600"
                className="text-white"
              >
                صغير
              </ShimmerBorderButton>

              <ShimmerBorderButton
                rounded="md"
                bgColor="bg-cyan-600"
                className="text-white"
              >
                متوسط
              </ShimmerBorderButton>

              <ShimmerBorderButton
                rounded="lg"
                bgColor="bg-emerald-600"
                className="text-white"
              >
                كبير
              </ShimmerBorderButton>

              <ShimmerBorderButton
                rounded="xl"
                bgColor="bg-violet-600"
                className="text-white"
              >
                كبير جداً
              </ShimmerBorderButton>

              <ShimmerBorderButton
                rounded="full"
                bgColor="bg-rose-600"
                className="text-white"
              >
                دائري
              </ShimmerBorderButton>
            </div>
          </section>

          {/* Combined Examples */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              أمثلة مجمعة
            </h2>
            <div className="flex flex-wrap gap-4">
              <ShimmerBorderButton
                variant="primary"
                speed="fast"
                rounded="full"
                bgColor="bg-gradient-to-r from-blue-500 to-purple-600"
                className="text-white px-8 py-4 text-lg font-bold"
              >
                زر مميز
              </ShimmerBorderButton>

              <ShimmerBorderButton
                variant="success"
                speed="slow"
                rounded="lg"
                bgColor="bg-gradient-to-r from-green-500 to-teal-600"
                className="text-white px-6 py-3"
              >
                زر بطيء
              </ShimmerBorderButton>

              <ShimmerBorderButton
                variant="warning"
                speed="normal"
                rounded="md"
                bgColor="bg-gradient-to-r from-yellow-500 to-orange-600"
                className="text-white px-4 py-2 text-sm"
              >
                زر صغير
              </ShimmerBorderButton>
            </div>
          </section>

          {/* Custom Styling */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              تخصيص إضافي
            </h2>
            <div className="flex flex-wrap gap-4">
              <ShimmerBorderButton
                bgColor="bg-gray-800"
                className="text-white px-8 py-4 text-lg font-bold"
                style={
                  {
                    "--shimmer-color": "#ffd700",
                    "--speed": "2s",
                  } as React.CSSProperties
                }
              >
                ذهبي مخصص
              </ShimmerBorderButton>

              <ShimmerBorderButton
                bgColor="bg-slate-800"
                className="text-white px-6 py-3"
                style={
                  {
                    "--shimmer-color": "#00ff88",
                    "--radius": "20px",
                  } as React.CSSProperties
                }
              >
                أخضر مخصص
              </ShimmerBorderButton>

              <ShimmerBorderButton
                bgColor="bg-zinc-800"
                className="text-white px-6 py-3"
                style={
                  {
                    "--shimmer-color": "#ff6b6b",
                    "--speed": "1s",
                  } as React.CSSProperties
                }
              >
                أحمر سريع
              </ShimmerBorderButton>
            </div>
          </section>

          {/* Different Background Types */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">
              أنواع خلفيات مختلفة
            </h2>
            <div className="flex flex-wrap gap-4">
              <ShimmerBorderButton
                bgColor="bg-transparent"
                className="border border-gray-600 text-white px-6 py-3"
                style={
                  {
                    "--shimmer-color": "#ffffff",
                  } as React.CSSProperties
                }
              >
                شفاف مع حدود
              </ShimmerBorderButton>

              <ShimmerBorderButton
                bgColor="bg-black/50"
                className="backdrop-blur-sm text-white px-6 py-3"
                style={
                  {
                    "--shimmer-color": "#60a5fa",
                  } as React.CSSProperties
                }
              >
                زجاجي
              </ShimmerBorderButton>

              <ShimmerBorderButton
                bgColor="bg-gradient-to-br from-pink-500 to-violet-600"
                className="text-white px-6 py-3"
              >
                تدرج لوني
              </ShimmerBorderButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ShimmerBorderDemo;
