const Cookie = require("../../db/models/Cookie");

exports.fetchCookie = async (cookieId, next) => {
  try {
    const cookie = await Cookie.findById(cookieId);
    return cookie;
  } catch (error) {
    next(error);
  }
};

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
    await Cookie.findByIdAndRemove({ _id: req.cookie.id });

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};

exports.cookieUpdate = async (req, res, next) => {
  try {
    const cookie = await Cookie.findByIdAndUpdate(
      { _id: req.cookie.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(cookie);
  } catch (error) {
    next(error);
  }
};
