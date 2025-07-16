import dbConnect from "@/lib/dbConnect";
import Website from "@/models/Website";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();
    const { pageName } = req.query;

    if (!pageName) {
      return res.status(400).json({ error: "Page name is required" });
    }

    const website = await Website.findOne({
      name: { $regex: "production", $options: "i" },
    }).lean();

    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    const page = website.pages.find((p) =>
      p.slug.toLowerCase().includes(pageName.toLowerCase()),
    );

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    // Check if the page has a redirect
    if (page.RedirectPage) {
      const targetPage = website.pages.find((p) =>
        p.slug
          .toLowerCase()
          .includes(page.RedirectPage.toLowerCase().replace("/", "")),
      );

      if (targetPage) {
        return res.status(200).json({
          shouldRedirect: true,
          targetSlug: targetPage.slug,
        });
      }
    }

    return res.status(200).json({ shouldRedirect: false });
  } catch (error) {
    console.error("Error checking redirect:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
