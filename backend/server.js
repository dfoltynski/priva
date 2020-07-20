const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bcrypt = require("bcrypt");
require("dotenv").config();

const saltRounds = 10;
const port = 8080 || process.env.PORT;

io.on("connection", (socket) => {
    socket.on("genKey", () => {
        console.log("\n\n");

        let randomEntryKey = Math.random().toString(36).substr(2, 15);
        let key = bcrypt.hashSync(randomEntryKey, saltRounds);
        io.to(socket.id).emit("getKey", key.substr(7, key.length));

        console.log(`socket id: ${socket.id}`);
        console.log(`key from genKey: ${key.substr(7, key.length)}`);
    });

    socket.on("joinRoom", (roomKey) => {
        console.log("\n\n");
        console.log(`roomkey: ${roomKey}`);
        socket.on("newUser", (username) => {
            console.log(`${username} has join the chat ${roomKey}`);
            socket.join(roomKey);
            socket.broadcast.to(roomKey).emit("userConnected", username);

            socket.on("message", (msg, username) => {
                console.log(`message: ${msg} from ${username}`);
                io.to(roomKey).emit("message", msg, username);
            });

            socket.on("disconnect", () => {
                console.log(`${username} has left the chat ${socket.id}`);
                io.to(roomKey).emit("disconnected", username);
            });
        });
    });
});

http.listen(port, (err) => {
    if (err) console.log(err);

    console.log(`server is listening on port ${port}`);
});
