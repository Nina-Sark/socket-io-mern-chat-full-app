import { Avatar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ChatContainer } from "../styles/Chats.styles";
import { useSelector } from "react-redux"

export const Chat = ({
  EndIcon = null,
  chatId,
  avatar,
  firstLine,
  secondLine,
  styles = {
    bg: "currentColor",
    shadow: "currentColor",
    color: "currentColor",
    bgHover: "currentColor",
    shadowHover: "currentColor",
    colorHover: "currentColor",
  },
  ...props
}) => {
  const { chatId: id } = useParams()

  const { userData } = useSelector((state) => state.user);
  const { selectedChat } = useSelector((state) => state.chat);
console.log(props)
  return (
    <ChatContainer 
      bg={styles.bg}
      shadow={styles.shadow}
      color={styles.color}
      bgHover={styles.bgHover}
      shadowHover={styles.shadowHover}
      colorHover={styles.colorHover}
      isSelected={chatId === id}
      {...props}
    >
      <Avatar src={avatar}/>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{firstLine}</span>
        <small>{secondLine}</small>
      </div>
      {EndIcon && <EndIcon/> }
    </ChatContainer>
  );
};
