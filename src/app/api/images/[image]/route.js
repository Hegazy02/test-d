import { NextResponse } from "next/server";
import axios from "axios";

const BLOB_BASE_URL = "https://4stoqepuhlprywzv.public.blob.vercel-storage.com";

export async function GET(request, { params }) {
  const { image } = params;

  if (!image) {
    return NextResponse.json({ error: "Invalid image name" }, { status: 400 });
  }

  try {
    const response = await axios.get(`${BLOB_BASE_URL}/${image}`, {
      responseType: "stream",
    });

    const headers = new Headers();
    headers.set("Content-Type", response.headers["content-type"]);

    return new NextResponse(response.data, {
      headers,
    });
  } catch (error) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
