import {
  CircularProgress,
  Drawer,
  IconButton,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ScrollContainer, SearchBar } from "../styles/Chats.styles";
import theme from "../styles/theme";
import { Chat } from "./Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../state/thunks/users/searchUsers";
import { clearSearchData } from "../state/reducers/UserReducer";
import { accessChat } from "../state/thunks/chat/accessChat";
import { useNavigate } from "react-router-dom";

export const DrawerContainer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const matches = useMediaQuery("(max-width : 500px)");
  const matches_mobile = useMediaQuery("(max-width : 300px)");

  const { auth } = useSelector((state) => state.auth);
  const { searched_users, search_users_loading } = useSelector(
    (state) => state.user
  );
  const { access_chat_loading, selectedChat } = useSelector(
    (state) => state.chat
  );

  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (!value) return;
    dispatch(
      searchUsers({ token: auth?.token, keyword: value, category: "users" })
    );
  };

  const handleOnClose = () => {
    if(access_chat_loading) return;
    onClose();
    dispatch(clearSearchData("users"));
    setValue("")
  };

  const handleAccess = (userId) => {
    if(access_chat_loading) return;
    dispatch(accessChat({ token: auth?.token, userId }));
  };

  useEffect(() => {
    if (selectedChat && !access_chat_loading) {
      navigate(`/user/${auth?.user?._id}/chats/${selectedChat?._id}`);
      handleOnClose();
    }
  }, [selectedChat, access_chat_loading]);

  return (
    <Drawer
      sx={{
        "&.MuiDrawer-root": {
          backdropFilter: "blur(10px)",

          ".MuiDrawer-paper": {
            background: "#000",
            borderLeft: `15px solid ${theme.secondaryAccentColor}`,
            width: matches ? "100%" : "25em",
            backgroundColor: theme.primaryAccentColor,
            boxShadow: `0 0 120px ${theme.primaryAccentColor}`,
          },
        },
      }}
      anchor="left"
      open={open}
      onClose={handleOnClose}
    >
      <div style={{ padding: "1.5em" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Search Users</Typography>
          {matches && (
            <IconButton
              onClick={handleOnClose}
              sx={{
                "&.MuiButtonBase-root": {
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CloseIcon sx={{ "&": { color: theme.secondaryAccentColor } }} />
            </IconButton>
          )}
        </div>
        <SearchBar>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search for a user by name or email..."
          />
          <button onClick={handleSearch}>Go</button>
        </SearchBar>
        <ScrollContainer
          style={{ marginTop: "50px" }}
          height="calc(100vh - 200px)"
        >
          {search_users_loading
            ? [1, 2, 3, 4, 5].map((n) => (
                <Skeleton
                  sx={{
                    "&": {
                      background: "rgba(0, 0, 0, 0.5)",
                      marginBottom: "0.5em",
                    },
                  }}
                  variant="rectangular"
                  width="100%"
                  height={65}
                />
              ))
            : searched_users?.length > 0 &&
              searched_users?.map((user) => (
                <Chat
                  onClick={() => handleAccess(user?._id)}
                  styles={{
                    bg: "#000",
                    shadow: "#000",
                    color: theme.secondaryAccentColor,
                    bgHover: theme.secondaryAccentColor,
                    shadowHover: theme.secondaryAccentColor,
                    colorHover: "currentColor",
                  }}
                  avatar={user?.profilePic?.url}
                  firstLine={
                    !matches_mobile
                      ? user?.name
                      : `${user?.name?.slice(0, 8)}${
                          user?.name?.length === 8 ? "..." : ""
                        }`
                  }
                  secondLine={
                    !matches_mobile
                      ? user?.email
                      : `${user?.email?.slice(0, 15)}...`
                  }
                />
              ))}
          {access_chat_loading && (
            <CircularProgress
              size={30}
              sx={{ "&.MuiCircularProgress-root": { color: "#000" } }}
            />
          )}
        </ScrollContainer>
      </div>
    </Drawer>
  );
};
