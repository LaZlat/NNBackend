const express = require('express')
const router = express.Router()
const fs = require('fs');

router.get("/", function(req, res) {
    try {
        var data = fs.readFileSync('data.csv', 'utf8');
        const lines = data.split('\n');

        let objects = [];
        for (var i = 1; i < lines.length; i++) {
            let col = lines[i].split(',');
            objects.push({
                idobject: col[0],
                x: col[1],
                y: col[2],
                klass: col[3].replace( /[\r\n]+/gm, "" )
            });
        }
        res.send(objects);
    } catch (e) {
        console.log('Error:', e.stack);
        return res.sendStatus(500);
    }
})

module.exports = router