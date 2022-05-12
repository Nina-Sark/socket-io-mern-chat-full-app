import { Avatar } from "@mui/material";
import { MessageComponent, MessageContainer } from "../styles/Chats.styles";
import moment from 'moment';
import { useEffect, useRef } from "react";

export const Message = ({
  isLastOne,
  isInOneGroupOfMessages,
  isCurrentUser,
  avatar = null,
  content,
  createdAt,
}) => {

  const messageElm = useRef()

  useEffect(() => {
    messageElm.current.scrollIntoView({
      behavior : "smooth",
      block : "end"
    })
  }, [])

  return (
    <MessageComponent ref={messageElm} isInOneGroup={isInOneGroupOfMessages} isCurrentUser={isCurrentUser}>
      <div
        style={{
          display: isCurrentUser ? "block" : "flex",
          gap: isCurrentUser ? 0 : "1.2em",
          height: "max-content",
        }}
      >
        {(!isCurrentUser && isLastOne) && <Avatar size="large" src={avatar} />}
        <MessageContainer isLastOne={isLastOne} isCurrentUser={isCurrentUser}>
          {content}
        </MessageContainer>
      </div>
      <small>{moment(createdAt).format('MMM Do YYYY, h:mm:ss a')}</small>
    </MessageComponent>
  );
};
