const express = require('express')
const router = express.Router()
const fs = require('fs');

function Obj(distance, cl) {
    this.distance = distance;
    this.cl = cl;
}

function compare(a, b) {
    if (a.distance < b.distance) {
        return -1;
    }
    if (a.distance > b.distance) {
        return 1;
    }
    return 0;
}

function distanceMetricOne(sourceX, sourceY, targetX, targetY, klass) {
    return new Obj(Math.sqrt(Math.pow((sourceX - targetX), 2) +
        Math.pow((sourceY - targetY), 2)), klass);
}

function distanceMetricTwo(sourceX, sourceY, targetX, targetY, klass) {
    return new Obj(Math.max(Math.abs((sourceX - targetX)),
        Math.abs((sourceY - targetY))), klass);
}

router.get("/", function(req, res) {
    let distMetric = req.query.met;
    let neighboursCount = req.query.nn;
    let id = req.query.id;
    if (!id || !neighboursCount) {
        return res.send('a tu durns?')
    }
    let neighbourDistances = [];

    (async() => {
        const notNullObjects = await query('SELECT * FROM object WHERE class IS NOT NULL');
        const nullObjects = await query('SELECT * FROM object WHERE class IS NULL AND idobject = ' + id);

        let willBeResult = {
            idobject: nullObjects[0].idobject,
            x: nullObjects[0].x,
            y: nullObjects[0].y,
            class: ""
        }

        for (let i = 0; i < Object.keys(notNullObjects).length; i++) {
            if (distMetric == 1)
                neighbourDistances.push(distanceMetricOne(nullObjects[0].x, nullObjects[0].y, notNullObjects[i].x, notNullObjects[i].y, notNullObjects[i].class));
            else {
                neighbourDistances.push(distanceMetricTwo(nullObjects[0].x, nullObjects[0].y, notNullObjects[i].x, notNullObjects[i].y, notNullObjects[i].class));
            }
        }

        neighbourDistances = neighbourDistances.sort(compare)
        let finalNeighbours = neighbourDistances.slice(0, neighboursCount);

        for (let i = neighboursCount; i < neighbourDistances.length; i++) {
            for (let j = 0; j < finalNeighbours.length; j++) {
                if (neighbourDistances[i].distance == finalNeighbours[j].distance) {
                    finalNeighbours.push(neighbourDistances[i])
                    break;
                }
            }
        }

        let pluses = 0;
        let minuses = 0;

        for (let i = 0; i < finalNeighbours.length; i++) {
            if (finalNeighbours[i].cl == 1) {
                pluses++;
            } else {
                minuses++;
            }
        }

        if (pluses > minuses) {
            willBeResult.class = "1";
        } else if (minuses > pluses) {
            willBeResult.class = "0";
        } else {
            willBeResult.class = null
        }

        res.send(willBeResult)

    })()

})

function readFile() {
    try {
        var data = fs.readFileSync('./go-sports.csv', 'utf8');
        const lines = data.split('\n');

        let players = [];
        for (var i = 1; i < lines.length; i++) {
            let col = lines[i].split(',');
            players.push({
                idobject: col[0],
                full_name: col[1],
                height: col[2],
                weight: col[3],
                sport: col[4],
                position: col[5]
            });
        }

        return players;
    } catch (e) {
        return null;
    }
}

router.get("/1a/", function(req, res) {

    let distMetric = req.query.met;
    let neighboursCount = req.query.nn;
    let id = req.query.id;
    let sport = req.query.sp;

    if (!id || !neighboursCount) {
        return res.send('nu tikrai durns!')
    }
    let neighbourDistances = [];

    let players = readFile();

    if (players) {
        let destPlayer = players[id - 1];
        players = players.filter(item => item.full_name != destPlayer.full_name);

        //console.log(players);

        if (sport == 1) {
            players = players.filter(item => item.sport != "Basketball" && item.sport != "" && item.position != "")
            destPlayer.sport = "Soccer";
        } else {
            players = players.filter(item => item.sport != "Soccer" && item.sport != "" && item.position != "")
            destPlayer.sport = "Basketball";
        }

        players.forEach(player => {
            if (distMetric == 1)
                neighbourDistances.push(distanceMetricOne(destPlayer.height, destPlayer.weight, player.height, player.weight, player.position));
            else {
                neighbourDistances.push(distanceMetricTwo(destPlayer.height, destPlayer.weight, player.height, player.weight, player.position));
            }
        });

        neighbourDistances = neighbourDistances.sort(compare)
        let finalNeighbours = neighbourDistances.slice(0, neighboursCount);

        for (let i = neighboursCount; i < neighbourDistances.length; i++) {
            for (let j = 0; j < finalNeighbours.length; j++) {
                if (neighbourDistances[i].distance == finalNeighbours[j].distance) {
                    finalNeighbours.push(neighbourDistances[i])
                    break;
                }
            }
        }
        console.log(finalNeighbours);

        const countUnique = arr => {
            const counts = {};
            for (var i = 0; i < arr.length; i++) {
                counts[arr[i].cl] = 1 + (counts[arr[i].cl] || 0);
            };

            var arrSort = []
            for (var k in counts) {
                arrSort.push({ class: k, value: counts[k] });
            }
            return arrSort;
        };
        let finalClasses = countUnique(finalNeighbours);
        finalClasses.sort(function(a, b) {
            return b.value - a.value;
        })
        console.log(finalClasses);

        destPlayer.position = finalClasses[0].class;

        if (finalClasses.length > 1)
            if (finalClasses[0].value == finalClasses[1].value)
                destPlayer.position = null;

        res.send(destPlayer)
    } else
        res.sendStatus(500)

})

module.exports = router