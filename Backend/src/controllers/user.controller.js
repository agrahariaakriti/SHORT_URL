import {
  create_user_srv,
  find_user_srv,
  user_logout_srv,
} from "../services/user.service.js";

export const signup = async (req, res) => {
  try {

    const { username, fullname, email, password } = req.body;
    if (!username || !fullname || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const result = await create_user_srv(username, fullname, email, password);

    return res.status(201).json({
      msg: "User created successfully",
      user: result,
    });
  } catch (error) {

    return res
      .status(error.statusCode || 500)
      .json({ msg: error.message || "Internal Server Error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "All field required" });
    }

    const user = await find_user_srv(email, password);
    const option = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    };

    return res
      .status(200)
      .cookie("accessToken", user.accessToken, option)
      .cookie("refreshToken", user.refreshToken, option)
      .json({ msg: "Uer Signin successfully", user });
  } catch (error) {

    return res
      .status(error.statusCode || 500)
      .json({ msg: error.message || "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    };
    await user_logout_srv(req.user);
    return res
      .clearCookie("accessToken", options)
      .json({ msg: "User loggout SuccessFully" });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ msg: error.message || "Internal Server Error" });
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ msg: "Unauthorized No Token Found" });
    }
    const accessToken = await refresh_handler_srv(refreshToken);

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .json({
        msg: "Token refreshed successfully",
        accessToken: result,
      });
  } catch (error) {
    return res
      .status(error.statusCode)
      .json({ msg: error.message || "Internal Server Error" });
  }
};
