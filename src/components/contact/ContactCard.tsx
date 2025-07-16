// src/app/[locale]/contact/components/ContactCard.tsx
interface ContactCardProps {
  type: "email" | "phone" | "address";
  title: string;
  value: string;
  action: string;
  actionText: string;
  colorClass: "blue" | "green" | "red";
}

export default function ContactCard({
  type,
  title,
  value,
  action,
  actionText,
  colorClass,
}: ContactCardProps) {
  const getIcon = () => {
    const baseClass =
      "w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors";
    const coloredClass = baseClass.replace("blue-600", `${colorClass}-600`);

    switch (type) {
      case "email":
        return (
          <svg className={coloredClass} fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        );
      case "phone":
        return (
          <svg className={coloredClass} fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        );
      case "address":
        return (
          <svg className={coloredClass} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  const handleClick = () => {
    window.open(action);
  };

  // Get hover color based on type
  const getHoverColor = () => {
    switch (type) {
      case "phone":
        return "group-hover:text-green-600";
      case "address":
        return "group-hover:text-red-600";
      default:
        return "group-hover:text-blue-600";
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group dark:bg-[#292929] bg-white rounded-lg p-6 border border-gray-200 hover:border-${colorClass}-300 cursor-pointer transition-all duration-300 hover:shadow-md`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 bg-gray-100 group-hover:bg-${colorClass}-200 rounded-lg flex items-center justify-center transition-colors`}
        >
          {getIcon()}
        </div>
        <h4
          className={`font-semibold dark:text-white text-gray-900 text-sm uppercase tracking-wide transition-colors ${getHoverColor()}`}
        >
          {title}
        </h4>
      </div>
      <p
        className={`dark:text-white text-gray-700 font-medium text-md leading-relaxed transition-colors ${type === "email" ? "break-all" : ""} ${getHoverColor()}`}
      >
        {value}
      </p>
      <p
        className={`dark:text-white text-gray-500 group-hover:text-${colorClass}-600 text-sm mt-2 transition-colors`}
      >
        {actionText}
      </p>
    </div>
  );
}
