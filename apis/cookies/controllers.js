const Cookie = require("../../db/models/Cookie");
exports.cookieCreate = async (req, res) => {
  try {
    const newCookie = await Cookie.create(req.body);
    return res.status(201).json(newCookie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.cookieList = async (req, res) => {
  try {
    const cookies = await Cookie.find();
    res.json(cookies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cookieDetail = async (req, res) => {
  try {
    const { cookieId } = req.params;
    const foundCookie = await Cookie.findById(cookieId);
    if (foundCookie) {
      res.status(200).json(foundCookie);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cookieDelete = async (req, res) => {
  try {
    const { cookieId } = req.params;
    const foundCookie = await Cookie.findByIdAndRemove({ _id: cookieId });
    if (foundCookie) {
      res.status(204).json({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cookieUpdate = async (req, res) => {
  try {
    const { cookieId } = req.params;
    const cookie = await Cookie.findByIdAndUpdate({ _id: cookieId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (cookie) return res.json(cookie);
    else return res.status(404).json({ message: "cookie not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
