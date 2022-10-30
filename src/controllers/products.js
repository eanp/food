const ModelProduct = require("../models/products");
const { response } = require("../middlewares/common");
const client = require("../config/redis")
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
        .then((result) => {
          client.setEx(`product/${req.params.id}`,60*60,JSON.stringify(result.rows))
          response(res, 200, true, result.rows, "get data success")
        })
        .catch((err) =>response(res, 404, false, err, "get data fail"));
      },
      insert: (req, res, next) => {
        const Port = process.env.PORT
        const Host = process.env.HOST
        const photo = req.file.filename
        const uri = `http://${Host}:${Port}/img/${photo}`
        req.body.photo = uri
        req.body.stock = parseInt(req.body.stock)
        req.body.price = parseInt(req.body.price)
        ModelProduct.insertData(req.body)
        .then((result) =>
        response(res, 200, true, result, "input data success"))
      .catch((err) =>response(res, 404, false, err, "input data fail"));
  },
};

exports.ProductController = ProductController;
