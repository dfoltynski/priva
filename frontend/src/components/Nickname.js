import React, { useState } from "react";
import socketIOClient from "socket.io-client";

import {
    BackgroundPanel,
    Wrapper,
    Notification,
    LinkButton,
    ButtonText,
    ResponseField,
    Button,
} from "./StyledComponents";

const ENDPOINT = "http://127.0.0.1:8080";

const Nickname = () => {
    const [username, setUsername] = useState("");

    const simpleValidation = (e) => {
        const nickname = document.querySelector("input");

        if (nickname.value.trim() === "") {
            alert("You need to type your nickname...");
            nickname.value = "";
            nickname.focus();

            e.preventDefault();
        } else {
            const socket = socketIOClient(ENDPOINT);

            socket.emit("newUser", username);
        }
    };

    return (
        <Wrapper>
            <BackgroundPanel>
                <Notification>Type your nickname</Notification>
                <ResponseField style={{ width: "45%" }} />
                <LinkButton onClick={simpleValidation} to="/your-room">
                    <ButtonText>Join to your room</ButtonText>
                </LinkButton>
            </BackgroundPanel>
        </Wrapper>
    );
};

export default Nickname;
