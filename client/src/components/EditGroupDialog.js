import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  IconButton,
  Popover,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollContainer } from "../styles/Chats.styles";
import theme from "../styles/theme";
import { AvatarPic } from "./AvatarPic";
import { Chat } from "./Chat";
import { DialogContainer } from "./DialogContainer";
import { InputField } from "./InputField";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { FormButton } from "../styles/Form.styles";
import debounce from "lodash/debounce";
import { searchUsers } from "../state/thunks/users/searchUsers";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import { clearSearchData } from "../state/reducers/UserReducer";
import { updateGroupChat } from "../state/thunks/chat/updateGroupChat";
import { useNavigate, useParams } from "react-router-dom";
import { deleteChat } from "../state/thunks/chat/deleteChat";

export const EditGroupDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { chatId } = useParams();

  const { selectedChat, update_group_chat_error } = useSelector(
    (state) => state.chat
  );
  const {
    userData,
    searched_participants,
    search_participants_loading,
  } = useSelector((state) => state.user);
  const { auth } = useSelector((state) => state.auth);

  const [deleted, setDeleted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pic, setPic] = useState(selectedChat?.groupChatImage?.url);
  const [chatName, setChatName] = useState(selectedChat?.chatName);
  const [participant, setParticipant] = useState("");
  const [newParticipants, setNewParticipants] = useState([]);
  const [allParticipants, setAllParticipants] = useState([]);

  const matches = useMediaQuery("(max-width : 500px)");
  const disabled =
    newParticipants?.length === 0 &&
    chatName === selectedChat?.chatName &&
    pic === selectedChat?.groupChatImage?.url &&
    allParticipants?.length === selectedChat?.users?.length - 1;

  useEffect(() => {
    if (selectedChat) {
      setPic(selectedChat?.groupChatImage?.url);
      setChatName(selectedChat?.chatName);
      setNewParticipants([]);
      setAllParticipants(
        selectedChat?.users?.filter((user) => user?._id !== userData?.user?._id)
      );
    }
  }, [selectedChat]);

  const handleCancel = () => {
    setOpen(false);
    dispatch(clearSearchData("participants"));
    setPic(selectedChat?.groupChatImage?.url);
    setChatName(selectedChat?.chatName);
    setParticipant("");
    setNewParticipants([]);
    setAllParticipants(
      selectedChat?.users?.filter((user) => user?._id !== userData?.user?._id)
    );
  };

  const handleRemove = (participantId) => {
    console.log(participantId);
    setAllParticipants(
      [...allParticipants].filter(
        (participant) => participant?._id !== participantId
      )
    );
  };

  const handleAdd = (participant) => {
    setNewParticipants([participant, ...newParticipants]);
  };

  const handleSearch = (keyword) => {
    dispatch(
      searchUsers({ token: auth?.token, keyword, category: "participants" })
    );
  };

  const delayedSearch = useCallback(
    debounce((value) => handleSearch(value === "" ? null : value), 600, {
      trailing: true,
    }),
    []
  );

  const handleChange = (e) => {
    setParticipant(e.target.value);
    delayedSearch(e.target.value);
  };

  const handleUpdate = () => {
    dispatch(
      updateGroupChat({
        token: auth?.token,
        chatId,
        chatData: {
          chatName,
          users: [userData?.user, ...allParticipants, ...newParticipants].map(
            (user) => user?._id
          ),
          picture: pic,
        },
      })
    );
    handleCancel();
  };

  const handleDelete = () => {
    dispatch(deleteChat({ token: auth?.token, chatId: selectedChat?._id }));
    setAnchorEl(null);
    setDeleted(true);
  };

  useEffect(() => {
    if (!selectedChat && deleted) {
      navigate(`/user/${userData?.user?._id}/chats`);
      setOpen(false)
    }
  }, [selectedChat]);

  return (
    <DialogContainer onClose={handleCancel} open={open} setOpen={setOpen}>
      <div style={{ padding: "1em" }}>
        <DialogTitle
          sx={{ "&": { color: theme.primaryAccentColor, textAlign: "center" } }}
        >
          Edit Group Chat
        </DialogTitle>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AvatarPic avatar={pic} onPictureRead={setPic} />
        </div>
        <div style={{ marginTop: "0.8em" }}>
          <InputField
            onChange={(e) => setChatName(e.target.value)}
            value={chatName}
            placeholder="Edit Chat Name..."
          />
          <InputField
            onChange={handleChange}
            value={participant}
            placeholder="Add a new participant..."
          />
          <ScrollContainer height={"200px"}>
            {search_participants_loading ? (
              <>
                {[1, 2].map((v) => (
                  <Skeleton
                    sx={{
                      "&": {
                        background: "rgba(180, 245, 253, 0.5)",
                        marginBottom: "0.7em",
                      },
                    }}
                    variant="rectangular"
                    width="100%"
                    height={60}
                  />
                ))}
              </>
            ) : (
              searched_participants?.map((participant) => (
                <Chat
                  avatar={participant?.profilePic?.url}
                  firstLine={
                    !matches
                      ? participant?.name
                      : `${participant?.name?.slice(0, 8)}${
                          participant?.name?.length === 8 ? "..." : ""
                        }`
                  }
                  secondLine={
                    !matches
                      ? participant?.email
                      : `${participant?.email?.slice(0, 5)}...`
                  }
                  EndIcon={() => (
                    <>
                      {[...allParticipants, ...newParticipants]?.find(
                        (user) => user?._id === participant?._id
                      ) ? (
                        <PersonAddDisabledIcon
                          sx={{ "&": { color: "#000", marginLeft: "auto" } }}
                        />
                      ) : (
                        <IconButton
                          onClick={() => handleAdd(participant)}
                          sx={{ "&": { marginLeft: "auto" } }}
                        >
                          <PersonAddIcon sx={{ "&": { color: "#000" } }} />
                        </IconButton>
                      )}
                    </>
                  )}
                />
              ))
            )}
          </ScrollContainer>
          <div style={{ marginTop: "1.2em" }}>
            <Typography
              variant="h5"
              sx={{ "&": { color: theme.secondaryAccentColor } }}
            >
              Participants
            </Typography>
            <ScrollContainer style={{ marginTop: "0.5em" }} height="200px">
              {[...allParticipants, ...newParticipants].map((participant) => (
                <Chat
                  avatar={participant?.profilePic?.url}
                  firstLine={
                    !matches
                      ? participant?.name
                      : `${participant?.name?.slice(0, 8)}${
                          participant?.name?.length === 8 ? "..." : ""
                        }`
                  }
                  secondLine={
                    !matches
                      ? participant?.email
                      : `${participant?.email?.slice(0, 5)}...`
                  }
                  EndIcon={() => (
                    <IconButton
                      onClick={() => handleRemove(participant?._id)}
                      sx={{ "&": { marginLeft: "auto" } }}
                    >
                      <PersonRemoveIcon sx={{ "&": { color: "#000" } }} />
                    </IconButton>
                  )}
                />
              ))}
            </ScrollContainer>
          </div>
        </div>
      </div>
      <DialogActions
        sx={{
          "&": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1em",
          },
        }}
      >
        <FormButton
          onClick={handleUpdate}
          disabled={disabled}
          bg={disabled ? "#D0D3D4" : theme.primaryAccentColor}
          hoverBg={disabled ? "#D0D3D4" : theme.secondaryAccentColor}
          color={disabled ? "#000" : "#fff"}
          hoverColor={"#000"}
        >
          Update
        </FormButton>
        <FormButton
          onClick={handleCancel}
          bg={"#D0D3D4"}
          hoverBg={"#B3B6B7"}
          color={"#000"}
          hoverColor={"#000"}
        >
          Cancel
        </FormButton>
        <FormButton
          onClick={(e) => setAnchorEl(e.target)}
          bg={theme.primaryAccentColor}
          hoverBg={theme.secondaryAccentColor}
          color={"#fff"}
          hoverColor={"#000"}
        >
          Delete Chat
        </FormButton>
        <Popover
          onClose={() => setAnchorEl(null)}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box sx={{ "&": { padding: "0.5em 1em" } }}>
            <Typography variant="h6">
              Are you sure you want to delete the chat?
            </Typography>
            <Stack direction="row" spacing={1} sx={{ "&": { marginTop: "0.7em" } }}>
              <Button
                onClick={handleDelete}
                sx={{
                  "&": {
                    background: theme.primaryAccentColor,
                    color: "#fff",
                    "&:hover": {
                      background: theme.secondaryAccentColor,
                      color: "#000",
                    },
                  },
                }}
              >
                Yes
              </Button>
              <Button
                onClick={() => setAnchorEl(null)}
                sx={{ "&": { color: theme.secondaryAccentColor } }}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Popover>
      </DialogActions>
    </DialogContainer>
  );
};
