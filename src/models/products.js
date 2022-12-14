const Pool = require("./../config/db");

const selectData = ({limit,offset,sort,sortby,search}) => {
  console.log(limit,offset,sort,sortby)
  return Pool.query(
    `SELECT products.id,products.name,products.stock,  products.price, category.name as category, products.photo FROM products  JOIN category ON products.category_id = category.id WHERE (products.name) ILIKE ('%${search}%') 
    ORDER BY products.${sortby} ${sort} LIMIT ${limit} OFFSET ${offset} `
  );
};

const selectDatabyId = (id) => {
  return Pool.query(
    `SELECT products.id,products.name,products.stock,  products.price, category.name as category, products.photo FROM products  JOIN category ON products.category_id = category.id WHERE products.id='${id}' `
  );
};

const insertData = (data) => {
  const { name, stock, price,photo } = data;
  console.log('data',data)
  return Pool.query(
    `INSERT INTO products(name,stock,price,category_id,photo) VALUES('${name}',${stock},${price},1,'${photo}')`
    );
  };
  
  const updateData = (id, data) => {
  const { name, stock, price,photo } = data;
  return Pool.query(
    `UPDATE products SET name='${name}',stock='${stock}',price='${price}',photo='${photo}' WHERE id='${id}'`
  );
};

const deleteData = (id) => {
  return Pool.query(`DELETE FROM products where id='${id}'`);
};

module.exports = {
  selectData,
  insertData,
  deleteData,
  updateData,
  selectDatabyId,
};
