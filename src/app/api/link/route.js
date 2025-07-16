// src/app/api/link/route.js
import { NextResponse } from "next/server";
import Shortcut from "@/models/shortcut";
import dbConnect from "@/lib/dbConnect";

// GET: Get link by name
export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  console.log(`name`, name);
  if (name) {
    try {
      const shortcut = await Shortcut.findOne({ name: name });
      console.log(`shortcut`, shortcut);
      if (shortcut) {
        return NextResponse.json(shortcut, { status: 200 });
      } else {
        return NextResponse.json({ error: "Link not found" }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Error finding link" },
        { status: 500 },
      );
    }
  } else {
    // Return all links if no name is provided (existing functionality)
    try {
      const data = await Shortcut.find({});
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching shortcuts" },
        { status: 500 },
      );
    }
  }
}

// POST: إنشاء اختصار جديد
export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newShortcut = await Shortcut.create(body);
    return NextResponse.json(newShortcut, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating shortcut" },
      { status: 400 },
    );
  }
}

// DELETE: حذف اختصار عبر ID (تمريره في query param ?id=...)
export async function DELETE(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Shortcut ID is required" },
      { status: 400 },
    );
  }

  try {
    await Shortcut.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting shortcut" },
      { status: 500 },
    );
  }
}
