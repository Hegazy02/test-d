// src\lib\getWebsiteDataBySlug.ts
import dbConnect from "./dbConnect";
import Website from "@/models/Website";
import { Types } from "mongoose";

export interface Page {
  title: string;
  slug: string;
  uuid?: string;
  blogID?: string;
  metaTitleAr?: string;
  metaDescriptionAr?: string;
  metaTitleEn?: string;
  metaDescriptionEn?: string;
  RedirectPage?: string;
}

export interface WebsiteData {
  _id: Types.ObjectId;
  name: string;
  domain: string;
  pages: Page[];
  defaultPages: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * البحث عن بيانات الموقع باستخدام slug
 * @param slug معرف الصفحة (slug)
 * @returns بيانات الصفحة أو null إذا لم توجد
 */
export async function getWebsiteDataBySlug(slug: string) {
  try {
    await dbConnect();
    const website = (await Website.findOne({
      name: { $regex: "production", $options: "i" },
    }).lean()) as WebsiteData | null;

    if (!website) {
      console.error("Website not found");
      return null;
    }

    // ✅ البحث بـ slug كـ string - البحث الدقيق أولاً
    let page = website.pages.find((page: Page) => {
      return page.slug === slug;
    });

    // إذا لم يتم العثور على مطابقة دقيقة، ابحث عن مطابقة جزئية
    if (!page) {
      page = website.pages.find((page: Page) => {
        const pageSlug = page.slug?.toLowerCase() || "";
        const searchSlug = slug.toLowerCase();
        const isMatch =
          pageSlug.includes(searchSlug) || searchSlug.includes(pageSlug);
        if (isMatch) {
        }
        return isMatch;
      });
    }

    if (!page) {
      console.error(`Page with slug "${slug}" not found`);
      return null;
    }

    // التحقق من وجود صفحة إعادة توجيه
    if (page.RedirectPage) {
      let targetPage = website.pages.find((p: Page) =>
        p.title.toLowerCase().includes(page.RedirectPage?.toLowerCase() ?? ""),
      );

      if (!targetPage) {
        targetPage = website.pages.find(
          (p: Page) =>
            p.uuid?.toLowerCase() === page.RedirectPage?.toLowerCase(),
        );
      }

      // البحث في slug أيضاً للـ redirect
      if (!targetPage) {
        targetPage = website.pages.find(
          (p: Page) => p.slug === page.RedirectPage,
        );
      }

      // البحث في blogID أيضاً للـ redirect (string comparison)
      if (!targetPage) {
        targetPage = website.pages.find(
          (p: Page) => String(p.blogID) === String(page.RedirectPage),
        );
      }

      if (targetPage) {
        return {
          ...targetPage,
          isRedirected: true,
          originalPage: page,
        };
      } else {
        console.warn("❌ لم يتم العثور على صفحة إعادة التوجيه");
      }
    }

    return page;
  } catch (error) {
    console.error("Error fetching website data by slug:", error);
    return null;
  }
}

/**
 * دالة مساعدة للبحث عن عدة صفحات بـ slugs
 * @param slugs مصفوفة من slugs
 * @returns مصفوفة من بيانات الصفحات
 */
export async function getMultipleWebsiteDataBySlugs(slugs: string[]) {
  try {
    await dbConnect();
    const website = (await Website.findOne({
      name: { $regex: "production", $options: "i" },
    }).lean()) as WebsiteData | null;

    if (!website) {
      console.error("Website not found");
      return [];
    }

    // ✅ البحث بـ slugs كـ strings
    const pages = website.pages.filter((page: Page) => {
      const hasValidSlug = page.slug && page.slug.trim() !== "";
      if (!hasValidSlug) return false;

      const isIncluded = slugs.some((slug) => page.slug === slug);
      if (isIncluded) {
      }
      return isIncluded;
    });

    return pages;
  } catch (error) {
    console.error("Error fetching multiple website data by slugs:", error);
    return [];
  }
}

/**
 * دالة للبحث المرن - بـ slug أو title أو uuid
 * @param searchTerm مصطلح البحث
 * @returns بيانات الصفحة
 */
export async function getWebsiteDataByFlexibleSearch(searchTerm: string) {
  try {
    await dbConnect();
    const website = (await Website.findOne({
      name: { $regex: "production", $options: "i" },
    }).lean()) as WebsiteData | null;

    if (!website) {
      console.error("Website not found");
      return null;
    }

    let page: Page | undefined;

    // 1. البحث الدقيق بـ slug
    page = website.pages.find((p: Page) => p.slug === searchTerm);
    if (page) {
      return page;
    }

    // 2. البحث الدقيق بـ uuid
    page = website.pages.find((p: Page) => p.uuid === searchTerm);
    if (page) {
      return page;
    }

    // 3. البحث الدقيق بـ blogID
    page = website.pages.find(
      (p: Page) => String(p.blogID) === String(searchTerm),
    );
    if (page) {
      return page;
    }

    // 4. البحث الجزئي بـ title
    page = website.pages.find((p: Page) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (page) {
      return page;
    }

    // 5. البحث الجزئي بـ slug
    page = website.pages.find(
      (p: Page) =>
        p.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm.toLowerCase().includes(p.slug.toLowerCase()),
    );
    if (page) {
      return page;
    }

    return null;
  } catch (error) {
    console.error("Error in flexible search:", error);
    return null;
  }
}
