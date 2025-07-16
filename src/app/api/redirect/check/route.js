import dbConnect from "@/lib/dbConnect";
import Website from "@/models/Website";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get("pageName");

    if (!pageName) {
      return NextResponse.json(
        { error: "Page name is required" },
        { status: 400 },
      );
    }

    const website = await Website.findOne({
      name: { $regex: "production", $options: "i" },
    }).lean();

    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    const page = website.pages.find((p) =>
      p.slug.toLowerCase().includes(pageName.toLowerCase()),
    );

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // Check if the page has a redirect
    if (page.RedirectPage) {
      const targetPage = website.pages.find((p) =>
        p.slug
          .toLowerCase()
          .includes(page.RedirectPage.toLowerCase().replace("/", "")),
      );

      if (targetPage) {
        return NextResponse.json({
          shouldRedirect: true,
          targetSlug: targetPage.slug,
        });
      }
    }

    return NextResponse.json({ shouldRedirect: false });
  } catch (error) {
    console.error("Error checking redirect:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
