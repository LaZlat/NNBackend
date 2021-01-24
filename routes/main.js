const express = require('express')
const router = express.Router()

router.get("/", function(req, res) {
    db.query("SELECT * FROM object", function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
})

module.exports = router