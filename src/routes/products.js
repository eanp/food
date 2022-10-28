const express = require("express");
const router = express.Router();
const { ProductController } = require("../controllers/products");
const { validateStock } = require("../helpers/stock");
const { protect } = require("../middlewares/auth");
const upload  = require("../middlewares/upload");

router.get("/",protect,ProductController.getProduct);
router.get("/:id",protect,ProductController.getProductDetail);
router.post("/",protect,upload.single('photo'), ProductController.insert);
router.put("/:id",protect,ProductController.update);
router.delete("/:id",protect,ProductController.delete);

module.exports = router;
