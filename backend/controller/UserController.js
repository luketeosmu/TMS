const sql = require("mysql2");

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

exports.getUsers = async (_req, res) => {
    console.log("-------Get Users-------");
    try {
        const conn = createConnection();
        const sql = `SELECT * FROM User`;
        const [rows] = await conn.query(sql);
        res.status(200).json({
            success: true,
            users: rows,
            message: "Get users success"
        });
    } catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to get all users"
        });
    }
}

exports.getGroupsByUser = async (req, res) => {
    console.log("-------Get Groups-------");
    try {
        const conn = createConnection();
        const sql = `SELECT Group_Name FROM USER_GROUP WHERE User_Username = '${req.username}'`;
        const [rows] = await conn.query(sql);
        res.status(200).json({
            success: true,
            username: req.username,
            groups: rows.map(row => row.Group_Name),
            message: "Get groups success"
        })
    } catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to get groups"
        })
    }
}