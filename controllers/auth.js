const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, email, picture } = req.user;
  // console.log(req.user);

  try {
    // Find user by email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User exists, update the profile
      const updatedUser = await User.findOneAndUpdate(
        { email },

        { username: email.split("@")[0], name, picture },
        { new: true }
      );
      // console.log("User updated:", updatedUser);
      res.json(updatedUser);
    } else {
      // User does not exist, create a new user
      const newUser = new User({
        username: email.split("@")[0],
        name,
        email,
        picture,
      });
      const savedUser = await newUser.save();
      // console.log("New user created:", savedUser);
      res.json(savedUser);
    }
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
