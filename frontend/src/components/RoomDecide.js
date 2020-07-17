import React from "react";

import {
    BackgroundPanel,
    Wrapper,
    Notification,
    LinkButton,
    ButtonArea,
    ButtonText,
} from "./StyledComponents";

const RoomDecide = () => {
    return (
        <Wrapper>
            <BackgroundPanel>
                <Notification>Room?</Notification>
                <ButtonArea>
                    <LinkButton to="/create">
                        <ButtonText>Create</ButtonText>
                    </LinkButton>
                    <LinkButton to="/join">
                        <ButtonText>Join</ButtonText>
                    </LinkButton>
                </ButtonArea>
            </BackgroundPanel>
        </Wrapper>
    );
};

export default RoomDecide;
