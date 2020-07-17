import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import {
    Wrapper,
    ChatField,
    MessageField,
    Username,
    Message,
    SendField,
    InputMessage,
    SendButton,
    SendIconStyle,
    Form,
} from "./StyledComponents";

const ENDPOINT = "http://127.0.0.1:8080";
const socket = socketIOClient(ENDPOINT);

const Chat = () => {
    const [goodbyeMessage, setGoodbyeMessage] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    // const [message, setMessage] = useState("");
    const [nickname, setNickname] = useState("");
    const [users, setUsers] = useState([]);
    const [deletedUser, setDeletedUser] = useState("");
    const [chat, setChat] = useState([]);

    let usersArray = [];
    let messagesArray = [];

    useEffect(() => {
        if (localStorage.getItem("key") === null) {
            window.location = "/";
        } else {
            socket.emit("joinRoom", localStorage.getItem("key"));
            socket.emit("newUser", localStorage.getItem("username"));
            setNickname(localStorage.getItem("username"));

            socket.on("userConnected", (username) => {
                console.log(`${username} has join the chat`);
                usersArray.push(username);
                setUsers(usersArray);
            });
            // socket.on("message", (msg, username) => {
            //     console.log("on message");
            //     messagesObject = [{ username, msg }];
            //     setChat(messagesObject);
            // });
            // socket.on("disconnected", (username) => {
            //     console.log(`${username} left`);
            //     setGoodbyeMessage(true);
            //     setDeletedUser(username);
            // });
            return () => {
                localStorage.removeItem("key");
                localStorage.removeItem("username");
            };
        }
    }, []);

    const validateMessage = (e) => {
        e.preventDefault();
        const message = document.querySelector("input");
        if (message.value.trim() === "") {
            message.value = "";
            message.focus();
        } else {
            socket.emit("message", message.value, nickname);
            message.value = "";
            message.focus();

            socket.on("message", (msg, username) => {
                console.log(`${username}: ${msg}`);
                messagesArray.push({ username, msg });
                setChat(messagesArray);
            });
        }
    };

    return (
        <Wrapper>
            <ChatField>
                {users.map((user) => (
                    <MessageField>
                        <Username>{user} has join the chat</Username>
                    </MessageField>
                ))}

                {chat.map((message) => (
                    <MessageField>
                        <Username>{message["username"]}</Username>
                        <Message>{message["msg"]}</Message>
                    </MessageField>
                ))}

                {/* {goodbyeMessage ? (
                    <MessageField>
                        <Username>{deletedUser} left the chat</Username>
                    </MessageField>
                ) : (
                    ""
                )} */}
            </ChatField>

            <SendField>
                <Form onSubmit={validateMessage}>
                    <InputMessage placeholder="Type a message..." />
                    <SendButton>
                        <SendIconStyle />
                    </SendButton>
                </Form>
            </SendField>
        </Wrapper>
    );
};

export default Chat;
