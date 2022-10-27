const ModelProduct = require("../models/products");
const { response } = require("../middlewares/common");
const ProductController = {
  update: (req, res, next) => {
    ModelProduct.updateData(req.params.id, req.body)
      .then((result) =>
      response(res, 200, true, result, "update data success"))
      .catch((err) => response(res, 404, false, err, "get data fail"));
  },
  delete: (req, res, next) => {
    ModelProduct.deleteData(req.params.id)
      .then((result) =>
        response(res, 200, true, result, "delete data success")
      )
      .catch((err) => response(res, 404, false, err, "get data fail"));
  },
  getProduct: (req, res, next) => {
    ModelProduct.selectData()
      .then((result) =>
        response(res, 200, true, result.rows, "get data success")
        )
        .catch((err) => response(res, 404, false, err, "get data fail"));
      },
      getProductDetail: (req, res, next) => {
        ModelProduct.selectDatabyId(req.params.id)
        .then((result) => 
        response(res, 200, true, result.rows, "get data success"))
        .catch((err) =>response(res, 404, false, err, "get data fail"));
      },
      insert: (req, res, next) => {
        ModelProduct.insertData(req.body)
        .then((result) =>
        response(res, 200, true, result, "input data success"))
      .catch((err) =>response(res, 404, false, err, "get data fail"));
  },
};

exports.ProductController = ProductController;
