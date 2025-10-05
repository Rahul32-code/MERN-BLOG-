// seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/admin.model.js"; // apne path ke hisaab se adjust karo

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const existingAdmin = await Admin.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
    } else {
      const admin = new Admin({
        email: "admin@example.com",
        password: "admin123", // yeh automatically hash ho jayega
      });
      await admin.save();
      console.log("Dummy admin created");
    }
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
