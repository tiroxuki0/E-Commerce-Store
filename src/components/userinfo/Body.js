import * as React from "react";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import styledd from "styled-components";
import LockIcon from "@mui/icons-material/Lock";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import useToast from "../../hooks/useToast";
import { updateUser } from "../../firebase/service";
import { setFormUserInfo } from "../../redux/commonSlice";
import {
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../firebase/config";

const BoxStyled = styledd(Box)`
  overflow: hidden auto;
  margin-top: 80px;
  position: relative;
  padding: 0px 15px;
`;

const HeaderInfo = styledd.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ButtonStyled = styledd(Button)`
  min-width: 30px !important;
  transition: all 0.3s ease;
  padding: 7px;
  &:hover{
    background #4eac6d !important;
    svg{
      fill: white;
    }
  }
`;

const ItemInfo = styledd.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const LeftInfo = styledd.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  div{
    width: 100%;
  }
`;

const TextValidatorStyled = styledd(TextValidator)`
width: 100%;
  input{
    width: 100%;
    padding: 5px 5px 5px 0px;
  }
  fieldset{
    border-color: transparent !important;
  }
`;

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

function CustomizedList() {
  const dispatch = useDispatch();
  const formUserInfo = useSelector((state) => state.common.formUserInfo);
  const usersData = useSelector((state) => state.data.users);
  const [name, setName] = React.useState(formUserInfo.username);
  const [email, setEmail] = React.useState(formUserInfo.email);
  const [password, setPassword] = React.useState(
    formUserInfo.password ? formUserInfo.password : ""
  );
  const [isName, setIsName] = React.useState(true);
  const [isEmail, setIsEmail] = React.useState(true);
  const [isPassword, setIsPassword] = React.useState(true);
  const [isEdit, setIsEdit] = React.useState(false);
  const { notify } = useToast();

  const prevUser = React.useRef(formUserInfo);

  const userCurrent = usersData.find((u) => u.uid === formUserInfo.uid);

  ValidatorForm.addValidationRule("isEmailExist", async (email) => {
    const user = usersData.find((u) => u.email === email);
    if (user && user.uid !== formUserInfo.uid) {
      return false;
    }
    return true;
  });

  const handleSaveEdit = async () => {
    setIsEdit(false);
    setIsName(true);
    setIsEmail(true);
    setIsPassword(true);
    dispatch(
      setFormUserInfo({
        ...formUserInfo,
        username: name,
        email,
        password,
      })
    );
    updateUser(userCurrent.id, {
      ...formUserInfo,
      username: name,
      email,
      password,
    });
    if (
      prevUser.current.password !== password &&
      prevUser.current.email !== email
    ) {
      await updateEmail(auth.currentUser, email)
        .then(async () => {
          // Email updated!
          console.log("Email updated");
        })
        .catch((error) => {
          console.log(error);
          // An error occurred
          // ...
        });
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          console.log("Re-SignIn");
          const user = userCredential.user;
          /*  */
        })
        .catch((error) => {
          return { code: 0, message: "Signin failed!", error };
        });
      await updatePassword(auth.currentUser, password)
        .then(() => {
          // Password updated!
          console.log("Password updated");
        })
        .catch((error) => {
          console.log(error);
          // An error occurred
          // ...
        });
    } else if (prevUser.current.password !== password) {
      updatePassword(auth.currentUser, password)
        .then(() => {
          // Password updated!
          console.log("Password updated");
        })
        .catch((error) => {
          console.log(error);
          // An error occurred
        });
    } else if (prevUser.current.email !== email) {
      updateEmail(auth.currentUser, email)
        .then(async () => {
          // Email updated!
          console.log("Email updated");
        })
        .catch((error) => {
          console.log(error);
          // An error occurred
        });
    }
    prevUser.current = { ...prevUser.current, username: name, email, password };
    notify("success", "Profile updated!", { position: "bottom-right" });
  };

  const handleChangeName = () => {
    setIsName(false);
    setIsEdit(true);
  };
  const handleChangeEMail = () => {
    setIsEdit(true);
    setIsEmail(false);
  };
  const handleChangePassword = () => {
    setIsEdit(true);
    setIsPassword(false);
  };

  return (
    <BoxStyled>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            background: { paper: "dark" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: "100%" }}>
          <FireNav component="nav" disablePadding>
            <ValidatorForm
              sx={{
                maxWidth: "100%",
              }}
              onSubmit={handleSaveEdit}
            >
              <HeaderInfo>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    my: 0,
                    px: 0,
                    pt: 0,
                    textAlign: "left",
                    fontSize: 15,
                    fontWeight: "700",
                    lineHeight: "20px",
                    color: "rgba(255, 255, 255, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    gap: "10px",
                  }}
                >
                  <PersonIcon
                    sx={{
                      width: 16,
                      height: 16,
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                  />
                  Personal Info
                </Typography>
                {isEdit && (
                  <Tooltip title="Save Info" placement="right">
                    <ButtonStyled
                      type="submit"
                      sx={{
                        background: "rgba(78,172,109,.1) !important",
                        minWidth: "40px !important",
                      }}
                    >
                      <CheckIcon
                        sx={{ width: 16, height: 16, color: "#4eac6d" }}
                      />
                    </ButtonStyled>
                  </Tooltip>
                )}
              </HeaderInfo>
              <List
                sx={{ bgcolor: "background.paper", "& ul": { padding: 0 } }}
                subheader={<li />}
              >
                <ItemInfo>
                  <LeftInfo>
                    <h5
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        color: "#adb5bd",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      Name
                    </h5>
                    <TextValidatorStyled
                      disabled={isName}
                      fullWidth
                      validators={["required", "minStringLength:8"]}
                      errorMessages={[
                        "Please enter name",
                        "Display name must be at least 8 characters long",
                      ]}
                      sx={{
                        margin: 0,
                        fontSize: "20px",
                        color: "#adb5bd",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </LeftInfo>
                  <Tooltip title="Edit Name" placement="right">
                    <ButtonStyled
                      disabled={
                        formUserInfo.providerId == "normal" ? false : true
                      }
                      onClick={handleChangeName}
                      sx={{
                        background: "rgba(78,172,109,.1) !important",
                      }}
                    >
                      {formUserInfo.providerId == "normal" ? (
                        <EditIcon
                          sx={{ width: 16, height: 16, color: "#4eac6d" }}
                        />
                      ) : (
                        <LockIcon
                          sx={{ width: 16, height: 16, color: "#495057" }}
                        />
                      )}
                    </ButtonStyled>
                  </Tooltip>
                </ItemInfo>
                <ItemInfo>
                  <LeftInfo>
                    <h5
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        color: "#adb5bd",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      Email
                    </h5>
                    <TextValidatorStyled
                      disabled={isEmail}
                      fullWidth
                      autoComplete="email"
                      validators={[
                        "required",
                        "isEmail",
                        "minStringLength:18",
                        "isEmailExist",
                      ]}
                      errorMessages={[
                        "Please enter email",
                        "Email is not valid!",
                        "Email must be at least 8 characters long",
                        "Email is already exist",
                      ]}
                      sx={{
                        margin: 0,
                        fontSize: "20px",
                        color: "#adb5bd",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </LeftInfo>
                  <Tooltip title="Edit Email" placement="right">
                    <ButtonStyled
                      disabled={
                        formUserInfo.providerId == "normal" ? false : true
                      }
                      onClick={handleChangeEMail}
                      sx={{
                        background: "rgba(78,172,109,.1) !important",
                      }}
                    >
                      {formUserInfo.providerId == "normal" ? (
                        <EditIcon
                          sx={{ width: 16, height: 16, color: "#4eac6d" }}
                        />
                      ) : (
                        <LockIcon
                          sx={{ width: 16, height: 16, color: "#495057" }}
                        />
                      )}
                    </ButtonStyled>
                  </Tooltip>
                </ItemInfo>
                <ItemInfo>
                  <LeftInfo>
                    <h5
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        color: "#adb5bd",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      Password
                    </h5>
                    <TextValidatorStyled
                      disabled={isPassword}
                      type={isPassword ? "password" : "text"}
                      fullWidth
                      validators={["required", "minStringLength:10"]}
                      errorMessages={[
                        "Please enter password",
                        "Password must be at least 10 characters long",
                      ]}
                      sx={{
                        margin: 0,
                        fontSize: "20px",
                        color: "#adb5bd",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </LeftInfo>
                  <Tooltip title="Edit Password" placement="right">
                    <ButtonStyled
                      disabled={
                        formUserInfo.providerId == "normal" ? false : true
                      }
                      onClick={handleChangePassword}
                      sx={{
                        background: "rgba(78,172,109,.1) !important",
                      }}
                    >
                      {formUserInfo.providerId == "normal" ? (
                        <EditIcon
                          sx={{ width: 16, height: 16, color: "#4eac6d" }}
                        />
                      ) : (
                        <LockIcon
                          sx={{ width: 16, height: 16, color: "#495057" }}
                        />
                      )}
                    </ButtonStyled>
                  </Tooltip>
                </ItemInfo>
              </List>
            </ValidatorForm>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </BoxStyled>
  );
}

export default React.memo(CustomizedList);
