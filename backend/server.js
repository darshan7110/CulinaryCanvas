const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const connectdb = require("./config/connectionDb");

const PORT = process.env.PORT || 3000;

connectdb();

app.use(express.json());
app.use(cors());

// ✅ Serve static images
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/recipie", require("./routes/recipie"));
app.use("/", require("./routes/user"));

app.listen(PORT, (err) => {
  console.log(`App Working on PORT = ${PORT}`);
});
