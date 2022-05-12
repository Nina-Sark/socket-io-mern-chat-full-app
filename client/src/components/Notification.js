import { Avatar, Divider, Typography } from "@mui/material";
import {
  NotificationContainer,
  NotificationContent,
} from "../styles/Notification.styles";

export const Notification = ({ avatar, content, timeAgo }) => {
  return (
    <>
      <NotificationContainer>
        <NotificationContent>
          <Avatar src={avatar} />
          <Typography variant="body2">{content}</Typography>
        </NotificationContent>
        <small style={{ fontSize: "0.79em" }}>{timeAgo}</small>
      </NotificationContainer>
      <Divider />
    </>
  );
};
