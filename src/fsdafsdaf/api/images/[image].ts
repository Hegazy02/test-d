import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// غيّر هذا إلى المسار الأساسي في Vercel Blob
const BLOB_BASE_URL = "https://4stoqepuhlprywzv.public.blob.vercel-storage.com"; // عدّل هذا حسب رابط التخزين الفعلي

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { image } = req.query;

  if (!image || typeof image !== "string") {
    return res.status(400).json({ error: "Invalid image name" });
  }
  try {
    const response = await axios.get(`${BLOB_BASE_URL}/${image}`, {
      responseType: "stream",
    });
    res.setHeader("Content-Type", response.headers["content-type"]);
    response.data.pipe(res);
  } catch (error) {
    res.status(404).json({ error: "Image not found" });
  }
}
