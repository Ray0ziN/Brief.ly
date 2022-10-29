const express = require("express");
const app = express();

//Middleware parse data
app.use(express.json());


const audioRouter = require('./router')
app.use("/",audioRouter)


//add a env for port in production
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is listening ${PORT}...`);
});
