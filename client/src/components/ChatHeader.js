import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Popover,
  Typography,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import {
  ChatHeaderContainer,
  LogoTitle,
  RightSideContainer,
} from "../styles/Chats.styles";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../styles/theme";
import { Flex } from "../styles/Flex.styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ProfileDialog } from "./ProfileDialog";
import { DrawerContainer } from "./DrawerContainer";
import { useDispatch, useSelector } from "react-redux";
import { Notifications } from "./Notifications";
import { resetNotificationsNumber } from "../state/reducers/Notifications";
import NOTIFICATIONS_API from "../api/notifications";

export const ChatHeader = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { auth } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const { notifications, newNotifications } = useSelector(
    (state) => state.notification
  );

  const handleNotifications = (event) => {
    setAnchorEl(event.target);
    dispatch(resetNotificationsNumber());
    notifications?.forEach(async (notification) => {
      const data = await NOTIFICATIONS_API.markOffNotification(auth?.token, notification?.message_id)
    })
  };

  return (
    <ChatHeaderContainer>
      <ProfileDialog open={open} setOpen={setOpen} />
      <DrawerContainer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Button
        onClick={() => setDrawerOpen(true)}
        sx={{
          "&.MuiButton-root": {
            color: theme.secondaryAccentColor,
          },
        }}
        type="text"
        startIcon={<SearchIcon />}
      >
        Search users
      </Button>
      <LogoTitle>Bird Chatter</LogoTitle>
      <RightSideContainer>
        <IconButton onClick={handleNotifications}>
          <Badge
            sx={{
              "& .MuiBadge-badge": { background: theme.primaryAccentColor },
            }}
            badgeContent={newNotifications}
            color="primary"
          >
            <NotificationsIcon
              sx={{ "&": { color: theme.secondaryAccentColor } }}
            />
          </Badge>
        </IconButton>
        <Popover
          sx={{ "& .MuiPopover-paper": { p: 2 } }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {notifications?.length !== 0 ? (
            <>
              <Typography variant="h6">Notifications</Typography>
              <Notifications setAnchor={setAnchorEl} />
            </>
          ) : (
            <Typography variant="h6">No notifications</Typography>
          )}
        </Popover>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            "&.MuiButton-root": {
              color: theme.secondaryAccentColor,
            },
          }}
          endIcon={
            <ExpandMoreIcon
              sx={{ "&": { color: theme.secondaryAccentColor } }}
            />
          }
        >
          <Avatar src={userData?.user?.profilePic?.url} size="small" />
        </Button>
      </RightSideContainer>
    </ChatHeaderContainer>
  );
};
