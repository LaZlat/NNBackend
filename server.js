const app = require('./app')

var server = app.listen(3000, function() {
    console.log("Server started on port 3000");
});