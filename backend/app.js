import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./configs/db.js";
import authRouter from "./routes/UserRoutes.js";
import { register } from "./controllers/AuthController.js";

// CONFIGURATION
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ROUTES
app.get("/", (req, res) => res.json("Hello World!"));
app.post("/auth/user/signup", upload.single("picture"), register);
app.use("/auth/user", authRouter);

// DATABASE CONNECTION
await connectDB();

// START SERVER ONLY AFTER DB CONNECTS

app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);
