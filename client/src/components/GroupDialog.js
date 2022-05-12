import {
  Avatar,
  Chip,
  CircularProgress,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollContainer } from "../styles/Chats.styles";
import { FormButton } from "../styles/Form.styles";
import theme from "../styles/theme";
import { AvatarPic } from "./AvatarPic";
import { Chat } from "./Chat";
import { DialogContainer } from "./DialogContainer";
import { InputField } from "./InputField";
import debounce from "lodash/debounce";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import USERS_API from "../api/user";
import { createGroupChat } from "../state/thunks/chat/createGroupChat";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "./AlertMessage";
import { clearError } from "../state/reducers/ChatReducer";

export const GroupDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedChat, new_group_chat_error } = useSelector(
    (state) => state.chat
  );
  const { auth } = useSelector((state) => state.auth);

  const matches = useMediaQuery("(max-width : 500px)");

  const [values, setValues] = useState({
    groupChatName: "",
    user: "",
  });
  const [pic, setPic] = useState("");
  const [addedUsers, setAddedUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const data = {
    picture: pic,
    name: values.groupChatName,
    users: addedUsers?.length > 0 ? addedUsers.map((user) => user?._id) : null,
  };

  const disabled = Object.values(data)?.some((value) => !Boolean(value));

  const handleOnClose = () => {
    setValues({
      groupChatName: "",
      user: "",
    });
    setPic("");
    setAddedUsers([]);
    setSearchedUsers([]);
    setLoading(false);
  };

  const handleSearch = async (keyword) => {
    setLoading(true);
    const { users } = await USERS_API.searchUsers(auth?.token, keyword);
    setSearchedUsers(users);
    setLoading(false);
  };

  const delayedSearch = useCallback(
    debounce(
      (value) => {
        if (value?.length > 0) {
          handleSearch(value);
        } else {
          setSearchedUsers([]);
        }
      },
      600,
      { trailing: true }
    ),
    []
  );

  const handleChange = (e) => {
    setValues({ ...values, user: e.target.value });
    delayedSearch(e.target.value);
  };

  const handleAdd = (user) => {
    setAddedUsers([user, ...addedUsers]);
  };

  const handleRemove = (user) => {
    setAddedUsers(
      [...addedUsers]?.filter((addedUser) => addedUser?._id !== user?._id)
    );
  };

  const handleCreate = () => {
    if (!disabled) {
      console.log(data);
      dispatch(createGroupChat({ token: auth?.token, chatData: data }));
    }
  };

  useEffect(() => {
    if (selectedChat) {
      navigate(`/user/${auth?.user?._id}/chats/${selectedChat?._id}`);
      setOpen(false);
      handleOnClose();
    }
  }, [selectedChat]);

  return (
    <DialogContainer onClose={handleOnClose} open={open} setOpen={setOpen}>
      {new_group_chat_error && (
        <AlertMessage
          handleClose={() => dispatch(clearError("new_group_chat_error"))}
          type="error"
          message={new_group_chat_error}
        />
      )}
      <DialogTitle
        sx={{
          color: theme.primaryAccentColor,
          textAlign: "center",
          marginBottom: "1em",
        }}
      >
        Create Group Chat
      </DialogTitle>
      <div style={{ paddingBottom: "1em", padding: "0 2em" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1em",
          }}
        >
          <AvatarPic avatar={pic} onPictureRead={setPic} />
        </div>
        <InputField
          value={values.groupChatName}
          onChange={(e) =>
            setValues({ ...values, groupChatName: e.target.value })
          }
          name="group-chat-name"
          placeholder="Enter group chat name..."
        />
        <InputField
          value={values.user}
          onChange={handleChange}
          name="group-chat-name"
          placeholder="Add users eg: John, Ellen..."
        />
        <Grid
          container
          rowGap={2}
          justifyContent="center"
          rows={3}
          columns={3}
          columnGap={1}
          sx={{ "&": { marginBottom: "1em", maxWidth: "400px" } }}
        >
          {addedUsers?.map((user) => (
            <Grid sx={{ "&": { maxWidth: "max-content" } }} item>
              <Chip
                avatar={<Avatar src={user?.profilePic?.url} />}
                onDelete={() => handleRemove(user)}
                sx={{
                  "&.MuiChip-root": {
                    background: theme.primaryAccentColor,
                    color: "#fff",

                    ".MuiSvgIcon-root": {
                      fill: "#000",
                    },
                  },
                }}
                label={user?.name}
              />
            </Grid>
          ))}
        </Grid>
        {loading && (
          <Stack
            direction="row"
            justifyContent="center"
            sx={{ "&": { margin: "2em 0" } }}
          >
            <CircularProgress
              size={30}
              sx={{
                "&.MuiCircularProgress-root": {
                  color: theme.primaryAccentColor,
                },
              }}
            />
          </Stack>
        )}
        {searchedUsers?.length > 0 && (
          <ScrollContainer
            height="200px"
            style={{ marginTop: "3em", marginBottom: "1em" }}
          >
            <Typography
              variant="h5"
              sx={{ "&": { color: "#fff", marginBottom: "0.7em" } }}
            >
              Search Results
            </Typography>
            {searchedUsers?.map((user) => (
              <Chat
                avatar={user?.profilePic?.url}
                firstLine={
                  !matches
                    ? user?.name
                    : `${user?.name?.slice(0, 8)}${
                        user?.name?.length === 8 ? "..." : ""
                      }`
                }
                secondLine={
                  !matches ? user?.email : `${user?.email?.slice(0, 5)}...`
                }
                EndIcon={() => (
                  <>
                    {addedUsers?.find(
                      (addedUser) => addedUser?._id === user?._id
                    ) ? (
                      <PersonAddDisabledIcon
                        sx={{ "&": { color: "#000", marginLeft: "auto" } }}
                      />
                    ) : (
                      <IconButton
                        onClick={() => handleAdd(user)}
                        sx={{ "&": { marginLeft: "auto" } }}
                      >
                        <PersonAddIcon sx={{ "&": { color: "#000" } }} />
                      </IconButton>
                    )}
                  </>
                )}
              />
            ))}
          </ScrollContainer>
        )}
        <DialogActions
          sx={{
            "&": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1em 0",
            },
          }}
        >
          <FormButton
            onClick={() => handleCreate()}
            disabled={disabled}
            bg={disabled ? "#D0D3D4" : theme.primaryAccentColor}
            hoverBg={disabled ? "#D0D3D4" : theme.secondaryAccentColor}
            color={disabled ? "#000" : "#fff"}
            hoverColor={"#000"}
          >
            Create
          </FormButton>
        </DialogActions>
      </div>
    </DialogContainer>
  );
};
