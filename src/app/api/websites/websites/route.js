// src/app/api/websites/websites/route.js (محدث ليطابق التطبيق الحالي)
import dbConnect from "@/lib/dbConnect";
import Website from "@/models/Website";
import { NextResponse } from "next/server";

// تعريف الصفحات الافتراضية
const DEFAULT_PAGES = [
  {
    title: "Home",
    slug: "home",
    metaTitleAr: "الصفحة الرئيسية - {name}",
    metaTitleEn: "Home - {name}",
    metaDescriptionAr:
      "مرحباً بكم في {name} - شريككم الموثوق في الحلول الرقمية",
    metaDescriptionEn:
      "Welcome to {name} - Your trusted partner in digital solutions",
    content: "Welcome to our website",
    status: "published",
    isHomePage: true,
    order: 1,
    blogID: "0", // ✅ تحديد blogID صراحة للصفحة الرئيسية
  },
  {
    title: "About Us",
    slug: "about",
    metaTitleAr: "من نحن - {name}",
    metaTitleEn: "About Us - {name}",
    metaDescriptionAr: "تعرف على رحلة {name}، مهمتنا، والفريق وراء نجاحنا",
    metaDescriptionEn:
      "Learn about {name}'s journey, our mission, and the team behind our success",
    content: "About our company",
    status: "published",
    order: 2,
    blogID: "0", // ✅ تحديد blogID صراحة
  },
  {
    title: "Services",
    slug: "services",
    metaTitleAr: "خدماتنا - {name}",
    metaTitleEn: "Our Services - {name}",
    metaDescriptionAr: "اكتشف مجموعتنا الشاملة من الخدمات والحلول المهنية",
    metaDescriptionEn:
      "Explore our comprehensive range of professional services and solutions",
    content: "Our services",
    status: "published",
    order: 3,
    blogID: "0", // ✅ تحديد blogID صراحة
  },
  {
    title: "Blog",
    slug: "blog",
    metaTitleAr: "المدونة - {name}",
    metaTitleEn: "Blog - {name}",
    metaDescriptionAr: "آخر الرؤى والأخبار والتحديثات من {name}",
    metaDescriptionEn: "Latest insights, news, and updates from {name}",
    content: "Our blog",
    status: "published",
    order: 4,
    blogID: "1", // ✅ صفحة المدونة الرئيسية دائماً blogID = "1"
  },
  {
    title: "Contact",
    slug: "contact",
    metaTitleAr: "اتصل بنا - {name}",
    metaTitleEn: "Contact Us - {name}",
    metaDescriptionAr: "تواصل مع فريقنا في {name}",
    metaDescriptionEn: "Get in touch with our team at {name}",
    content: "Contact information",
    status: "published",
    order: 5,
    blogID: "0", // ✅ تحديد blogID صراحة
  },
  {
    title: "Privacy Policy",
    slug: "privacy-policy",
    metaTitleAr: "سياسة الخصوصية - {name}",
    metaTitleEn: "Privacy Policy - {name}",
    metaDescriptionAr: "تعرف على كيفية حماية {name} لخصوصيتك وبياناتك",
    metaDescriptionEn: "Learn about how {name} protects your privacy and data",
    content: "Privacy policy",
    status: "published",
    order: 6,
    blogID: "0", // ✅ تحديد blogID صراحة
  },
  {
    title: "Terms of Service",
    slug: "terms",
    metaTitleAr: "شروط الخدمة - {name}",
    metaTitleEn: "Terms of Service - {name}",
    metaDescriptionAr: "اقرأ شروط الخدمة والأحكام الخاصة بنا",
    metaDescriptionEn: "Read our terms of service and conditions",
    content: "Terms of service",
    status: "published",
    order: 7,
    blogID: "0", // ✅ تحديد blogID صراحة
  },
];

// وظيفة لإضافة الصفحات الافتراضية
const addDefaultPages = async (website) => {
  try {
    const existingPages = website.pages || [];
    const existingSlugs = existingPages.map((page) => page.slug);

    const newPages = DEFAULT_PAGES.filter(
      (page) => !existingSlugs.includes(page.slug),
    ).map((page) => ({
      ...page,
      metaTitleAr: page.metaTitleAr.replace("{name}", website.name),
      metaTitleEn: page.metaTitleEn.replace("{name}", website.name),
      metaDescriptionAr: page.metaDescriptionAr.replace("{name}", website.name),
      metaDescriptionEn: page.metaDescriptionEn.replace("{name}", website.name),
      blogID: page.blogID, // ✅ الحفاظ على blogID من التعريف الافتراضي
    }));

    if (newPages.length > 0) {
      website.pages = [...existingPages, ...newPages];
      await website.save();
    }

    return website;
  } catch (error) {
    throw error;
  }
};

// GET Handler
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");

    // Check if we're searching for a website with "production" in the title
    if (search === "production") {
      const productionWebsite = await Website.findOne({
        name: { $regex: "production", $options: "i" },
      })
        .select("_id name pages") // ✅ إضافة pages للاستجابة
        .lean();

      if (!productionWebsite) {
        return NextResponse.json(
          { error: "No website with 'production' in title found" },
          { status: 404 },
        );
      }

      // ✅ إضافة الصفحات للاستجابة مع blogID
      return NextResponse.json({
        id: productionWebsite._id.toString(),
        name: productionWebsite.name,
        pages: productionWebsite.pages || [], // ✅ إضافة الصفحات
      });
    }

    // Original code for fetching all websites
    const websites = await Website.find({})
      .sort({ createdAt: -1 })
      .select("name domain createdAt")
      .lean();

    const formattedWebsites = websites.map((w) => ({
      id: w._id.toString(),
      name: w.name,
      domain: w.domain,
      createdAt: w.createdAt,
    }));

    return NextResponse.json(formattedWebsites);
  } catch (error) {
    console.error("❌ Error in GET /api/websites/websites:", error);
    return NextResponse.json(
      { error: "Failed to fetch websites" },
      { status: 500 },
    );
  }
}

// POST Handler
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, domain } = body;

    if (!name || !domain) {
      return NextResponse.json(
        { error: "Name and domain are required" },
        { status: 400 },
      );
    }

    const existingWebsite = await Website.findOne({ domain });
    if (existingWebsite) {
      return NextResponse.json(
        { error: "A website with this domain already exists" },
        { status: 409 },
      );
    }

    // إنشاء الموقع بدون صفحات
    const website = await Website.create({ name, domain, pages: [] });

    // إضافة الصفحات الافتراضية
    const websiteWithPages = await addDefaultPages(website);

    return NextResponse.json(
      {
        id: websiteWithPages._id.toString(),
        name: websiteWithPages.name,
        domain: websiteWithPages.domain,
        createdAt: websiteWithPages.createdAt,
        pages: websiteWithPages.pages,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("❌ Error creating website:", error);
    return NextResponse.json(
      { error: "Failed to create website" },
      { status: 500 },
    );
  }
}

// DELETE Handler
export async function DELETE(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Website ID is required" },
        { status: 400 },
      );
    }

    const website = await Website.findByIdAndDelete(id);

    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting website:", error);
    return NextResponse.json(
      { error: "Failed to delete website" },
      { status: 500 },
    );
  }
}
