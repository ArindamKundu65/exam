import jwt from "jsonwebtoken";
import "dotenv/config";
import userSchema from "../models/userSchema.js";

export const hasToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.secretKey);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Access token has expired",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Access token is missing or invalid",
        });
      }
    }

    const user = await userSchema.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.userId = decoded.id;
    next();

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Could not access",
    });
  }
};