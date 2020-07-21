import React, { useState } from "react";

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

const JoinRoom = () => {
    const simpleValidation = (e) => {
        const providedKey = document.querySelectorAll("input")[0];
        const nickname = document.querySelectorAll("input")[1];

        if (nickname.value.trim() === "" || providedKey.value === "") {
            alert("Enter your room key and nickname");
            nickname.value = "";
            nickname.focus();

            e.preventDefault();
        } else {
            localStorage.setItem("key", providedKey.value);
            localStorage.setItem("username", nickname.value);
        }
    };

    return (
        <Wrapper>
            <BackgroundPanel>
                <Notification>Your room key</Notification>
                <ResponseField />
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

export default JoinRoom;
