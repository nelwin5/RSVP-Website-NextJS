import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  try {
    console.log("🔥 Upload API called"); // Debugging step

    const formData = await req.formData();
    console.log("📂 FormData received:", formData); // Debugging step

    const file = formData.get("file") as Blob | null;
    if (!file) {
      console.error("❌ No file received");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Buffer and Base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString("base64");
    console.log("✅ File converted to Base64");

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(`data:image/png;base64,${base64String}`, {
      folder: "wedding-gallery",
    });

    console.log("✅ Cloudinary Upload Response:", uploadResponse);

    return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
