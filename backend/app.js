const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const userManagementRoutes = require("./routes/userManagementRoutes");

dotenv.config({ path: "./.env"});

const app = express();
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/users", userManagementRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
