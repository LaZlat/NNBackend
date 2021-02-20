const express = require('express')
const router = express.Router()
const fs = require('fs');

function Obj(idobject, x, y, klass) {
    this.idobject = idobject;
    this.x = x;
    this.y = y;
    this.klass = klass;
}

function readFile() {
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
        return objects;
    } catch (e) {
        return null;
    }
}

let vector

router.get("/", function(req, res) {

    let _CORRECTVECOTOR = false;

    let objects = readFile();
    let fullObjects = [];
    let tempObjects = [];
    let emptyObjects = [];
    let vector = {
        x: Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1),
        y: Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1),
        free: Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1)
    }

    objects.forEach(function(item){
        if (item.klass !== "null") {
            fullObjects.push(item);
        } else {
            emptyObjects.push(item);
        }
    })

    while (_CORRECTVECOTOR == false) {

        fullObjects.forEach(function(item) {
            tempObjects.push({
                idobject: item.idobject,
                value: vector.x * item.x + vector.y * item.y + vector.free * (-1)
            })
        });

        _CORRECTVECOTOR = true;

        for (let i = 0; i < fullObjects.length; i++) {
            if (tempObjects[i].value < 0 && fullObjects[i].klass == 1) {
                _CORRECTVECOTOR = false;
                tempObjects = [];
                vector = {
                    x: Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1),
                    y: Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1),
                    free: Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1)
                }
                break;
            }
        
            if (tempObjects[i].value >= 0 && fullObjects[i].klass == 0) {
                _CORRECTVECOTOR = false;
                tempObjects = [];
                vector = {
                    x: Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1),
                    y: Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1),
                    free: Math.ceil(Math.random() * 9) * (Math.round(Math.random()) ? 1 : -1)
                }
                break;
            }
        }
    }

    emptyObjects.forEach(function(item) {
        if (vector.x * item.x + vector.y * item.y - vector.free < 0) {
            item.klass = 0;
        } else {
            item.klass = 1;
        }
    })

    emptyObjects.push(vector);

    res.send(emptyObjects)


})

module.exports = router