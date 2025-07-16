import dbConnect from "../../../lib/dbConnect";
import Website from "../../../models/Website";

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
  },
];

// وظيفة لإضافة الصفحات الافتراضية
const addDefaultPages = async (website) => {
  try {
    // الحصول على الصفحات الموجودة
    const existingPages = website.pages || [];
    const existingSlugs = existingPages.map((page) => page.slug);

    // تصفية الصفحات الافتراضية لإضافة فقط الصفحات غير الموجودة
    const newPages = DEFAULT_PAGES.filter(
      (page) => !existingSlugs.includes(page.slug),
    ).map((page) => ({
      ...page,
      metaTitleAr: page.metaTitleAr.replace("{name}", website.name),
      metaTitleEn: page.metaTitleEn.replace("{name}", website.name),
      metaDescriptionAr: page.metaDescriptionAr.replace("{name}", website.name),
      metaDescriptionEn: page.metaDescriptionEn.replace("{name}", website.name),
    }));

    // إضافة الصفحات الجديدة
    if (newPages.length > 0) {
      website.pages = [...existingPages, ...newPages];
      await website.save();
    }

    return website;
  } catch (error) {
    throw error;
  }
};

// وظائف مساعدة للتعامل مع صفحات المدونة
const addBlogPage = async (websiteId, blogData) => {
  try {
    const website = await Website.findById(websiteId);
    if (!website) {
      throw new Error("Website not found");
    }

    const newBlogPage = {
      title: blogData.title,
      slug: blogData.slug,
      metaTitle: blogData.metaTitle || blogData.title,
      metaDescription: blogData.metaDescription || blogData.excerpt,
      content: blogData.content,
      status: blogData.status || "published",
      order: website.pages.length + 1,
      lastModified: new Date(),
    };

    website.pages.push(newBlogPage);
    await website.save();

    return newBlogPage;
  } catch (error) {
    throw error;
  }
};

const updateBlogPage = async (websiteId, blogId, blogData) => {
  try {
    const website = await Website.findById(websiteId);
    if (!website) {
      throw new Error("Website not found");
    }

    const blogPageIndex = website.pages.findIndex(
      (page) => page._id.toString() === blogId,
    );
    if (blogPageIndex === -1) {
      throw new Error("Blog page not found");
    }

    website.pages[blogPageIndex] = {
      ...website.pages[blogPageIndex],
      title: blogData.title || website.pages[blogPageIndex].title,
      slug: blogData.slug || website.pages[blogPageIndex].slug,
      metaTitle: blogData.metaTitle || website.pages[blogPageIndex].metaTitle,
      metaDescription:
        blogData.metaDescription ||
        website.pages[blogPageIndex].metaDescription,
      content: blogData.content || website.pages[blogPageIndex].content,
      status: blogData.status || website.pages[blogPageIndex].status,
      lastModified: new Date(),
    };

    await website.save();
    return website.pages[blogPageIndex];
  } catch (error) {
    throw error;
  }
};

const deleteBlogPage = async (websiteId, blogId) => {
  try {
    const website = await Website.findById(websiteId);
    if (!website) {
      throw new Error("Website not found");
    }

    const blogPageIndex = website.pages.findIndex(
      (page) => page._id.toString() === blogId,
    );
    if (blogPageIndex === -1) {
      throw new Error("Blog page not found");
    }

    website.pages.splice(blogPageIndex, 1);
    await website.save();

    return true;
  } catch (error) {
    throw error;
  }
};

export default async function handler(req, res) {
  await dbConnect();

  // GET - Fetch all websites
  if (req.method === "GET") {
    try {
      // Check if we're searching for a website with "production" in the title
      if (req.query.search === "production") {
        const productionWebsite = await Website.findOne({
          name: { $regex: "production", $options: "i" },
        })
          .select("_id name")
          .lean();

        if (!productionWebsite) {
          return res
            .status(404)
            .json({ error: "No website with 'production' in title found" });
        }

        return res.status(200).json({
          id: productionWebsite._id.toString(),
          name: productionWebsite.name,
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

      return res.status(200).json(formattedWebsites);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch websites" });
    }
  }

  // POST - Create a new website
  if (req.method === "POST") {
    try {
      const { name, domain } = req.body;

      if (!name || !domain) {
        return res.status(400).json({ error: "Name and domain are required" });
      }

      const existingWebsite = await Website.findOne({ domain });
      if (existingWebsite) {
        return res
          .status(409)
          .json({ error: "A website with this domain already exists" });
      }

      // إنشاء الموقع بدون صفحات
      const website = await Website.create({ name, domain, pages: [] });

      // إضافة الصفحات الافتراضية
      const websiteWithPages = await addDefaultPages(website);

      return res.status(201).json({
        id: websiteWithPages._id.toString(),
        name: websiteWithPages.name,
        domain: websiteWithPages.domain,
        createdAt: websiteWithPages.createdAt,
        pages: websiteWithPages.pages,
      });
    } catch (error) {
      console.error("Error creating website:", error);
      return res.status(500).json({ error: "Failed to create website" });
    }
  }

  // DELETE - Delete a website
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Website ID is required" });
      }

      const website = await Website.findByIdAndDelete(id);

      if (!website) {
        return res.status(404).json({ error: "Website not found" });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete website" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}

// تصدير الوظائف المساعدة
export { addBlogPage, updateBlogPage, deleteBlogPage };
