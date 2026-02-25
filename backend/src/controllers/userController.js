import userSchema from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"


export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body

    const existing = await userSchema.findOne({
      email: email
    })

    if (existing) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userSchema.create({
      userName, email, password: hashedPassword
    })

    const token = jwt.sign({ id: user._id }, process.env.secretKey, {
      expiresIn: "5m"
    })

    user.token = token
    await user.save()

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: user
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      } else if (passwordCheck === true) {

   

        const accessToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.secretKey,
          {
            expiresIn: "10d",
          }
        );

        user.isLoggedIn = true;
        await user.save();
        return res.status(200).json({
          success: true,
          message: "User Logged in Successfully",
          accessToken: accessToken,
          data: user,
        });
      } 
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const logout = async(req, res) => {
  try {

      await userSchema.findByIdAndUpdate( req.userId, { isLoggedin: false })

      return res.status(200).json({
        success: true,
        message: "Session ended successfully",
      })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


