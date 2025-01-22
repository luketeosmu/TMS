const express = require("express");
const sql = require("mysql");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/auth", routes);

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get("/", (req, res, next) => {
    const conn = sql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "nodelogin",
    });

    conn.connect();
    conn.query("SELECT * from accounts", function (error, rows) {
        if (error) throw error;
        console.log(rows);
        // for(const entry of rows) {
        //     console.log(entry.email);
        // }
    });

    //e.g. JSON Object for group assign form 
    // {
    //     "username": "gregory",
    //     "groups": ["dev team A", "dev team B"]
    // }
    // let query = 'INSERT INTO USERGROUPS (username, group_name) VALUES ';
    // for(let i = 0; i < groups.length; i++) {
    //     query += `(${username}, ${groups[i]})`
    //     if(i !== input.length) {
    //         query += ",";
    //     } else {
    //         query += ";";
    //     }
    // }
    // next();
    conn.end();
    res.send("Hello World!");
});

app.get("/test/:id", cors(corsOptions), (req, res) => {
    const conn = sql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "world",
    });

    conn.connect();
    conn.query(
        "SELECT * from city where ID = " + req.params.id,
        function (error, rows) {
            if (error) throw error;
            res.send(rows);
            console.log(rows);
        }
    );

    conn.end();
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    
    console.log("username: " + username);
    console.log("password: " + password);
    if(username === 'test' && password === 'test') {
        console.log("true");
        // req.session.isLoggedIn = true;
        res.redirect(req.query.redirect_url ? req.query.redirect_url : '/');
    } else {
        console.log("false");
        res.render('login', {error: 'Username or password is incorrect'});
    }
})
// app.post('/test', (req, res) => {
//     const {username, password, email} = req.body;

//     const conn = sql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "root",
//         database: "nodelogin",
//     });
//     conn.connect();
//     const query = `INSERT INTO ACCOUNTS (username, password, email) VALUES ("${username}", "${password}", "${email}")`;
//     conn.query(query, function (error, rows) {
//         if (error) throw error;
//         console.log("1 record inserted");
//     });

//     res.send("success");
//     conn.end();
// })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
