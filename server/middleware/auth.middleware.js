import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";  

const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );

      const admin = await Admin.findById(decoded.id).select("-password");

      if (!admin) {
        // 🔐 Clear cookie if admin not found
        res.clearCookie("accessToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        return res.status(401).json({ message: "Unauthorized - Admin Not Found" });
      }

      req.admin = admin;
      next();

    } catch (error) {
      // ✅ Handle token errors here
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized - Token Expired" });
      }

      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

  } catch (error) {
    console.error("Error in protectRoute (Admin):", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default protectRoute;
