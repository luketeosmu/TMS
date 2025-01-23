const sql = require("mysql");
const bcrypt = require("bcryptjs");
const jwtmiddleware = require("../jwtmiddleware");

const createConnection = () => {
    const conn = sql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "tms",
    });
    conn.connect();
    
    return conn;
}

exports.login = (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM USER WHERE USER_USERNAME = '${username}'`;
    const conn = createConnection();
    conn.query(query, (error, rows) => {
        if(error) {
            res.status(400).json({
                message: "SQL Server error"
            })
            // throw error;
        } else {
            console.log(rows);
            if(rows.length > 0) {
                bcrypt.compare(password, rows[0].User_Password, (err, result) => {
                    if (err) {
                        // Handle error
                        // console.error('Error comparing passwords:', err);
                        res.status(401).json({
                            success: false,
                            message: "Incorrect username or password",
                        });
                    }
                    if (result) {
                        // Passwords match, authentication successful
                        console.log('Passwords match! User authenticated.');
                        const token = jwtmiddleware.generateToken({
                            username: username,
                            browserType: req.headers["user-agent"],
                            ip: req.ip
                        })
                        res.cookie('jwt', token, {
                            httpOnly: true,
                            maxAge: 900000
                        })
                        res.status(200).json({
                            success: true,
                            message: "Login success",
                            token: token
                        });
                    } else {
                        // Passwords don't match, authentication failed
                        console.log('Passwords do not match! Authentication failed.');
                        res.status(401).json({
                            success: false,
                            message: "Incorrect username or password",
                        });
                    }
                });
            } else {
                console.log("username: " + req.body.username);
                console.log("Incorrect username");
                res.status(401).json({
                    success: false,
                    message: "Incorrect username or password",
                });
            }
        }
    })
}

exports.protected = (req, res) => {
    console.log(req);
    const valid = jwtmiddleware.validateToken(req);
    if(valid) {
        res.status(200).json({
            success: true,
            message: "Authorized"
        })
    } else {
        res.status(401).json({
            success: false,
            message: "Unauthorized. Please login"
        })
    }
}

// exports.createUser = (username, password, email) => {
//     console.log("hihi");
//     console.log("username: " + username);
//     console.log("password: " + password);
//     console.log("email: " + email);
//     const conn = createConnection();
//     const query = `INSERT INTO ACCOUNTS (username, password, email) VALUES ("${username}", "${password}", "${email}")`;
//     conn.query(query, function (error, rows) {
//         if (error) {
//             throw error;
//         } else {
//             console.log("success " + rows);
//         }
//     });
//     conn.end();
// }