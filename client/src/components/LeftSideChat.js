import { Avatar, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  ChatContainer,
  ChatsContainer,
  LeftSideChatContainer,
  LeftSideHeader,
} from "../styles/Chats.styles";
import AddIcon from "@mui/icons-material/Add";
import theme from "../styles/theme";
import { Chat } from "./Chat";
import { GroupDialog } from "./GroupDialog";
import { useDispatch, useSelector } from "react-redux";
import { getLatestMessage, getUser } from "../utils/chats";
import { useNavigate, useParams } from "react-router-dom";
import { updateChats } from "../state/reducers/ChatReducer";
import { SocketContext } from "../socket";

export const LeftSideChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chatId } = useParams();

  const { socket } = useContext(SocketContext);

  const isSelected = !Boolean(chatId);
  const [open, setOpen] = useState(false);

  const {
    chats,
    update_group_chat_loading,
    selectedChat,
    update_group_chat_error,
  } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (
      !update_group_chat_loading &&
      selectedChat &&
      !update_group_chat_error
    ) {
      const updatedChats = chats.map((chat) => {
        if (chat?._id === selectedChat?._id) {
          return selectedChat;
        } else {
          return chat;
        }
      });

      dispatch(updateChats(updatedChats));
    }
  }, [update_group_chat_loading, selectedChat]);

  useEffect(() => {
    if (chats?.length === 0) return;
    [...chats].forEach((chat) => {
      socket.emit("join_chat", chat);
    });
  }, []);

  return (
    <LeftSideChatContainer isSelected={isSelected}>
      <GroupDialog open={open} setOpen={setOpen} />
      <LeftSideHeader>
        <h2>My Chats</h2>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            "&.MuiButton-root": {
              color: theme.secondaryAccentColor,
            },
          }}
          endIcon={<AddIcon />}
        >
          New group chat
        </Button>
      </LeftSideHeader>
      <ChatsContainer isEmpty={chats?.length === 0}>
        {chats?.length === 0 ? (
          <Typography variant="h4" sx={{ "&": { color: "#fff" } }}>
            No chats
          </Typography>
        ) : (
          chats?.map((chat) => (
            <Chat
              onClick={() => {
                navigate(`/user/${userData?.user?._id}/chats/${chat._id}`)
                socket.emit("join_chat", chat)
              }}
              chatId={chat?._id}
              avatar={
                !chat?.isGroupChat
                  ? getUser(chat?.users, userData?.user?._id)?.avatar
                  : chat?.groupChatImage?.url
              }
              firstLine={
                !chat?.isGroupChat
                  ? getUser(chat?.users, userData?.user?._id)?.name
                  : chat?.chatName
              }
              secondLine={getLatestMessage(chat, userData?.user?._id)}
            />
          ))
        )}
      </ChatsContainer>
    </LeftSideChatContainer>
  );
};
