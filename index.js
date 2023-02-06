require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const commentRoutes = require("./routes/comment");

// express app
const app = express();

// next -> to move to other middlewares
// middlewares -> any code that works for req and res on server
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/comment", commentRoutes);

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for req
    app.listen(process.env.PORT, () => {
      console.log("connected to mongodb & running on port ", process.env.PORT);
    })
  })
  .catch((error) => {
    console.log(error)
  })
