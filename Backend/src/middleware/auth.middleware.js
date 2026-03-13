import jwt from "jsonwebtoken";
export const tokenvarify_middleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ msg: "Unauthorized No Token Found" });
    }
    const decodedToken = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET,
    );

    if (!decodedToken) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token Expired" });
    }
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
