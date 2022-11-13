const ModelProduct = require("../models/products");
const { response } = require("../middlewares/common");
const cloudinary = require("../config/photo")
// const client = require("../config/redis")

const ProductController = {
  update: async(req, res, next) => {
    try{
      req.body.stock = parseInt(req.body.stock)
      req.body.price = parseInt(req.body.price)
      req.body.category_id = parseInt(req.body.category_id)
    // cloudinary upload to folder food
    const image = await cloudinary.uploader.upload(req.file.path, { folder: 'food' })
    // get url cloudinary
    req.body.photo = image.url
    await ModelProduct.updateData(req.params.id,req.body)
    return response(res, 200, true, req.body, "update data success")
  } catch (e){
    return response(res, 404, false, e, "update data fail")
  }
  },
  delete: (req, res, next) => {
    ModelProduct.deleteData(req.params.id)
      .then((result) =>
        response(res, 200, true, result, "delete data success")
      )
      .catch((err) => response(res, 404, false, err, "get data fail"));
  },
  getProduct: async(req, res, next) => {
    try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const offset = (page - 1) * limit
    const sortby = req.query.sortby || "name"
    const sort = req.query.sort || "ASC"
    const search = req.query.search || '';
    const result = await ModelProduct.selectData({limit,offset,sort,sortby,search})
    response(res, 200, true, result.rows, "get data success")
    } 
    catch(err){
      console.log(err)
      response(res, 404, false, err, "get data fail");
    }
    },
      getProductDetail: (req, res, next) => {
        ModelProduct.selectDatabyId(req.params.id)
        .then((result) => {
          // client.setEx(`product/${req.params.id}`,60*60,JSON.stringify(result.rows))
          response(res, 200, true, result.rows, "get data success")
        })
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
