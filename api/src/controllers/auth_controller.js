const User = require("../models/UserModel");
const { express, jwt, secretKey } = require("../references/custom_refs");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log(req.body);
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        status: false,
        message: "An account with this email already exists",
        data: {},
      });
    } else {
      // Create a new user
      const newUser = new User({ name, email, password, role });
      const userSaved = await newUser.save();
      
      if (userSaved) {
        // Generate token
        const token = jwt.sign({ userId: userSaved._id }, secretKey, {
          expiresIn: "1d",
        });
        
        // Include the token in the response data
        const userWithToken = { ...userSaved.toJSON(), token };

        // Send success response with user data and token
        res.status(200).json({
          status: true,
          data: userWithToken,
          message: "Account created successfully",
        });
      } else {
        // Send error response if user creation fails
        return res.status(200).json({
          status: false,
          message: "Failed to create account",
          data: {},
        });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    // Send error response for internal server error
    res.status(200).json({
      status: false,
      message: "Internal server error",
      data: {},
    });
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