const express = require("express");

const routes = require("./routes/index.js");
// const connectDB = require("./dbconnect.js");
import cors from "cors";
import { connect } from "./dbconnect.js";
require("dotenv").config();



const { handleError, convertToApiError } = require("./middleware/apiError");

const app = express();

connect()
app.use(cors());

//middleware
app.use(express.json()); // thg nay cho body parser ve JSON
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/api", routes);

//port=8000
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
