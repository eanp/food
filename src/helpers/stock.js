const validateStock = (req, res, next) => {
  const { name, stock, price } = req.body;
  let err = [];
  try {
    if (!name || !isNaN(name) || name.length < 4)
      err.push("name must more than 4  character");
    if (!stock || isNaN(stock)) err.push("stock must be number and not 0");
    if (!price || isNaN(price)) err.push("price must be number and not 0");
    if (err.length > 0) {
      throw new Error(err.toString());
    }
    next();
  } catch (err) {
    err.status = 404;
    next(err);
    return;
  }
};

module.exports = { validateStock };
