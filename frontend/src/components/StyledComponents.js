import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as SendIcon } from "./send-icon.svg";

export const Wrapper = styled.section`
    width: 100vw;
    height: 100vh;

    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BackgroundPanel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    text-align: center;
    width: 80%;
    height: 65%;
    background: #0b0b0b;
    border: 2px solid #95003f;
`;

export const Notification = styled.p`
    font-size: 35px;

    @media only screen and (max-width: 768px) {
        font-size: 24px;
    }
`;

export const Button = styled.button`
    text-decoration: none;
    padding: 0 1em;
    margin: 0 1em;
    width: 25em;
    background: none;
    margin-bottom: 1em;
    border: 2px solid #95003f;
    transition: 0.13s ease-in-out;
    cursor: pointer;

    &:hover {
        transition: 0.13s ease-in-out;
        background: #95003f;
    }
`;

export const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export const ButtonText = styled.p`
    font-size: 24px;
    color: #ffffff;
`;

export const LinkButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;

    text-decoration: none;
    padding: 0 1em;
    margin: 0 1em;
    width: 25em;
    background: none;
    border: 2px solid #95003f;
    transition: 0.13s ease-in-out;

    &:hover {
        transition: 0.13s ease-in-out;
        background: #95003f;
    }

    @media only screen and (max-width: 1333px) {
        width: 10em;
    }

    @media only screen and (max-width: 768px) {
        // width: 8em;
    }
`;

export const ResponseField = styled.input`
    color: #ffffff;
    font-size: 24px;
    margin-bottom: 1em;
    text-align: center;
    outline: none;
    width: 90%;
    height: 2em;
    background: #95003f;
    border-radius: 25px;
    border: none;
`;

export const ChatField = styled.div`
    top: 0;
    position: absolute;
    height: calc(100% - 3rem);
    width: 40%;
    overflow-y: scroll;
    @media only screen and (max-width: 1300px) {
        width: 60%;
    }

    @media only screen and (max-width: 950px) {
        width: 100%;
    }
`;

export const MessageField = styled.div`
    display: inline-block;
    width: 100%;
`;

export const Username = styled.p`
    margin: 0.5em 0.5em 0 0.5em;
    font-size: 14px;
    color: #ffffff;

    @media only screen and (max-width: 768px) {
        font-size: 16px;
    }
`;

export const Message = styled.div`
    max-width: 45%;
    margin: 0.2em 0.5em 0 0.5em;
    padding: 0.5em;
    border-radius: 25px;
    display: inline-block;
    background: #95003f;
    // white-space: pre-wrap;
    // white-space: -moz-pre-wrap;
    // white-space: -pre-wrap;
    // white-space: -o-pre-wrap;
    word-wrap: break-word;

    @media only screen and (max-width: 768px) {
        font-size: 18px;
    }
`;

export const SendField = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    bottom: 0;
    height: 3em;
    width: 40%;
    background-color: #141414;

    @media only screen and (max-width: 1300px) {
        width: 60%;
    }

    @media only screen and (max-width: 950px) {
        width: 100%;
    }
`;

export const InputMessage = styled.input`
    padding: 0 0.6rem;
    color: #ffffff;
    font-size: 15px;
    margin-left: 0.5rem;
    background: #212121;
    width: 80%;
    height: 2.3rem;
    border: none;
    outline: none;
    border-radius: 25px;
`;

export const SendButton = styled.button.attrs({ type: "submit" })`
    background: #95003f;
    border-radius: 25px;
    border: none;
    padding: 0.2rem 1.5rem;
    margin-left: 0.2rem;
    outline: none;
    cursor: pointer;
`;

export const Form = styled.form`
    display: flex;
    width: 100%;
`;

export const SendIconStyle = styled(SendIcon)`
    width: 2em;
    color: #ffffff;
`;
