"use client";
import React from "react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  const duration = props.duration || 10;

  return (
    <div className={`${props.className} relative overflow-hidden`}>
      <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .scroll-animation {
          animation: scrollUp ${duration}s linear infinite;
        }
      `}</style>

      <div className="scroll-animation flex flex-col gap-6 pb-6 bg-background">
        {/* تكرار الشهادات مرتين لضمان الحركة المستمرة */}
        {Array.from({ length: 2 }, (_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={`${index}-${i}`}
                className="p-6 sm:p-8 lg:p-10 rounded-3xl max-w-xs w-full bg-gray-50 hover:scale-95 border-1 border-gray-300 hover:border-0 transition-all duration-300 ease-out group"
              >
                <div className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                  {text}
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image || "/placeholder.svg"}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="flex flex-col">
                    <div className="font-semibold tracking-tight leading-5 text-gray-900">
                      {name}
                    </div>
                    <div className="leading-5 opacity-60 tracking-tight text-gray-600 text-sm">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const testimonials = [
  {
    text: "درب برودكشنز حولت رؤيتنا الإبداعية إلى واقع مذهل. جودة الإنتاج والالتزام بالمواعيد فاق كل توقعاتنا.",
    image:
      "/placeholder.svg?height=40&width=40&query=professional woman portrait",
    name: "سارة المحمد",
    role: "مديرة التسويق",
  },
  {
    text: "Working with Darb Productions was exceptional. Their creative team delivered outstanding video content that elevated our brand presence.",
    image:
      "/placeholder.svg?height=40&width=40&query=professional man portrait",
    name: "Ahmed Al-Rashid",
    role: "CEO",
  },
  {
    text: "الفريق الإبداعي في درب يفهم احتياجاتنا بعمق. كل مشروع ينجزونه يحمل بصمتهم المميزة والاحترافية العالية.",
    image:
      "/placeholder.svg?height=40&width=40&query=professional woman portrait",
    name: "نورا العتيبي",
    role: "مديرة العلاقات العامة",
  },
  {
    text: "From concept to final delivery, Darb Productions exceeded our expectations. Their attention to detail and creative vision is unmatched.",
    image:
      "/placeholder.svg?height=40&width=40&query=professional man portrait",
    name: "Omar Hassan",
    role: "Brand Manager",
  },
  {
    text: "شراكتنا مع درب برودكشنز لأكثر من ثلاث سنوات، وفي كل مرة يبهروننا بالإبداع والجودة. فريق محترف بكل معنى الكلمة.",
    image:
      "/placeholder.svg?height=40&width=40&query=professional woman portrait",
    name: "ريم الزهراني",
    role: "مديرة الإعلان",
  },
  {
    text: "The production quality and creative storytelling from Darb Productions helped us connect with our audience in ways we never imagined.",
    image:
      "/placeholder.svg?height=40&width=40&query=professional man portrait",
    name: "Khalid Al-Mansouri",
    role: "Marketing Director",
  },
  {
    text: "درب ليس مجرد شركة إنتاج، بل شريك إبداعي حقيقي. يساعدوننا في تحويل أفكارنا إلى محتوى يلامس القلوب.",
    image:
      "/placeholder.svg?height=40&width=40&query=professional woman portrait",
    name: "لينا الشمري",
    role: "مديرة المحتوى",
  },
  {
    text: "Outstanding service and creative excellence. Darb Productions delivered a campaign that significantly boosted our brand recognition.",
    image:
      "/placeholder.svg?height=40&width=40&query=professional man portrait",
    name: "Faisal Al-Qahtani",
    role: "Communications Manager",
  },
  {
    text: "الاحترافية والإبداع والالتزام - هذا ما يميز درب برودكشنز. كل مشروع معهم هو تجربة استثنائية.",
    image:
      "/placeholder.svg?height=40&width=40&query=professional woman portrait",
    name: "هند الدوسري",
    role: "مديرة التطوير",
  },
];

export { testimonials };
