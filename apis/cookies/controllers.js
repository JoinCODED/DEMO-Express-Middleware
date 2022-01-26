const Cookie = require("../../db/models/Cookie");
exports.cookieCreate = async (req, res, next) => {
  try {
    const newCookie = await Cookie.create(req.body);
    return res.status(201).json(newCookie);
  } catch (error) {
    next(error);
  }
};

exports.cookieList = async (req, res, next) => {
  try {
    const cookies = await Cookie.find();
    res.json(cookies);
  } catch (error) {
    next(error);
  }
};

exports.cookieDetail = async (req, res, next) => {
  try {
    const { cookieId } = req.params;
    const foundCookie = await Cookie.findById(cookieId);
    if (foundCookie) {
      res.status(200).json(foundCookie);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.cookieDelete = async (req, res, next) => {
  try {
    const { cookieId } = req.params;
    const foundCookie = await Cookie.findByIdAndRemove({ _id: cookieId });
    if (foundCookie) {
      res.status(204).json({ message: "Product deleted" });
    } else {
      next({ status: 404, message: "cookie Not Found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.cookieUpdate = async (req, res, next) => {
  try {
    const { cookieId } = req.params;
    const cookie = await Cookie.findByIdAndUpdate({ _id: cookieId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (cookie) return res.json(cookie);
    else next({ status: 404, message: "cookie Not Found" });
  } catch (error) {
    next(error);
  }
};
