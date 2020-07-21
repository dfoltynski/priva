const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bcrypt = require("bcrypt");
require("dotenv").config();

const saltRounds = 10;
const port = 8080 || process.env.PORT;

app.use(express.static(path.join(__dirname, "./build")));

app.get("/", (req, res, next) => res.sendFile(__dirname + "./index.html"));

io.on("connection", (socket) => {
    socket.on("genKey", () => {
        let randomEntryKey = Math.random().toString(36).substr(2, 15);
        let key = bcrypt.hashSync(randomEntryKey, saltRounds);
        io.to(socket.id).emit("getKey", key.substr(7, key.length));
    });

    socket.on("joinRoom", (roomKey) => {
        socket.on("newUser", (username) => {
            socket.join(roomKey);
            socket.broadcast.to(roomKey).emit("userConnected", username);

            socket.on("message", (msg, username) => {
                io.to(roomKey).emit("message", msg, username);
            });

            socket.on("disconnect", () => {
                io.to(roomKey).emit("disconnected", username);
            });
        });
    });
});

http.listen(port, (err) => {
    if (err) console.log(err);

    console.log(`server is listening on port ${port}`);
});
