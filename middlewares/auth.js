const admin = require("../config/firebase.config");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  const authToken = req.headers.authtoken;
  // console.log("inside auth check---->>>", req.headers);
  try {
    const firebaseUser = await admin.auth().verifyIdToken(authToken);
    req.user = firebaseUser;
    // console.log("inside auth check middleware");
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });
    if (user && user.role === "admin") {
      // console.log("inside admin check middleware");
      next();
    } else {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
