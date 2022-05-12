import { Avatar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FormButton } from "../styles/Form.styles";
import theme from "../styles/theme";
import { DialogContainer } from "./DialogContainer";
import { useNavigate } from "react-router-dom";
import { BackdropContainer } from "./BackdropContainer";
import { updateProfilePic } from "../state/thunks/users/updateProfilePic";
import { AlertMessage } from "./AlertMessage";
import { clearError, resetUser } from "../state/reducers/UserReducer";
import { AvatarPic } from "./AvatarPic";
import logout from "../state/thunks/auth/logout";
import { resetChat } from "../state/reducers/ChatReducer";
import { resetAuth } from "../state/reducers/AuthReducer";
import { useContext } from "react";
import { SocketContext } from "../socket"

export const ProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext)

  const { auth } = useSelector((state) => state.auth);
  const { userData, pic_loading, pic_error } = useSelector(
    (state) => state.user
  );
  console.log(pic_error);

  const updatePic = (pic) => {
    dispatch(updateProfilePic({ token: auth?.token, picture: pic }));
  };

  const handleLogout = () => {
    socket.emit("disconnect_user", auth?.user)
    dispatch(logout(auth?.token))
    setOpen(false)
    dispatch(resetChat())
    dispatch(resetUser())
    dispatch(resetAuth())
  }

  return (
    <DialogContainer open={open} setOpen={setOpen}>
      <div
        style={{
          padding: "3em 2.5em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <BackdropContainer open={pic_loading} />
        <AvatarPic
          avatar={userData?.user?.profilePic?.url}
          onPictureRead={updatePic}
        />
        <Typography
          sx={{
            "&": {
              textAlign: "center",
              marginTop: "1em",
              color: theme.primaryAccentColor,
            },
          }}
        >
          {userData?.user?.email}
        </Typography>
        {!userData?.user?.emailVerified && (
          <FormButton
            onClick={() => navigate(`/user/${userData?.user?._id}/verifyemail`)}
            bg={theme.primaryAccentColor}
            hoverBg={theme.secondaryAccentColor}
            color={"#fff"}
            hoverColor={"#000"}
          >
            Verify email
          </FormButton>
        )}
        <FormButton
          onClick={handleLogout}
          bg={theme.primaryAccentColor}
          hoverBg={theme.secondaryAccentColor}
          color={"#fff"}
          hoverColor={"#000"}
        >
          Log out
        </FormButton>
      </div>
      {pic_error && (
        <AlertMessage
          type="error"
          message={pic_error}
          handleClose={() => dispatch(clearError("pic_error"))}
        />
      )}
    </DialogContainer>
  );
};
