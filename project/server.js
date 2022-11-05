const express = require("express");
const path = require("path");

const app = express();
const data = require('./data')

// A test route to make sure the server is up.
app.get("/api/movies", (request, response) => {
    console.log("❇️ Received GET request to /api/ping");
    response.send(data);
});

// A mock route to return some data.
app.get("/api/movies/:id", (request, response) => {
    // response.send(data)
    response.send({

    })

    // response.send({ data: [{ id: 1, name: '1' }, { id: 2, name: '2' }] });
});

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
    port = process.env.PORT || 3000;
    app.use(express.static(path.join(__dirname, "../build")));
    app.get("*", (request, response) => {
        response.sendFile(path.join(__dirname, "../build", "index.html"));
    });
} else {
    port = 3001;
    console.log("⚠️ Not seeing your changes as you develop?");
    console.log(
        "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
    );
}

// Start the listener!
const listener = app.listen(port, () => {
    console.log("❇️ Express server is running on port", listener.address().port);
});
