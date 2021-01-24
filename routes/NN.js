const express = require('express')
const router = express.Router()

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

function distanceMetricOne(source, target) {
    return new Obj(Math.sqrt(Math.pow((source.x - target.x), 2) +
        Math.pow((source.y - target.y), 2)), target.class);
}

function distanceMetricTwo(source, target) {
    return new Obj(Math.max(Math.abs((source.x - target.x)),
        Math.abs((source.y - target.y))), target.class);
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
                neighbourDistances.push(distanceMetricOne(nullObjects[0], notNullObjects[i]));
            else {
                neighbourDistances.push(distanceMetricTwo(nullObjects[0], notNullObjects[i]));
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

module.exports = router