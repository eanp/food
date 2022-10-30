const express = require("express");
const router = express.Router();
const { ProductController } = require("../controllers/products");
const { validateStock } = require("../helpers/stock");
const { protect } = require("../middlewares/auth");
const upload  = require("../middlewares/upload");
const {hitCache,clearCache}  = require("../middlewares/redis");

router.get("/",protect,ProductController.getProduct);
router.get("/:id",protect,hitCache,ProductController.getProductDetail);
router.post("/",protect,upload.single('photo'), ProductController.insert);
router.put("/:id",protect,clearCache,ProductController.update);
router.delete("/:id",protect,clearCache,ProductController.delete);

module.exports = router;
