const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require('cookie-parser');
// const cors = require("cors");

const app = express();
const port = 3000;

// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
