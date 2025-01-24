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

exports.checkGroup = (group) => {
    console.log("-------Check Group-------");
    return async (req, res, next) => {
        const conn = createConnection();
        const sql = `SELECT * FROM USER_GROUP WHERE User_Username = '${req.username}' AND Group_Name = '${group}'`;
        try {
            const [rows] = await conn.query(sql);
            if(rows.length > 0) {
                next();
            } else {
                res.status(403).json({
                    success: false,
                    message: "User not in associated group"
                });
            }
        } catch(error) {
            console.log(error);
            res.status(400).json({
                success: false,
                message: "Failed to get all users"
            })
        }
        // conn.query(query, (error, rows) => {
        //     if(error) {
        //         res.status(400).json({
        //             success: false,
        //             message: "Failed to get all users"
        //         })
        //     } else {
        //         if(rows.length > 1) {
        //             next();
        //         } else {
        //             res.status(403).json({
        //                 success: false,
        //                 message: "User not in associated group"
        //             })
        //         }
        //     }
        // });
    }
}