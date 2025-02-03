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
        const sql = `SELECT GROUP_NAME FROM USER_GROUP WHERE USER_USERNAME = '${req.username}'`;
        const [rows] = await conn.query(sql);
        res.status(200).json({
            success: true,
            username: req.username,
            groups: rows.map(row => row.GROUP_NAME),
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

exports.getAllGroups = async (req, res) => {
    console.log("-------Get All Groups-------");
    try {
        const conn = createConnection();
        const sql = `SELECT DISTINCT GROUP_NAME FROM USER_GROUP`;
        const [rows] = await conn.query(sql);
        res.status(200).json({
            success: true,
            groups: rows.map(row => row.GROUP_NAME),
            message: "Get all groups success"
        })
    } catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to get all groups"
        })
    }
}

exports.getUsersWithGroups = async (req, res) => {
    console.log("-------Get All Users with Groups-------");
    try {
        const conn = createConnection();
        const sql = `
            SELECT
                u.User_Username,
                u.User_Email,
                u.User_Active,
                GROUP_CONCAT(ug.Group_Name) AS 'Groups'
            FROM
                User u
            LEFT JOIN
                User_Group ug ON u.User_Username = ug.User_Username
            GROUP BY
                u.User_Username;
        `
        const [rows] = await conn.query(sql);
        res.status(200).json({
            success: true,
            users: rows,
            message: "Get all users with groups success"
        })
    } catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to get all users with groups"
        })
    }
}

exports.updateUser = async (req, res) => {
    console.log("------Update User-------");
    try {
        const conn = createConnection();
        let sql = `
            UPDATE User
            SET User_Email = '${req.body.User_Email}', User_Active = ${req.body.User_Active}
            WHERE User_Username = '${req.body.User_Username}';
        `
        await conn.query(sql);
        // console.log(rows);
        sql = `
            DELETE FROM USER_GROUP WHERE USER_USERNAME = '${req.body.User_Username}'
        `;
        await conn.query(sql);
        
        sql = `
            INSERT INTO USER_GROUP VALUES 
        `;
        const groups = req.body.User_Groups !== undefined ? req.body.User_Groups.split(',') : [];
        for(const group of groups) {
            sql += `('${req.body.User_Username}', '${group}'),`
        }
        sql = sql.substring(0, sql.length - 1);
        sql += ';';
        if(groups.length > 0) {
            await conn.query(sql);
        }
        res.status(200).json({
            success: true,
            message: "Update user success"
        })
    } catch(error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to update user"
        })
    }
}