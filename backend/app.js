const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();
const port = 3000;

// app.use(cors());
// const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
