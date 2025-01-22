const sql = require("mysql");

const createConnection = () => {
    const conn = sql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "nodelogin",
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