// src/app/[locale]/contact/components/OfficeCard.tsx
import { Card, CardContent } from "@/components/ui/card";

interface OfficeCardProps {
  office: string;
  data: any;
  isSelected: boolean;
  onSelect: () => void;
  imageSrc: string;
  imageAlt: string;
}

export default function OfficeCard({
  office,
  data,
  isSelected,
  onSelect,
  imageSrc,
  imageAlt,
}: OfficeCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
        isSelected
          ? "ring-2 ring-blue-500 shadow-lg bg-blue-50 dark:ring-0 dark:shadow-md dark:bg-white"
          : "hover:shadow-md dark:bg-[#292929]"
      }`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3
                className={`font-bold text-base ${
                  isSelected
                    ? "dark:text-black text-gray-900"
                    : "dark:text-white text-gray-900"
                }`}
              >
                {data.title}
              </h3>
            </div>
            <p
              className={`text-sm ${
                isSelected
                  ? "dark:text-black text-gray-600"
                  : "dark:text-white text-gray-600"
              }`}
            >
              {data.location}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
