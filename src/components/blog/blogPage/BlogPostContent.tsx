import DOMPurify from "dompurify";

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  const textElements = [
    "P",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "LI",
    "BLOCKQUOTE",
    "PRE",
    "TD",
    "TH",
  ];

  // تحويل escape sequences إلى HTML
  const convertEscapeSequences = (text: string): string => {
    return (
      text
        // تحويل \n إلى <br>
        .replace(/\\n/g, "<br>")
        // تحويل \t إلى 4 مسافات
        .replace(/\\t/g, "    ")
        // تحويل \r\n إلى <br>
        .replace(/\\r\\n/g, "<br>")
        // تحويل \r إلى <br>
        .replace(/\\r/g, "<br>")
        // تحويل \" إلى "
        .replace(/\\"/g, '"')
        // تحويل \' إلى '
        .replace(/\\'/g, "'")
        // تحويل \\ إلى \
        .replace(/\\\\/g, "\\")
        // تحويل المسافات المتعددة إلى
        .replace(/  +/g, (match) => " ".repeat(match.length))
        // تحويل الأسطر الفارغة المتعددة إلى فقرات
        .replace(/(<br>\s*){2,}/g, "</p><p>")
    );
  };

  // تحسين دالة كشف اللغة العربية
  const isArabic = (text: string): boolean => {
    const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    return arabicPattern.test(text);
  };

  // حساب النسبة المئوية للأحرف العربية في النص
  const getArabicPercentage = (text: string): number => {
    // إزالة HTML tags والمسافات والأرقام والرموز
    const cleanText = text
      .replace(/<[^>]*>/g, "")
      .replace(/[\s\d-\u007F\u2000-\u206F\u2E00-\u2E7F]/g, "");

    if (cleanText.length === 0) return 0;

    const arabicChars = cleanText.match(
      /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g,
    );
    return arabicChars ? (arabicChars.length / cleanText.length) * 100 : 0;
  };

  // تحديد اتجاه النص بناءً على المحتوى الفعلي
  const getTextDirection = (text: string): "rtl" | "ltr" => {
    const arabicPercentage = getArabicPercentage(text);
    // إذا كانت نسبة الأحرف العربية أكثر من 50%، فالنص عربي
    return arabicPercentage > 50 ? "rtl" : "ltr";
  };

  const processContent = (htmlContent: string) => {
    // معالجة escape sequences أولاً
    let processedText = convertEscapeSequences(htmlContent);

    // إذا لم يكن النص يحتوي على HTML tags، لفه في <p>
    if (
      !processedText.includes("<p>") &&
      !processedText.includes("<div>") &&
      !processedText.includes("<h1>") &&
      !processedText.includes("<h2>") &&
      !processedText.includes("<h3>") &&
      !processedText.includes("<ul>") &&
      !processedText.includes("<ol>")
    ) {
      processedText = `<p>${processedText}</p>`;
    }

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = DOMPurify.sanitize(processedText);

    const processNode = (node: Element) => {
      // معالجة العناصر النصية الرئيسية
      if (textElements.includes(node.tagName)) {
        const textContent = node.textContent || node.innerHTML;
        if (textContent.trim()) {
          const direction = getTextDirection(textContent);
          node.setAttribute("dir", direction);

          // إضافة class للتنسيق الإضافي حسب الاتجاه
          const currentClass = node.getAttribute("class") || "";
          const directionClass =
            direction === "rtl" ? "text-right" : "text-left";

          // إزالة class الاتجاه السابق وإضافة الجديد
          const cleanedClass = currentClass
            .replace(/text-(left|right|center)/g, "")
            .trim();
          node.setAttribute(
            "class",
            `${cleanedClass} ${directionClass}`.trim(),
          );
        }
      }

      // معالجة العناصر الفرعية
      Array.from(node.children).forEach((child) => processNode(child));
    };

    processNode(tempDiv);
    return tempDiv.innerHTML;
  };

  const processedContent = processContent(content);

  return (
    <div className="mx-auto">
      <div
        className="prose prose-lg max-w-none prose-headings:text-[#004B4B] prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-700 prose-ul:list-disc prose-ol:list-decimal prose-img:rounded-lg prose-img:shadow-md dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-white dark:prose-li:text-white dark:prose-blockquote:text-white dark:prose-pre:text-white dark:prose-th:text-white dark:prose-td:text-white"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
      {/* إضافة CSS مخصص لتحسين عرض النص المختلط */}
      <style jsx>{`
        :global([dir="rtl"]) {
          font-family: "Cairo", "Tajawal", "Amiri", sans-serif;
        }
        :global([dir="ltr"]) {
          font-family: "Inter", "Roboto", sans-serif;
        }
        :global([dir="rtl"] strong) {
          font-weight: 700;
        }
        :global([dir="rtl"] ul, [dir="rtl"] ol) {
          padding-right: 1.5rem;
          padding-left: 0;
        }
        :global([dir="ltr"] ul, [dir="ltr"] ol) {
          padding-left: 1.5rem;
          padding-right: 0;
        }
        /* تحسين عرض line breaks */
        :global(.prose br) {
          margin: 0.5em 0;
        }
        /* تحسين عرض النص مع المسافات */
        :global(.prose p) {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        /* تنسيق شامل للوضع الداكن */
        :global(.dark .prose) {
          color: #ffffff !important;
        }
        :global(.dark .prose *) {
          color: inherit !important;
        }
        :global(.dark .prose a) {
          color: #60a5fa;
        }
        :global(.dark .prose code) {
          color: #f3f4f6;
          background-color: #374151;
        }
        :global(.dark .prose pre) {
          background-color: #1f2937;
          color: #f9fafb;
        }
        :global(.dark .prose table) {
          color: #f3f4f6;
        }
        :global(.dark .prose thead) {
          background-color: #374151;
        }
        :global(.dark .prose tr:nth-child(even)) {
          background-color: #374151;
        }
        :global(.dark .prose blockquote) {
          border-left-color: #4b5563;
          background-color: #1f2937;
        }
        /* تحسين عرض القوائم */
        :global(.prose ul > li, .prose ol > li) {
          margin-bottom: 0.5rem;
        }
        :global(.prose ul > li:last-child, .prose ol > li:last-child) {
          margin-bottom: 0;
        }
        /* تحسين المسافات بين الفقرات */
        :global(.prose p) {
          margin-bottom: 1.25rem;
        }
        :global(.prose p:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}
