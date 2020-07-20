import React, { Component } from "react";
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

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            connectedUsers: [],
            disconnectedUsers: [],
            user: "",
            messages: [],
        };

        this.validateMessage = this.validateMessage.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem("key")) {
            window.location = "/";
        } else {
            socket.emit("joinRoom", localStorage.getItem("key"));
            socket.emit("newUser", localStorage.getItem("username"));
            let user = localStorage.getItem("username");
            this.setState({ user });

            socket.on("userConnected", (username) => {
                console.log(`${username} has connected`);
                this.setState({
                    connectedUsers: [...this.state.connectedUsers, username],
                });
            });

            socket.on("message", (msg, username) => {
                this.setState({
                    messages: [...this.state.messages, { msg, username }],
                });
            });

            socket.on("disconnected", (username) => {
                console.log(`${username} has disconnected`);
                this.setState({
                    disconnectedUsers: [
                        ...this.state.disconnectedUsers,
                        username,
                    ],
                });
            });
        }
    }

    componentWillUnmount() {
        localStorage.removeItem("key");
        localStorage.removeItem("username");
    }

    validateMessage(e) {
        e.preventDefault();
        const message = document.querySelector("input");
        if (message.value.trim() === "") {
            message.value = "";
            message.focus();
        } else {
            console.log(`${this.state.user}: ${message.value}`);
            socket.emit("message", message.value, this.state.user);
            message.value = "";
            message.focus();
            document.querySelectorAll(
                "div"
            )[2].scrollTop = document.querySelectorAll("div")[2].scrollHeight;
        }
    }

    render() {
        return (
            <Wrapper>
                <ChatField>
                    {this.state.connectedUsers.map((connectedUser) => (
                        <MessageField>
                            <Username>
                                {connectedUser} has join the chat
                            </Username>
                        </MessageField>
                    ))}

                    {this.state.messages.map((message) => (
                        <MessageField>
                            <Username>{message["username"]}</Username>
                            <Message>{message["msg"]}</Message>
                        </MessageField>
                    ))}

                    {this.state.disconnectedUsers.map((disconnectedUser) => (
                        <MessageField>
                            <Username>
                                {disconnectedUser} has left the chat
                            </Username>
                        </MessageField>
                    ))}
                </ChatField>

                <SendField>
                    <Form onSubmit={this.validateMessage}>
                        <InputMessage placeholder="Type a message..." />
                        <SendButton>
                            <SendIconStyle />
                        </SendButton>
                    </Form>
                </SendField>
            </Wrapper>
        );
    }
}

export default Chat;
