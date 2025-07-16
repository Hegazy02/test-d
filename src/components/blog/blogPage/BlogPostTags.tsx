import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostTagsProps {
  tags: string[];
}

export default function BlogPostTags({ tags }: BlogPostTagsProps) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex items-center flex-wrap gap-2">
        <Tag className="h-4 w-4 dark:text-white text-[#004B4B]" />
        {tags.map((tag, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="border-[#004B4B] dark:text-white text-[#004B4B] text-xs"
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
}
