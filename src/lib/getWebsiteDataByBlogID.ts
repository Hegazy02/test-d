// src\lib\getWebsiteDataByBlogID.ts
import dbConnect from "./dbConnect";
import Website from "@/models/Website";
import useStore from "./store";
import { Types } from "mongoose";

export interface Page {
  title: string;
  slug: string;
  uuid?: string;
  blogID?: string; // إضافة blogID للصفحة
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

// Default metadata for when database is not available
const DEFAULT_METADATA = {
  title: "Darb Productions - Media Production & Event Management",
  description:
    "Darb Productions helps brands come to life through media production, event management, printing, and booth production services.",
};

/**
 * البحث عن بيانات الموقع باستخدام blogID
 * @param blogID معرف المقال الفريد (string)
 * @returns بيانات الصفحة أو null إذا لم توجد
 */
export async function getWebsiteDataByBlogID(blogID: string) {
  try {
    await dbConnect();
    const website = (await Website.findOne({
      name: { $regex: "production", $options: "i" },
    }).lean()) as WebsiteData | null;

    if (!website) {
      console.error("Website not found");
      return null;
    }

    // ✅ البحث بـ blogID كـ string
    const page = website.pages.find((page: Page) => {
      return String(page.blogID) === String(blogID);
    });

    if (!page) {
      console.warn(`Page with blogID "${blogID}" not found`);
      return null;
    }

    if (page.RedirectPage) {
      let targetPage = website.pages.find((p: Page) =>
        p.title.toLowerCase().includes(page.RedirectPage?.toLowerCase() ?? "")
      );

      if (!targetPage) {
        targetPage = website.pages.find(
          (p: Page) =>
            p.uuid?.toLowerCase() === page.RedirectPage?.toLowerCase()
        );
      }

      // ✅ البحث في blogID أيضاً للـ redirect (string comparison)
      if (!targetPage) {
        targetPage = website.pages.find(
          (p: Page) => String(p.blogID) === String(page.RedirectPage)
        );
      }
    }

    return page;
  } catch (error) {
    console.error("Error fetching website data by blogID:", error);
    return null;
  }
}

/**
 * دالة مساعدة للبحث عن عدة صفحات بـ blogIDs
 * @param blogIDs مصفوفة من معرفات المقالات (strings)
 * @returns مصفوفة من بيانات الصفحات
 */
export async function getMultipleWebsiteDataByBlogIDs(blogIDs: string[]) {
  try {
    await dbConnect();
    const website = (await Website.findOne({
      name: { $regex: "production", $options: "i" },
    }).lean()) as WebsiteData | null;

    if (!website) {
      console.error("Website not found");
      return [];
    }

    // ✅ البحث بـ blogIDs كـ strings
    const pages = website.pages.filter((page: Page) => {
      const hasValidBlogID = page.blogID && page.blogID.trim() !== "";
      if (!hasValidBlogID) return false;

      const isIncluded = blogIDs.some(
        (id) => String(page.blogID) === String(id)
      );
      return isIncluded;
    });

    return pages;
  } catch (error) {
    console.error("Error fetching multiple website data by blogIDs:", error);
    return [];
  }
}

/**
 * دالة للتحقق من كون القيمة رقم
 * @param value القيمة المراد فحصها
 * @returns true إذا كانت رقم، false إذا لم تكن
 */
function isNumeric(value: string): boolean {
  return (
    !isNaN(Number(value)) &&
    !isNaN(parseFloat(value)) &&
    isFinite(Number(value))
  );
}

/**
 * دالة البحث الأساسية - محدثة للبحث الصحيح بـ string
 * @param pageName اسم الصفحة أو المعرف
 * @returns بيانات الصفحة
 */
export async function getWebsiteData(pageName: string) {
  try {
    const store = useStore.getState();
    if (store.websiteId) {
      // يمكنك هنا إرجاع البيانات من الstore مباشرة إذا أردت
      return store.websiteData || null;
    }

    await dbConnect();

    // ✅ العثور على موقع الإنتاج مع حماية blogID
    const website = (await Website.findOne({
      name: { $regex: "production", $options: "i" },
    }).lean()) as WebsiteData | null;

    if (!website) {
      console.error("Website not found");
      return null;
    }

    let page: Page | undefined;

    // إذا كان pageName رقماً، ابحث فقط بـ blogID
    if (isNumeric(pageName)) {
      page = website.pages.find((page: Page) => {
        return String(page.blogID) === String(pageName);
      });
    } else {
      // إذا لم يكن رقماً، ابحث بالطرق التقليدية (title, slug, uuid, blogID)

      // البحث بـ title
      page = website.pages.find((page: Page) =>
        page.title.toLowerCase().includes(pageName.toLowerCase())
      );

      // البحث بـ slug إذا لم يتم العثور على شيء
      if (!page) {
        page = website.pages.find((page: Page) =>
          page.slug.toLowerCase().includes(pageName.toLowerCase())
        );
      }

      // البحث بـ uuid إذا لم يتم العثور على شيء
      if (!page) {
        page = website.pages.find((page: Page) => {
          return page.uuid === pageName;
        });
        if (page) {
        }
      }

      // البحث بـ blogID كخيار أخير (تحويل كلاهما إلى string)
      if (!page) {
        page = website.pages.find((page: Page) => {
          return String(page.blogID) === String(pageName);
        });
      }
    }

    if (!page) {
      console.error(`Page with name/slug/uuid/blogID "${pageName}" not found`);
      return null;
    }

    // ✅ التحقق من أن صفحة المدونة تحتفظ بـ blogID = "1"
    if (page.slug === "blog" && page.blogID !== "1") {
      // البحث عن الصفحة في قاعدة البيانات وتحديثها
      try {
        await Website.updateOne(
          {
            name: { $regex: "production", $options: "i" },
            "pages.slug": "blog",
          },
          {
            $set: { "pages.$.blogID": "1" },
          }
        );
        page.blogID = "1"; // تحديث النسخة المحلية أيضاً
      } catch (error) {
        console.error("❌ خطأ في إصلاح blogID:", error);
      }
    }

    // التحقق من وجود صفحة إعادة توجيه
    if (page.RedirectPage) {
      let targetPage = website.pages.find((p: Page) =>
        p.title.toLowerCase().includes(page.RedirectPage?.toLowerCase() ?? "")
      );

      if (!targetPage) {
        targetPage = website.pages.find(
          (p: Page) =>
            p.uuid?.toLowerCase() === page.RedirectPage?.toLowerCase()
        );
      }

      // البحث في blogID أيضاً للـ redirect (تحويل كلاهما إلى string)
      if (!targetPage) {
        targetPage = website.pages.find(
          (p: Page) => String(p.blogID) === String(page.RedirectPage)
        );
      }

      if (targetPage) {
        return {
          ...targetPage,
          isRedirected: true,
          originalPage: page,
        };
      } else {
        console.log("❌ لم يتم العثور على صفحة إعادة التوجيه");
      }
    }

    return page;
  } catch (error) {
    console.error("Error fetching website data:", error);
    return null;
  }
}

export async function initializeWebsiteData() {
  try {
    const store = useStore.getState();
    if (store.websiteId) {
      return;
    }

    await dbConnect();

    // ✅ العثور على موقع الإنتاج
    const website = (await Website.findOne({
      name: { $regex: "production", $options: "i" },
    }).lean()) as WebsiteData | null;

    if (!website) {
      console.error("Website not found");
      return;
    }

    store.setWebsiteData(website);
    store.setPages(website.pages || []);
    store.setWebsiteId(website._id.toString());
  } catch (error) {
    console.error("Error initializing website data:", error);
  }
}
