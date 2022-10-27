const express = require("express");
const router = express.Router();
const { ProductController } = require("../controllers/products");
const { validateStock } = require("../helpers/stock");

router.get("/", ProductController.getProduct);
router.get("/:id", ProductController.getProductDetail);
router.post("/", validateStock, ProductController.insert);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

module.exports = router;
