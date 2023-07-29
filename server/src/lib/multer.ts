import multer, { Multer } from "multer";
import { Request } from "express";

// Set storage engine for Multer
const storage: multer.StorageEngine = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) {
    cb(null, "./images/"); // Destination folder to save the uploaded files
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) {
    cb(null, `IMG-${Date.now()}.${file.mimetype.split("/")[1]}`); // Use the original file name as the saved file name
  },
});

// File filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  // Check if the uploaded file is an image
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only image files are allowed"), false); // Reject the file
  }
};

// Initialize Multer
const upload: Multer = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
