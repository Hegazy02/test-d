import Image from "next/image";

interface BlogPostAuthorProps {
  author: string;
  bio?: string;
}

export default function BlogPostAuthor({ author, bio }: BlogPostAuthorProps) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex items-center">
        <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
          <Image
            src="/placeholder.svg?key=jjxgj"
            alt={author}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold dark:text-white text-gray-900">{author}</h3>
          <p className="text-sm dark:text-white text-gray-600">
            {bio ||
              "Content Manager at Darb Productions with over 10 years of experience in media production and corporate communications."}
          </p>
        </div>
      </div>
    </div>
  );
}
