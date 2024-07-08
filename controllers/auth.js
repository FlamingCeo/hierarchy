const connectDB = require("../models");
const { user } = connectDB;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // Return error if email or password is missing
      return res
        .status(401)
        .json({ msg: "You must provide email/password" });
    }

    const userLogin = await user.scope("withPassword").findOne({
      where: { email: email },
    });

    if (!userLogin) {
        // Return unauthorized if user does not exist
      return res
        .status(404)
        .json({ msg: "Account with this email does not exist. Try again." ,status: 404});
    }

    const passwordCheck = userLogin.password;
    if (!bcrypt.compareSync(password, passwordCheck)) {
      // Return unauthorized if password does not match
      return res.status(401).json({ msg: "Password is incorrect. Try again." });
    }

    const id = new Date().getDate();
    const token = jwt.sign(
      {
        email: userLogin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
      );
        return res.status(200).json({
          accessToken: token,
        });
  } catch (error) {
    console.error("*********Error from login*********",error);
  }
};

module.exports = {
  login,
};
