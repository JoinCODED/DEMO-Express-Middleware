const express = require("express");

const router = express.Router();
const {
  cookieCreate,
  cookieList,
  cookieDetail,
  cookieDelete,
  cookieUpdate,
} = require("./controllers");

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
