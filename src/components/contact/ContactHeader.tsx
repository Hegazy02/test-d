// src/app/[locale]/contact/components/ContactHeader.tsx
interface ContactHeaderProps {
  title: string;
  subtitle: string;
}

export default function ContactHeader({ title, subtitle }: ContactHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
        {title}
      </h1>
      <p className="dark:text-white text-gray-600">{subtitle}</p>
    </div>
  );
}
