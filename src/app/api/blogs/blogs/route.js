// src/app/api/blogs/blogs/route.js (النسخة الحقيقية)
import dbConnect from "@/lib/dbConnect";
import BlogPost from "@/models/BlogPost";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const siteId = searchParams.get("siteId") || searchParams.get("websiteId"); // دعم كلا المعاملين
    const slug = searchParams.get("slug");
    const limit = searchParams.get("limit") || 400;
    const page = searchParams.get("page") || 1;
    const category = searchParams.get("category");

    console.log("📚 GET /api/blogs/blogs called with params:", {
      id,
      siteId,
      slug,
      limit,
      page,
      category,
    });

    // If id is provided, fetch a specific blog post by ID
    if (id) {
      const post = await BlogPost.findById(id).lean();
      if (!post) {
        return NextResponse.json(
          { error: "Blog post not found" },
          { status: 404 },
        );
      }
      return NextResponse.json(post);
    }

    // If siteId is not provided, return error
    if (!siteId) {
      console.log("❌ No siteId provided");
      return NextResponse.json(
        { error: "Site ID is required" },
        { status: 400 },
      );
    }

    // If slug is provided, fetch a specific blog post
    if (slug) {
      const post = await BlogPost.findOne({ siteId, slug }).lean();
      if (!post) {
        return NextResponse.json(
          { error: "Blog post not found" },
          { status: 404 },
        );
      }
      return NextResponse.json(post);
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
      if (category === "event-management") {
        query.$or = [
          { categorySlug: "event-management" },
          { category: "Event Management" },
        ];
      } else {
        query.categorySlug = category;
      }
    }

    console.log("📚 Query:", query);

    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await BlogPost.countDocuments(query);

    console.log(`📚 Found ${posts.length} posts out of ${total} total`);
    return NextResponse.json({
      posts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("❌ Error in GET /api/blogs/blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { siteId, title, slug, content, excerpt, author, tags, publishedAt } =
      body;

    if (!siteId || !title || !slug || !content) {
      return NextResponse.json(
        { error: "siteId, title, slug, and content are required" },
        { status: 400 },
      );
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

    console.log("✅ Created blog post:", post._id);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  await dbConnect();

  try {
    const body = await request.json();
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
    } = body;

    if (!id || !siteId) {
      return NextResponse.json(
        { error: "Post ID and siteId are required" },
        { status: 400 },
      );
    }

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

    return NextResponse.json(post);
  } catch (error) {
    console.error("❌ Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { id, siteId } = body;

    if (!id || !siteId) {
      return NextResponse.json(
        { error: "Post ID and siteId are required" },
        { status: 400 },
      );
    }

    await BlogPost.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 },
    );
  }
}
