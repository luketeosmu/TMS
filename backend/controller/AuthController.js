const sql = require("mysql");
const bcrypt = require("bcrypt");
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

exports.createUser = (username, password, email) => {
    console.log("hihi");
    console.log("username: " + username);
    console.log("password: " + password);
    console.log("email: " + email);
    const conn = createConnection();
    const query = `INSERT INTO ACCOUNTS (username, password, email) VALUES ("${username}", "${password}", "${email}")`;
    conn.query(query, function (error, rows) {
        if (error) {
            throw error;
        } else {
            console.log("success " + rows);
        }
    });
    conn.end();
}

exports.login = (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM USER WHERE USER_USERNAME = '${username}'`;
    const conn = createConnection();
    conn.query(query, (error, rows) => {
        if(error) {
            throw error;
        } else {
            console.log(rows);
            bcrypt.compare(password, rows[0].User_Password, (err, result) => {
                if (err) {
                    // Handle error
                    console.error('Error comparing passwords:', err);
                    return;
                }
            
                if (result) {
                    // Passwords match, authentication successful
                    console.log('Passwords match! User authenticated.');
                    const token = jwtmiddleware.generateToken({
                        username: username,
                        browserType: req.headers["user-agent"],
                        ip: req.ip
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
    })
}

exports.protected = (req, res) => {
    try {
        jwtmiddleware.validateToken();
        res.json({
            success: true,
            message: 'Welcome to the protected route!',
        });
    } catch(error) {
        console.error(error);
    }
}