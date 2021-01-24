const express = require('express')
const router = express.Router()

router.put('/', function(req, res) {
    const sql =
        `UPDATE object SET class = NULL WHERE idobject = 7;
     UPDATE object SET class = NULL WHERE idobject = 8;`
    db.query(sql, function(err) {
        if (err) {
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
})

module.exports = router