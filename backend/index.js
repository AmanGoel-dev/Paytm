const express = require("express");
const cors = require("cors");
const { JWT_SECRET } = require("./config");
const app = express();

const mainrouter = require("./routes/index");

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainrouter);

app.listen(3000);
