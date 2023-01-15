const express = require("express");

const app = express();

app.get("/users", function(req, res) {
    res.json({
        data: 'Matthew',
    });
});

app.listen(8000, function() {
    console.log('Node server is running on port 8000');
});