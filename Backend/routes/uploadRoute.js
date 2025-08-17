import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
const router = express.Router();

import Upload from "../models/Upload.js"; // ✅ import Upload model
import authMiddleware from "../middleware/authmiddleware.js"; // ✅ protect the route

// Create uploads folder if it doesn't exist
const uploadPath = path.join(path.resolve(), "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/vnd.ms-excel" || // .xls
    file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only Excel files are allowed (.xls, .xlsx)"), false);
  }
};

const upload = multer({ storage, fileFilter });

// ✅ Upload Route (with saving metadata)
router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const { originalname, size, mimetype } = req.file;

    const newUpload = new Upload({
      filename: originalname,
      size,
      mimetype,
      user: req.user.userId, // set in authMiddleware
    });

    await newUpload.save();

    res.status(200).json({
      message: "File uploaded and saved to history",
      file: originalname,
    });
  } catch (err) {
    console.error("Upload DB save error:", err);
    res.status(500).json({ message: "Failed to save upload info" });
  }
});

// ✅ GET Upload History Route (for logged-in user)
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const uploads = await find({ user: req.user.userId })
      .sort({ createdAt: -1 }) // recent first
      .select("filename size mimetype createdAt"); // select what you need

    res.json({ uploads });
  } catch (err) {
    console.error("Error fetching upload history:", err);
    res.status(500).json({ message: "Failed to fetch upload history" });
  }
});

export default router;
