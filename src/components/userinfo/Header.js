import * as React from "react";
import axios from "axios";
import styledd from "styled-components";
import { Buffer } from "buffer";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { setUserAvatar } from "../../redux/commonSlice";
import useToast from "../../hooks/useToast";
import { updateUser } from "../../firebase/service";

const ListHeaderWrapper = styledd.div`
  margin-bottom: 20px;
  height: 25%;
  position: relative;
  z-index: 100;
`;

const AvatarUser = styledd.div`
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translate(-50%,50%);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderInfo = styledd.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonStyled = styledd(IconButton)`
  transition: all 0.3s ease;
  padding: 7px;
  &:hover{
    background #4eac6d !important;
    svg{
      fill: white;
    }
  }
`;

const Container = styledd.div`
  width: 100%;
  min-height: 80px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  background: white;
  padding: 10px 5px;
  .refresh{
    z-index: 10;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(100%, -50%);
  }
  .avatars {
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    .avatar {
      border: 0.2rem solid transparent;
      padding: 0.1rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 2.5rem;
        transition: 0.5s ease-in-out;
      }
      &.selected {
        border: 0.2rem solid #4e0eff;
      }
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

const ListHeader = () => {
  const api = `https://api.multiavatar.com/`;
  const formUserInfo = useSelector((state) => state.common.formUserInfo);
  const usersData = useSelector((state) => state.data.users);
  const [editAvatar, setEditAvatar] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [avatars, setAvatars] = React.useState([]);
  const [selectedAvatar, setSelectedAvatar] = React.useState(undefined);
  const prevSelected = React.useRef();
  const dispatch = useDispatch();
  const { notify } = useToast();

  const userCurrent = usersData.find((u) => u.uid === formUserInfo.uid);

  /* end handle background */

  const getAvatars = async () => {
    const data = [];
    for (let i = 0; i < 8; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}/?apikey=lyjRWY9qwm7VBD`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setLoading(false);
  };

  React.useEffect(() => {
    getAvatars();
  }, []);

  const handleChangeAvatar = (index) => {
    setSelectedAvatar(index);
    dispatch(setUserAvatar(avatars[index]));
  };

  const handleSaveAvatar = () => {
    setEditAvatar(false);
    if (
      avatars[selectedAvatar] === formUserInfo.photoURL &&
      prevSelected.current !== selectedAvatar
    ) {
      updateUser(userCurrent.id, {
        ...formUserInfo,
        photoURL: avatars[selectedAvatar],
      });
      notify("success", `User's avatar updated!`, { position: "bottom-right" });
    }
    prevSelected.current = selectedAvatar;
  };

  return (
    <ListHeaderWrapper
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "15px",
        height: "125px",
        borderTopRightRadius: "5px",
        borderTopLeftRadius: "5px",
      }}
    >
      <HeaderInfo>
        <h3
          style={{
            margin: 0,
            fontSize: "20px",
            color: "rgb(241 241 241)",
            fontWeight: 600,
          }}
        >
          Profile
        </h3>
      </HeaderInfo>
      <AvatarUser className="avataruser">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            !editAvatar ? (
              <Tooltip title="Change Profile Image" placement="right">
                <ButtonStyled
                  disabled={formUserInfo.providerId == "normal" ? false : true}
                  onClick={() => setEditAvatar(true)}
                  sx={{
                    background: "rgb(85 85 85 / 60%)!important",
                  }}
                >
                  {formUserInfo.providerId == "normal" ? (
                    <CameraAltIcon
                      sx={{
                        width: 16,
                        height: 16,
                        color: "#4eac6d",
                      }}
                    />
                  ) : (
                    <LockIcon
                      sx={{
                        width: 16,
                        height: 16,
                        color: "#4eac6d",
                      }}
                    />
                  )}
                </ButtonStyled>
              </Tooltip>
            ) : (
              <Tooltip title="Save Profile Image" placement="right">
                <ButtonStyled
                  onClick={handleSaveAvatar}
                  sx={{
                    background: "rgb(85 85 85 / 60%)!important",
                  }}
                >
                  <CheckIcon
                    sx={{
                      width: 16,
                      height: 16,
                      color: "#4eac6d",
                    }}
                  />
                </ButtonStyled>
              </Tooltip>
            )
          }
        >
          {formUserInfo.photoURL && formUserInfo.photoURL.includes("http") ? (
            <Avatar
              alt={formUserInfo.username}
              src={formUserInfo.photoURL}
              sx={{ width: 85, height: 85, border: "5px solid white" }}
            />
          ) : (
            <Avatar
              alt={formUserInfo.username}
              src={`data:image/svg+xml;base64,${formUserInfo.photoURL}`}
              sx={{ width: 85, height: 85, border: "5px solid white" }}
            />
          )}
        </Badge>
        {editAvatar && (
          <Container
            style={{
              background: "rgb(36 36 36 / 33%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(5px)",
            }}
          >
            {loading ? (
              "Please wait..."
            ) : (
              <div className="avatars">
                {avatars.map((avatar, index) => {
                  return (
                    <div
                      key={index}
                      className={`avatar ${
                        selectedAvatar === index ? "selected" : ""
                      }`}
                    >
                      <img
                        src={`data:image/svg+xml;base64,${avatar}`}
                        alt="avatar"
                        key={avatar}
                        onClick={() => handleChangeAvatar(index)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        )}
      </AvatarUser>
    </ListHeaderWrapper>
  );
};

export default ListHeader;
