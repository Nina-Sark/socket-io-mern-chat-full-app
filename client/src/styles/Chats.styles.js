import styled, { css } from "styled-components";
import { isLastOne } from "../utils/chats";

export const ChatsPageContainer = styled.div`
  height: 100vh;
  background-color: #000;
`;

export const ChatHeaderContainer = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3em 0.8em;
  box-shadow: 0 0 5px ${(props) => props.theme.primaryAccentColor},
    0 0 120px ${(props) => props.theme.primaryAccentColor};
  border-bottom: 2px solid ${(props) => props.theme.primaryAccentColor};
`;

export const LogoTitle = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Parisienne&family=Titan+One&display=swap");

  font-size: 1.5em;
  font-family: "Parisienne", cursive;
  color: ${(props) => props.theme.primaryAccentColor};

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const RightSideContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7em;
`;

export const ChatsContentContainer = styled.div`
  display: flex;
  gap: 50px;
  height: calc(100vh - 70px);
`;

export const LeftSideChatContainer = styled.div`
  flex: 1;
  width: 800px;
  padding: 0.3em 1em;
  margin-top: 50px;
  border-left: none;
  border-bottom: none;

  @media screen and (max-width: 1100px) {
    display: ${(props) => (props.isSelected ? "block" : "none")};
    flex: 1;
  }
`;

export const RightSideChatContainer = styled.div`
  flex: 3;
  width: 800px;
  padding: 0.3em 1em;
  margin-top: 50px;
  ${(props) =>
    props.isEmpty &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `};

  @media screen and (max-width: 1100px) {
    display: ${(props) =>
      props.isSelected ? (props.isEmpty ? "flex" : "block") : "none"};
    flex: 1;
  }
`;

export const LeftSideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.primaryAccentColor};
  height: 70px;
`;

export const ChatsContainer = styled.div`
  height: calc(100vh - 232px);
  margin-top: 0.5em;
  overflow-y: scroll;

  ${(props) =>
    props.isEmpty &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `};

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChatContainer = styled.div`
  background-color: ${(props) =>
    props.bg === "currentColor" ? props.isSelected ? props.theme.primaryAccentColor : props.theme.secondaryAccentColor : props.bg};
  padding: 0.8em;
  border-radius: 0.5rem;
  margin-bottom: 0.8em;
  box-shadow: 0 0 5px
    ${(props) =>
      props.shadow === "currentColor"
        ? props.isSelected ? props.theme.primaryAccentColor : props.theme.secondaryAccentColor
        : props.shadow};
  display: flex;
  gap: 1em;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.color === "currentColor" ? "#000" : props.color)};

  span {
    font-weight: 600;
  }

  span,
  small {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  &:hover {
    background-color: ${(props) =>
      props.bgHover === "currentColor"
        ? props.theme.primaryAccentColor
        : props.bgHover};
    box-shadow: 0 0 5px
      ${(props) =>
        props.shadowHover === "currentColor"
          ? props.theme.primaryAccentColor
          : props.shadowHover};
    color: ${(props) =>
      props.colorHover === "currentColor" ? "#000" : props.colorHover};
  }
`;

export const ScrollContainer = styled.div`
  max-height: ${(props) => props.height};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SearchBar = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2em;
  position: relative;

  > input,
  button {
    padding: 0.7em;
  }

  > input {
    flex: 4;
    border: none;
    outline: none;
    background: #000;
    color: ${(props) => props.theme.secondaryAccentColor};
    font-size: 16px;

    ::placeholder {
      color: ${(props) => props.theme.secondaryAccentColor};
      font-size: 14px;
    }
  }

  > button {
    flex: 1;
    border: none;
    outline: none;
    background-color: ${(props) => props.theme.secondaryAccentColor};
    cursor: pointer;
    font-weight: 600;
    transition: all 0.1s ease;
    font-size: 16px;
    border-left: 2px solid ${(props) => props.theme.secondaryAccentColor};

    &:hover {
      background-color: #000;
      color: ${(props) => props.theme.secondaryAccentColor};
    }
  }

  @media screen and (max-width: 1000px) {
    > input {
      width: 85%;
    }

    > button {
      width: 15%;
    }
  }
`;

export const MessagesContainer = styled.div`
  position: relative;
  color: white;
  height: calc(100vh - 330px);
  padding: 1em;
  overflow-y: auto;
  overflow-x: hidden;
  ${(props) =>
    props.isEmpty &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `};

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.primaryAccentColor};
    border-radius: 1rem;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.secondaryAccentColor};
  }

  @media screen and (max-width: 1100px) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const MessageInput = styled.input`
  margin-top: 2.5em;
  width: 100%;
  padding: 0 1em;
  height: 70px;
  border-radius: 1rem;
  background: transparent;
  border: none;
  outline: none;
  box-shadow: 0 0 9000px ${(props) => props.theme.secondaryAccentColor},
    0 0 5px ${(props) => props.theme.secondaryAccentColor};
  color: ${(props) => props.theme.primaryAccentColor};
  font-size: 1em;

  ::placeholder {
    color: ${(props) => props.theme.primaryAccentColor};
    font-size: 1em;
  }
`;

export const MessagesChatHeader = styled.div`
  height: 50px;
  width: 100%;
  margin-bottom: 1.2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AvatarContainer = styled.div`
  display: flex;
  gap: 0.7em;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;

    small,
    span {
      color: ${(props) => props.theme.primaryAccentColor};
    }

    span {
      font-weight: 700;
      font-size: 1.2em;
    }
  }
`;

export const MessageContainer = styled.div`
  max-width: 25em;
  padding: 0.7em;
  background: ${(props) => (props.isCurrentUser ? "#B4F5FD" : "#FEC4E8")};
  box-shadow: 0 0 15px
    ${(props) =>
      props.isCurrentUser
        ? props.theme.secondaryAccentColor
        : props.theme.primaryAccentColor};
  color: black;
  border-radius: 0.5rem;
  margin-left: ${(props) => (props.isCurrentUser ? "auto" : props.isLastOne ? "" : "calc(0.7em + 47px)")};

  @media screen and (max-width: 1100px) {
    max-width: 100%;
  }
`;

export const MessageComponent = styled.div` 
  margin-left: ${(props) => (props.isCurrentUser ? "auto" : "")};
  width: max-content;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => (!props.isCurrentUser ? "flex-start" : "flex-end")};
  gap: 0.8em;
  height: max-content;
  margin-bottom: 0.9em;
  margin-top : ${props => props.isInOneGroup ? 0 : "2.5em"};

  > div {
    order : ${(props) => (!props.isCurrentUser ? 1 : 2)};
  }

  > small {
    opacity: 0;
    pointer-events: none;
    font-size : 0.7em;
    order : ${(props) => (!props.isCurrentUser ? 2 : 1)};
  }

  &:hover {
    > small {
      opacity: 1;
      pointer-events: all;
    }
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }

  @media screen and (max-width: 1100px) and (min-width : 600px) {
    width: 60%;
  }
`;