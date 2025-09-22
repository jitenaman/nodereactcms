const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/User");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    // Insert default admin user if not exists
    const existing = await User.findOne({ username: "admin" });
    if (!existing) {
      await User.create({
        username: "admin",
        password: "admin123"  // will get hashed automatically
      });
      console.log("Admin user created (username: admin, password: admin123)");
    } else {
      console.log("Admin user already exists");
    }

    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();
