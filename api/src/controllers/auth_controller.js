const User = require("../models/UserModel");
const { express, jwt, secretKey } = require("../references/custom_refs");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(200).json({
      status: false,
      message: "account with this email already exists",
      data: {},
    });
  } else {
    const newUser = new User(req.body);
    const userSaved = await newUser.save();
    const token = jwt.sign({ userId: userSaved._id }, secretKey, {
      expiresIn: "1d",
    });
    if (userSaved) {
      const userWithToken = { ...userSaved.toJSON(), token };
      res.status(200).json({
        status: true,
        data: userWithToken,
        message: "account is created",
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "account is created",
        data: {},
      });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(200).json({
        status: false,
        message: "Invalid email or password",
        data: {},
      });
    }

    // Create and sign JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1d",
    });
     const userWithToken = { ...user.toJSON(), token };
      res.status(200).json({
        status: true,
        data: userWithToken,
        message: "Login successful",
      });
   
  } catch (error) {
    console.error(error);
    res.status(200).json({
      status: false,
      message: "Internal server error",
      data: {},
    });
  }
});

module.exports = router;