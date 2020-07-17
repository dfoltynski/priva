import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import {
    BackgroundPanel,
    Wrapper,
    Notification,
    LinkButton,
    ButtonText,
    ResponseField,
    Button,
    ButtonArea,
} from "./StyledComponents";

const ENDPOINT = "http://127.0.0.1:8080";

const RoomCreate = () => {
    const [key, setKey] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        socket.emit("genKey");

        socket.on("getKey", (key) => {
            setKey(key);
        });
    }, []);

    const copyToClipboard = () => {
        if (document.querySelectorAll("input")[0].value !== "") {
            navigator.clipboard.writeText(
                document.querySelector("input").value
            );
        }
    };

    const simpleValidation = (e) => {
        const nickname = document.querySelectorAll("input")[1];

        if (nickname.value.trim() === "") {
            alert("You need to type your nickname...");
            nickname.value = "";
            nickname.focus();

            e.preventDefault();
        } else {
            localStorage.setItem("key", key);
            localStorage.setItem("username", nickname.value);
        }
    };

    return (
        <Wrapper>
            <BackgroundPanel>
                <Notification>Your room key</Notification>
                <ButtonArea>
                    <ResponseField value={key} disabled />
                    <Button onClick={copyToClipboard}>
                        <ButtonText style={{ fontSize: "16px" }}>
                            Copy to clipboard
                        </ButtonText>
                    </Button>
                </ButtonArea>
                <Notification>Type your nickname</Notification>
                <ButtonArea>
                    <ResponseField />
                    <LinkButton onClick={simpleValidation} to="/your-room">
                        <ButtonText>Join to your room</ButtonText>
                    </LinkButton>
                </ButtonArea>
            </BackgroundPanel>
        </Wrapper>
    );
};

export default RoomCreate;
