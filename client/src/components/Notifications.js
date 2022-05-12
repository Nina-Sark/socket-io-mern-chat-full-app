import { useDispatch, useSelector } from "react-redux";
import { ScrollContainer } from "../styles/Chats.styles";
import { Notification } from "./Notification";
import moment from "moment";
import { ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeNotification } from "../state/reducers/Notifications";
import NOTIFICATIONS_API from "../api/notifications";

export const Notifications = ({ setAnchor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { notifications } = useSelector((state) => state.notification);
  const { auth } = useSelector((state) => state.auth);

  const handleNavigate = async (notification) => {
    navigate(`/user/${auth?.user?._id}/chats/${notification?.chat}`);
    dispatch(removeNotification(notification?.message_id))
    setAnchor(null);
    await NOTIFICATIONS_API.deleteNotification(auth?.token, notification?.message_id)
  };

  return (
    <ScrollContainer style={{ marginTop: "0.7em" }} height="200px">
      {notifications?.map((notification) => (
         <div>
              <ButtonBase onClick={() => handleNavigate(notification)} sx={{ p: 1 }}>
          <Notification
            content={notification?.content}
            timeAgo={moment(notification?.createdAt).fromNow()}
            avatar={notification?.avatar}
          />
        </ButtonBase>

         </div>
      ))}
    </ScrollContainer>
  );
};
