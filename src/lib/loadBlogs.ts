// src/lib/loadBlogs.ts
import axios from "axios";

export async function loadBlogsData() {
  // تحقق من وجود window (client-side only)
  if (typeof window === "undefined") {
    console.log("⏭️ Skipping blog loading on server side");
    return;
  }

  // ✅ تحقق من وجود بيانات في الـ store مسبقاً (blogs)
  try {
    const { blogStoreApi } = await import("@/store/store");
    const currentState = blogStoreApi.getState();
    if (currentState.blogs && currentState.blogs.length > 0) {
      console.log("✅ Blogs already exist in store, skipping API fetch.");
      return;
    }
    // ✅ تحقق من وجود بيانات للـ website مسبقاً
    if (currentState.websiteId) {
      console.log(
        "✅ Website data already exists in store, skipping API fetch.",
      );
      return;
    }
  } catch (storeError) {
    console.error("❌ Error checking blog/website store:", storeError);
    // نكمل التحميل إذا حدث خطأ في التحقق من الـ store
  }

  try {
    console.log("🔄 Starting blog data loading...");

    // Fetch website ID first
    console.log("📡 Fetching website with production search...");
    const websiteResponse = await axios.get(
      "/api/websites/websites?search=production",
    );

    console.log("📡 Website response:", websiteResponse.data);
    const websiteId = websiteResponse.data?.id;
    if (!websiteId) {
      console.error(
        "❌ Website ID not found in response:",
        websiteResponse.data,
      );
      return;
    }
    console.log("✅ Found website ID:", websiteId);

    // Fetch blogs data
    console.log("📚 Fetching blogs for website ID:", websiteId);
    const blogsResponse = await axios.get(
      `/api/blogs/blogs?websiteId=${websiteId}`,
    );

    console.log("📚 Blogs response:", blogsResponse.data);
    const postsData = Array.isArray(blogsResponse.data.posts)
      ? blogsResponse.data.posts
      : [];
    console.log("📚 Found", postsData.length, "blog posts");

    // ✅ Update store with blogs data - استخدام الطريقة الصحيحة
    try {
      const { blogStoreApi } = await import("@/store/store.ts");

      // ✅ استخدام getState() مع الطريقة الصحيحة
      const currentState = blogStoreApi.getState();

      // ✅ استخدام الإكشنز من الطريقة الصحيحة
      currentState.setBlogs(postsData);
      currentState.setLoading(false);

      console.log("✅ Successfully updated blog store");
    } catch (storeError) {
      console.error("❌ Error updating blog store:", storeError);
    }
  } catch (error) {
    console.error("❌ Error loading blogs data:", error);

    // ✅ Try to update store with error if available
    try {
      const { blogStoreApi } = await import("@/store/store");
      const currentState = blogStoreApi.getState();

      currentState.setError("Failed to load blogs data");
      currentState.setLoading(false);
    } catch (storeError) {
      console.error("❌ Error updating store with error:", storeError);
    }
  }
}

// Alternative function for server-side data loading
export async function loadBlogsDataSSR() {
  try {
    console.log("🖥️ Server-side blog loading - implement if needed");
    return [];
  } catch (error) {
    console.error("❌ Error in server-side blog loading:", error);
    return [];
  }
}
