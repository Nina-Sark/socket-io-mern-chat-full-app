import { Chat } from "../components/Chat";
import { formatDistanceStrict } from "date-fns";

export const getUser = (users, currentUser) => {
  const user = [...users].filter((user) => user._id !== currentUser)[0];
  console.log(user?.profilePic?.url)
  return { avatar: user?.profilePic?.url, name: user?.name, _id : user?._id };
};

export const getLatestMessage = (chat, currentUser) => {
  const hasLatestMessage = Object.keys(chat).includes("latestMessage");
  console.log(chat)

  if (!hasLatestMessage) {
    return null;
  } else {
    const latestMessage = chat?.latestMessage;
    const latestMessageSender = latestMessage?.sender?._id;
    const latestMessageContent = latestMessage?.content;
    const isSenderCurrentUser = latestMessageSender === currentUser;

    return `${
      isSenderCurrentUser ? "You: " : `${latestMessage?.sender?.name}: `
    }${latestMessageContent}`;
  }
};

export const combineMessages = (messages, message) => {
  const currentMessageIndex = messages?.findIndex(
    (msg) => msg?._id === message?._id
  );
  const previousMessage = messages[currentMessageIndex - 1];

  if (
    !previousMessage ||
    message?.sender?._id !== previousMessage?.sender?._id
  ) {
    if (currentMessageIndex === 0) {
      return true;
    } else {
      return false;
    }
  }

  const time = formatDistanceStrict(
    new Date(message?.createdAt),
    new Date(previousMessage?.createdAt),
    { unit: "minute" }
  );

  const distance = Number(time.split(" ")[0]);
  if (distance <= 4) {
    return true;
  } else {
    return false;
  }
};

export const isLastOne = (messages, message) => {
  const currentMessageIndex = messages?.findIndex(
    (msg) => msg?._id === message?._id
  );

  const nextMessage = messages[currentMessageIndex + 1];
  if (!nextMessage) return true;

  if (nextMessage?.isInGroup) {
    return false;
  } else {
    return true;
  }
};
