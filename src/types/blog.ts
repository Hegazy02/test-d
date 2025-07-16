export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  featuredImage: string;
  imageAlt: string;
  category?: string;
  categorySlug?: string;
  publishedAt: string;
  author: string;
  slug: string;
  tags: string[];
  isFeatured: boolean;
}

export type BlogCategory =
  | "all"
  | "media-production"
  | "event-management"
  | "booth-production"
  | "printing"
  | "corporate-news"
  | "other";
