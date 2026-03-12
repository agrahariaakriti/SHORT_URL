import {
  craete_shorturl_srv,
  get_longul_srv,
} from "../services/url.service.js";

export const create_short_url = async (req, res) => {
  try {
    const url = req.body.url;
    if (!url) {
      return res.status(400).json({ msg: "Url not found" });
    }
    const shorturl = await craete_shorturl_srv(url);

    return res.status(200).json({ msg: "Url created successfully", shorturl });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ msg: error.message || "Internal Server Error" });
  }
};

export const redirect_url = async (req, res) => {
  try {
    const code = req.params.code;

    const longurl = await get_longul_srv(code);
    return res
      .status(200)
      .json({ msg: "Url redirected Successfully", longurl: longurl });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ msg: error.message || "Internal Server Error" });
  }
};

export const click_tracker = async (req, res) => {};
