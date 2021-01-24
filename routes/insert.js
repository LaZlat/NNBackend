const express = require('express')
const router = express.Router()

router.post("/", function(req, res) {
    let cl = req.body.class;
    let id = req.body.id;
    db.query('UPDATE object SET class =' + cl + ' WHERE idobject = ' + id, function(err) {
        if (err) {
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
})

module.exports = router