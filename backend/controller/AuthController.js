const sql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwtmiddleware = require("./jwtmiddleware");

const createConnection = () => {
    const db = sql.createPool({
        host: 'localhost',
        port: 3306,
        database: 'tms',
        user: 'root',
        password: 'root'
    });

    return db.promise();
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const sql = `SELECT * FROM USER WHERE USER_USERNAME = '${username}'`;
        const conn = createConnection();
        const [rows] = await conn.query(sql);    
        if(rows.length > 0) {
            if(!rows[0].User_Active) {
                res.status(401).json({
                    success: false,
                    message: "User Account has been disabled."
                })
            }
            bcrypt.compare(password, rows[0].User_Password, (err, result) => {
                if(err) {
                    // Handle error
                    // console.error('Error comparing passwords:', err);
                    res.status(401).json({
                        success: false,
                        message: "Incorrect username or password",
                    });
                }
                if(result) {
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
        }
    } catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "SQL Server error"
        })
    }
}
//     conn.query(query, (error, rows) => {
//         if(error) {
//             res.status(400).json({
//                 message: "SQL Server error"
//             })
//             // throw error;
//         } else {
//             console.log(rows);
//             if(rows.length > 0) {
//                 if(!rows[0].User_Active) {
//                     res.status(401).json({
//                         success: false,
//                         message: "User Account has been disabled."
//                     })
//                 }
//                 bcrypt.compare(password, rows[0].User_Password, (err, result) => {
//                     if (err) {
//                         // Handle error
//                         // console.error('Error comparing passwords:', err);
//                         res.status(401).json({
//                             success: false,
//                             message: "Incorrect username or password",
//                         });
//                     }
//                     if (result) {
//                         // Passwords match, authentication successful
//                         console.log('Passwords match! User authenticated.');
//                         const token = jwtmiddleware.generateToken({
//                             username: username,
//                             browserType: req.headers["user-agent"],
//                             ip: req.ip
//                         })
//                         res.cookie('jwt', token, {
//                             httpOnly: true,
//                             maxAge: 900000
//                         })
//                         res.status(200).json({
//                             success: true,
//                             message: "Login success",
//                             token: token
//                         });
//                     } else {
//                         // Passwords don't match, authentication failed
//                         console.log('Passwords do not match! Authentication failed.');
//                         res.status(401).json({
//                             success: false,
//                             message: "Incorrect username or password",
//                         });
//                     }
//                 });
//             } else {
//                 console.log("username: " + req.body.username);
//                 console.log("Incorrect username");
//                 res.status(401).json({
//                     success: false,
//                     message: "Incorrect username or password",
//                 });
//             }
//         }
//     })
// }

// exports.protected = (req, res) => {
//     console.log(req);
//     const valid = jwtmiddleware.validateToken(req);
//     if(valid) {
//         res.status(200).json({
//             success: true,
//             message: "Authorized"
//         })
//     } else {
//         res.status(401).json({
//             success: false,
//             message: "Unauthorized. Please login"
//         })
    // }