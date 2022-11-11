const ModelProduct = require("../models/products");
const { response } = require("../middlewares/common");
const cloudinary = require("../config/photo")
// const client = require("../config/redis")

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
          // client.setEx(`product/${req.params.id}`,60*60,JSON.stringify(result.rows))
          response(res, 200, true, result.rows, "get data success")
        })
        .catch((err) =>response(res, 404, false, err, "get data fail"));
      },
      insert: async(req, res, next) => {
        try{
          req.body.stock = parseInt(req.body.stock)
          req.body.price = parseInt(req.body.price)
          req.body.category_id = parseInt(req.body.category_id)
        // cloudinary upload to folder food
        const image = await cloudinary.uploader.upload(req.file.path, { folder: 'food' })
        // get url cloudinary
        req.body.photo = image.url
        await ModelProduct.insertData(req.body)
        return response(res, 200, true, req.body, "input data success")
      } catch (e){
        return response(res, 404, false, e, "input data fail")
      }
  },
};

exports.ProductController = ProductController;
