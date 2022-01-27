const express = require("express");

const router = express.Router();
const {
  cookieCreate,
  cookieList,
  cookieDetail,
  cookieDelete,
  cookieUpdate,
  fetchCookie,
} = require("./controllers");

router.param("cookieId", async (req, res, next, cookieId) => {
  const cookie = await fetchCookie(cookieId, next);
  if (cookie) {
    req.cookie = cookie;
    next();
  } else {
    const err = new Error("Cookie Not Found");
    err.status = 404;
    next(err);
  }
});

// Cookie Create
router.post("/", cookieCreate);

// Cookie List
router.get("/", cookieList);

// Cookie Detail
router.get("/:cookieId", cookieDetail);

// Cookie Delete
router.delete("/:cookieId", cookieDelete);

//Cookie update
router.put("/:cookieId", cookieUpdate);

module.exports = router;
