import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BackdropContainer } from "../components/BackdropContainer";
import { ChatHeader } from "../components/ChatHeader";
import { Head } from "../components/Head";
import { LeftSideChat } from "../components/LeftSideChat";
import { RightSideChat } from "../components/RightSideChat";
import { fetchChats } from "../state/thunks/chat/fetchChats";
import { fetchMessages } from "../state/thunks/chat/fetchMessages";
import { fetchSingleChat } from "../state/thunks/chat/fetchSingleChat";
import { getCurrentUser } from "../state/thunks/users/getCurrentUser";
import {
  ChatsContentContainer,
  ChatsPageContainer,
} from "../styles/Chats.styles";
import { SocketContext } from "../socket";
import { getNotifications } from "../state/thunks/notifications/getNotifications";

export const Chats = () => {
  const { chatId } = useParams()
  const dispatch = useDispatch();

  const { socket } = useContext(SocketContext)

  const { auth, logout_loading } = useSelector((state) => state.auth);
  const { user_loading } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.notification);
  const { fetch_chats_loading, delete_chat_loading, fetch_single_chat_loading, fetch_messages_loading, update_group_chat_loading, new_group_chat_loading } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getCurrentUser(auth?.token));
    dispatch(fetchChats(auth?.token))
    dispatch(getNotifications(auth?.token))
  }, [dispatch]);

  useEffect(() => {
     if(chatId) {
      dispatch(fetchSingleChat({ token : auth?.token, chatId }))
      dispatch(fetchMessages({ token : auth?.token, chatId }))
     }
  }, [chatId])

  return (
    <ChatsPageContainer>
      <BackdropContainer open={(user_loading || loading || delete_chat_loading || new_group_chat_loading || logout_loading || update_group_chat_loading || fetch_chats_loading || fetch_single_chat_loading || fetch_messages_loading)} blur={50}/>
      <Head title="Chat" />
      <ChatHeader />
      <ChatsContentContainer>
        <LeftSideChat />
        <RightSideChat />
      </ChatsContentContainer>
    </ChatsPageContainer>
  );
};
