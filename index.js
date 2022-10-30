const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mainRouter = require('./src/routes/index')
const { response } = require("./src/middlewares/common");
const app = express();

app.use(morgan("dev"));
app.use(cors());

const port = process.env.PORT;
app.use(bodyParser.json());

app.use("/", mainRouter)

app.all("*",(req,res,next)=> {
  response(res,404,false,null,"404 Not Found")
})

app.get("/", (req, res, next) => {
  res.status(200).json({ status: "success", statusCode: 200 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
