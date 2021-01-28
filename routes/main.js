const express = require('express')
const router = express.Router()
const fs = require('fs');

router.get("/", function(req, res) {
    db.query("SELECT * FROM object", function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
})

router.get("/1a", function(req, res) {
    try {
        var data = fs.readFileSync('go-sports.csv', 'utf8');
        const lines = data.split('\n');

        let players = [];
        for (var i = 1; i < lines.length; i++) {
            let col = lines[i].split(',');
            players.push({
                idobject: col[0].replace( /[\r\n]+/gm, "" ),
                full_name: col[1],
                height: col[2],
                weight: col[3],
                sport: col[4],
                position: col[5].replace( /[\r\n]+/gm, "" )
            });
        }

        console.log(players);
        res.send(players);
    } catch (e) {
        console.log('Error:', e.stack);
        return res.sendStatus(500);
    }
})

module.exports = router