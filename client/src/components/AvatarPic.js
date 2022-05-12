import { Avatar } from "@mui/material";
import theme from "../styles/theme";

export const AvatarPic = ({ avatar, onPictureRead }) => {
  const updatePic = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const pic = e.target.result;
      onPictureRead(pic)
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <label for="file">
        <Avatar
          src={avatar}
          sx={{
            "&": {
              width: "10em",
              height: "10em",
              cursor: "pointer",
              border: `7px solid ${theme.primaryAccentColor}`,
              marginBottom: "1em",
            },
          }}
        />
      </label>
      <input
        onChange={updatePic}
        hidden
        type="file"
        accept="png, jpg"
        id="file"
      />
    </>
  );
};
