import { Avatar, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  AvatarContainer,
  MessageInput,
  MessagesChatHeader,
  MessagesContainer,
  RightSideChatContainer,
} from "../styles/Chats.styles";
import theme from "../styles/theme";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Message } from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { combineMessages, getUser, isLastOne } from "../utils/chats";
import { EditGroupDialog } from "./EditGroupDialog";
import { AlertMessage } from "./AlertMessage";
import { addNewMessage, clearError } from "../state/reducers/ChatReducer";
import { sendMessage } from "../state/thunks/chat/sendMessage";
import { v4 as uuidv4 } from "uuid";
import { SocketContext } from "../socket";
import { addNotification } from "../state/reducers/Notifications";
import moment from "moment";
import NOTIFICATIONS_API from "../api/notifications";
import Lottie from "lottie-react"
import debounce from "lodash/debounce";
import typingAnimation from "../lotties/typing-animation.json";

export const RightSideChat = () => {
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  const [isUserTyping, setIsUserTyping] = useState(false)
  const [typing, setTyping] = useState(false)
  const [message, setMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const isSelected = Boolean(chatId);
  const matches = useMediaQuery("(max-width : 1100px)");

  const {
    selectedChat,
    selectedChatMessages,
    sending_message_loading,
    update_group_chat_error,
  } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.user);
  const { auth } = useSelector((state) => state.auth);

  const user =
    selectedChat && getUser(selectedChat?.users, userData?.user?._id);
  const foundUser = onlineUsers?.find((u) => u?._id === user?._id);
  const isActive = foundUser?.lastActive === null;

  const formatMessages = () => {
    return selectedChatMessages?.map((message) => ({
      ...message,
      isInGroup: combineMessages(selectedChatMessages, message),
    }));
  };

  const adminOptions = {
    onClick: () => setOpen(true),
    style: { cursor: "pointer" },
  };

  useEffect(() => {
    if (socket) {
      socket.on("users_online", (users) => {
        console.log(users);
        setOnlineUsers(users);
      });

      socket.on("new_message", (newMessage) => {
        setMessage(newMessage);
      });

      socket.on("get_typing_indicator", typing => {
        console.log("iiiiiiiiiiiiiiiiiiii", typing)
          setIsUserTyping(typing)
      })
    }
  }, [socket]);

  useEffect(async () => {
    if (message) {
      dispatch(
        addNewMessage({
          message,
        })
      );
      if (message?.chat?._id !== selectedChat?._id) {
        const notification = {
          read: false,
          content: `New message from ${message?.sender?.name}`,
          chat: message?.chat?._id,
          createdAt: new Date().toISOString(),
          avatar: message?.chat?.isGroupChat
            ? message?.chat?.groupChatImage?.url
            : message?.sender?.profilePic?.url,
          message_id: message?._id,
          to: message?.chat?.users
            ?.filter((user) => user?._id !== message?.sender?._id)
            ?.map((u) => u?._id),
        };
        dispatch(addNotification(notification));
        const data = await NOTIFICATIONS_API.sendNotification(auth?.token, notification)
      }
    }
  }, [message]);

  const handleSend = (e) => {
    if (e.key === "Enter") {
      const newMessage = {
        _id: uuidv4(),
        sender: userData?.user,
        content: messageContent,
        chat: {
          ...selectedChat,
          latestMessage: {
            _id: uuidv4(),
            sender: userData?.user,
            content: messageContent,
            chat: selectedChat,
          },
        },
        createdAt: new Date().toISOString(),
      };
      console.log("_____________________", newMessage);
      dispatch(
        addNewMessage({
          message: newMessage,
        })
      );
      socket.emit("send_message", newMessage);
      dispatch(
        sendMessage({
          token: auth?.token,
          messageContent,
          chatId: selectedChat?._id,
        })
      );
      setSent(true);
      setMessageContent("");
    }
  };

  const delayedTyping = useCallback(
    debounce(
      () => {
        setTyping(false)
      },
      600,
      { trailing: true }
    ),
    []
  );

  const handleChange = e => {
    setMessageContent(e.target.value)
    setTyping(true)
    delayedTyping()
  }

  useEffect(() => {
     if(socket && selectedChat) {
       socket.emit("set_typing_indicator", typing, selectedChat, userData?.user?._id)
     }
  }, [typing, socket, selectedChat])

  useEffect(() => {
    if (!sending_message_loading && sent) {
      setMessageContent("");
      setSent(false);
    }
  }, [sending_message_loading]);

  console.log("ttttttttttttttt", isUserTyping)

  return (
    <RightSideChatContainer isSelected={isSelected} isEmpty={!Boolean(chatId)}>
      <EditGroupDialog open={open} setOpen={setOpen} />
      {update_group_chat_error && (
        <AlertMessage
          handleClose={() => dispatch(clearError("update_group_chat_error"))}
          type="error"
          message={update_group_chat_error}
        />
      )}
      {Boolean(chatId) ? (
        <>
          <MessagesChatHeader>
            {!selectedChat?.isGroupChat ? (
              <AvatarContainer>
                <Avatar src={user?.avatar} />
                <div>
                  <span>{user?.name}</span>
                  <small>
                    {isActive
                      ? `Active now`
                      : `Active ${moment(foundUser?.lastActive).fromNow()}`}
                  </small>
                </div>
              </AvatarContainer>
            ) : (
              <AvatarContainer
                {...(selectedChat?.groupAdmin?._id === userData?.user?._id && {
                  ...adminOptions,
                })}
              >
                <Avatar src={selectedChat?.groupChatImage?.url} />
                <div>
                  <Typography
                    variant="h5"
                    sx={{ "&": { color: theme.primaryAccentColor } }}
                  >
                    {selectedChat?.chatName}
                  </Typography>
                </div>
              </AvatarContainer>
            )}
            {matches && (
              <Button
                onClick={() => navigate(`/user/${userData?.user?._id}/chats`)}
                sx={{
                  "&.MuiButton-root": {
                    color: theme.secondaryAccentColor,
                  },
                }}
                type="text"
              >
                <ArrowCircleLeftIcon fontSize="large" />
              </Button>
            )}
          </MessagesChatHeader>
          <MessagesContainer isEmpty={selectedChatMessages?.length === 0}>
            {selectedChatMessages?.length === 0 ? (
              <Typography variant="h4">
                Type something to start a conversation
              </Typography>
            ) : (
              formatMessages().map((message) => (
                <Message
                  isLastOne={isLastOne(formatMessages(), message)}
                  isInOneGroupOfMessages={message?.isInGroup}
                  key={message?._id}
                  isCurrentUser={message?.sender?._id === userData?.user?._id}
                  content={message?.content}
                  createdAt={message?.createdAt}
                  avatar={message?.sender?.profilePic?.url}
                />
              ))
            )}
            {isUserTyping === true && <Lottie
            animationData={typingAnimation}
            loop={true}
            autoplay={true}
            style={{ width: "100px", marginTop : "-1.3em" }}
          />}
          </MessagesContainer>
          <MessageInput
            disabled={sending_message_loading}
            onKeyDown={handleSend}
            onChange={handleChange}
            value={messageContent}
            placeholder="Enter something..."
          />
        </>
      ) : (
        <Typography variant="h4" sx={{ "&": { color: "#fff" } }}>
          Pick a conversation or create a new one
        </Typography>
      )}
    </RightSideChatContainer>
  );
};
