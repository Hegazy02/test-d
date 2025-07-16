import dbConnect from "../../../lib/dbConnect";
import BlogPost from "../../../models/BlogPost";

export default async function handler(req, res) {
  await dbConnect();

  // GET - Fetch blog posts for a specific site or a single post by ID
  if (req.method === "GET") {
    try {
      const { id, siteId, slug, limit = 10, page = 1, category } = req.query;

      // If id is provided, fetch a specific blog post by ID
      if (id) {
        const post = await BlogPost.findById(id).lean();
        if (!post) {
          return res.status(404).json({ error: "Blog post not found" });
        }
        return res.status(200).json(post);
      }

      // If siteId is not provided, return error
      if (!siteId) {
        return res.status(400).json({ error: "Site ID is required" });
      }

      // If slug is provided, fetch a specific blog post
      if (slug) {
        const post = await BlogPost.findOne({ siteId, slug }).lean();
        if (!post) {
          return res.status(404).json({ error: "Blog post not found" });
        }
        return res.status(200).json(post);
      }

      // Otherwise, fetch all blog posts with pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Build query object
      const query = { siteId };
      if (category === "other") {
        query.categorySlug = {
          $nin: [
            "media-production",
            "event-management",
            "booth-production",
            "printing",
            "corporate-news",
          ],
        };
      } else if (category) {
        // تعديل البحث ليشمل كلا الحالتين
        if (category === "event-management") {
          query.$or = [
            { categorySlug: "event-management" },
            { category: "Event Management" },
          ];
        } else {
          query.categorySlug = category;
        }
      }

      const posts = await BlogPost.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean();

      const total = await BlogPost.countDocuments(query);

      return res.status(200).json({
        posts,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit)),
        },
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  }

  // POST - Create a new blog post
  if (req.method === "POST") {
    try {
      const {
        siteId,
        title,
        slug,
        content,
        excerpt,
        author,
        tags,
        publishedAt,
      } = req.body;

      if (!siteId || !title || !slug || !content) {
        return res
          .status(400)
          .json({ error: "siteId, title, slug, and content are required" });
      }

      const post = await BlogPost.create({
        siteId,
        title,
        slug,
        content,
        excerpt,
        author,
        tags,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      });

      return res.status(201).json(post);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create blog post" });
    }
  }

  // PUT - Update an existing blog post
  if (req.method === "PUT") {
    try {
      const {
        id,
        siteId,
        title,
        slug,
        content,
        excerpt,
        author,
        tags,
        publishedAt,
      } = req.body;

      if (!id || !siteId) {
        return res
          .status(400)
          .json({ error: "Post ID and siteId are required" });
      }

      // تحديث المدونة
      const post = await BlogPost.findByIdAndUpdate(
        id,
        {
          title,
          slug,
          content,
          excerpt,
          author,
          tags,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
        },
        { new: true },
      );

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update blog post" });
    }
  }

  // DELETE - Delete a blog post
  if (req.method === "DELETE") {
    try {
      const { id, siteId } = req.body;

      if (!id || !siteId) {
        return res
          .status(400)
          .json({ error: "Post ID and siteId are required" });
      }

      // حذف المدونة
      const post = await BlogPost.findByIdAndDelete(id);

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete blog post" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
