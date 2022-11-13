const express = require("express");
const router = express.Router();
const { ProductController } = require("../controllers/products");
const { validateStock } = require("../helpers/stock");
const { protect,roleToko } = require("../middlewares/auth");
const upload  = require("../middlewares/upload");
// const {hitCache,clearCache}  = require("../middlewares/redis");

router.get("/",ProductController.getProduct);
router.get("/:id",ProductController.getProductDetail);
router.post("/",upload.single('photo'), ProductController.insert);
router.put("/:id",upload.single('photo'),ProductController.update);
router.delete("/:id",ProductController.delete);

module.exports = router;
