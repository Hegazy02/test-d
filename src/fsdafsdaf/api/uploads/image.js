import multer from "multer";
import { put } from "@vercel/blob";
import path from "path";
import fs from "fs/promises";
import { createRouter } from "next-connect";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});

const router = createRouter();

router.use(upload.single("file")).post(async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No file uploaded", message: "No file uploaded" });
    }

    const file = req.file;
    const imageAlt = req.body.imageAlt || "";

    // طباعة معلومات الملف للتتبع
    console.log("Upload API - Received file:", {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      imageAlt: imageAlt,
    });

    // استخدام اسم الملف الأصلي إذا كان متوفراً ولا يحتوي على رموز غريبة فقط
    let fileName;

    if (
      file.originalname &&
      file.originalname !== "blob" &&
      file.originalname !== "undefined" &&
      file.originalname.length > 4
    ) {
      // التأكد من أن الاسم ليس قصير جداً

      // استخدام اسم الملف الأصلي مباشرة
      fileName = file.originalname;
      console.log("Using original filename:", fileName);
    } else {
      // خطة احتياطية: استخدام imageAlt أو توليد اسم جديد
      const fileExt = path.extname(file.originalname || ".jpg").toLowerCase();
      fileName = imageAlt
        ? `${slugify(imageAlt)}${fileExt}`
        : `blog-${Date.now()}${fileExt}`;
      console.log("Generated fallback filename:", fileName);
    }

    // رفع الملف إلى Vercel Blob
    const blob = await put(fileName, file.buffer, {
      access: "public",
      contentType: file.mimetype,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: true, // إضافة لاحقة عشوائية إذا كان الملف موجود
    });

    console.log("Upload successful:", {
      originalFileName: fileName,
      finalFileName: blob.pathname ? blob.pathname.split("/").pop() : fileName,
      fileUrl: blob.url,
    });

    // استخراج اسم الملف النهائي من URL أو pathname
    const finalFileName = blob.pathname
      ? blob.pathname.split("/").pop()
      : fileName;

    return res.status(200).json({
      success: true,
      fileUrl: blob.url,
      fileName: finalFileName, // اسم الملف النهائي بعد الرفع
      originalFileName: fileName, // الاسم الأصلي المرسل
      filePath: blob.pathname || blob.url,
    });
  } catch (error) {
    console.error("Error processing file upload:", error);
    return res.status(500).json({
      error: "Failed to process file upload",
      details: error.message,
    });
  }
});

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default router.handler({
  onError: (err, req, res) => {
    console.error("Router error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
