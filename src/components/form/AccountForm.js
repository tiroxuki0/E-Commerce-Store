import React, { useRef, useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useOutsideClose from "../../hooks/useOutsideClose";
import useScrollDisable from "../../hooks/useScrollDisable";
import {
  toggleForm as toggleFormRedux,
  setFormUserInfo as setFormUserInfoRedux,
} from "../../redux/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  facebookSignIn,
  googleSignIn,
  twitterSignIn,
  addDocument,
} from "../../firebase/service";
import useToast from "../../hooks/useToast";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const AccountForm = () => {
  const dispatch = useDispatch();
  const isFormOpenRedux = useSelector((state) => state.common.isFormOpen);
  const pending = useSelector((state) => state.common.pending);
  const { handleFormSubmit } = useForm();
  const { notify } = useToast();

  const onFinish = (values) => {
    handleFormSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo.errorFields);
  };

  const formRef = useRef();

  useOutsideClose(formRef, () => {
    dispatch(toggleFormRedux(false));
  });

  useScrollDisable(isFormOpenRedux);

  const [isSignupVisible, setIsSignupVisible] = useState(false);

  // Signup-form visibility toggling
  const handleIsSignupVisible = () => {
    setIsSignupVisible((prevState) => !prevState);
  };

  /* SIGN IN FUNCTION */
  const signIn = (result) => {
    const { uid, email, displayName, photoURL } = result.data.user;
    if (result.data?._tokenResponse?.isNewUser) {
      notify("success", `You'r successfully logged in!`);
      addDocument("usersData", {
        uid,
        email,
        username: displayName,
        photoURL,
        providerId: result.data.providerId,
      });
      dispatch(
        setFormUserInfoRedux({
          uid,
          email,
          username: displayName,
          photoURL,
          providerId: result.data.providerId,
        })
      );
      dispatch(toggleFormRedux(false));
    } else {
      notify("success", `You'r successfully logged in!`);
      dispatch(
        setFormUserInfoRedux({
          uid,
          email,
          username: displayName,
          photoURL,
          providerId: result.data.providerId,
        })
      );
      dispatch(toggleFormRedux(false));
    }
  };

  /* FB SIGN IN */
  const handleSignInFB = async () => {
    const result = await facebookSignIn();
    signIn(result);
  };

  /* GOOGLE SIGN IN */
  const handleSignInGG = async () => {
    const result = await googleSignIn();
    signIn(result);
  };

  /* TWITTER SIGN IN */
  const handleSignInTW = async () => {
    const result = await twitterSignIn();
    signIn(result);
  };

  return (
    <>
      {isFormOpenRedux && (
        <div className="backdrop">
          <div className="modal_centered">
            <div id="account_form" ref={formRef}>
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                {/*===== Form-Header =====*/}
                <div className="form_head">
                  <h2>{isSignupVisible ? "Signup" : "Login"}</h2>
                  <p>
                    {isSignupVisible
                      ? "Already have an account ?"
                      : "New to X-Beat ?"}
                    &nbsp;&nbsp;
                    <button type="button" onClick={handleIsSignupVisible}>
                      {isSignupVisible ? "Login" : "Create an account"}
                    </button>
                  </p>
                </div>
                {/*===== Form-Body =====*/}
                <div className="form_body">
                  {isSignupVisible && (
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          min: 10,
                          message:
                            "Username must be at least 10 characters long",
                        },
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Username" className="input_field" />
                    </Form.Item>
                  )}

                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                      {
                        validator: async (_, value) => {
                          if (!value) return;

                          if (value.includes("@")) {
                            if (value.split("@")[0].length < 10) {
                              return Promise.reject(
                                new Error(
                                  "Email must be at least 10 characters long"
                                )
                              );
                            }
                          }

                          if (
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                              value
                            ) === false
                          ) {
                            return Promise.reject(
                              new Error("The input is not valid Email")
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Email" className="input_field" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        min: 10,
                        message: "Password must be at least 10 characters long",
                      },
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Password"
                      className="input_field"
                      type="password"
                    />
                  </Form.Item>

                  {isSignupVisible && (
                    <Form.Item
                      name="confirm"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject(
                              new Error("Confirm password do not match!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input
                        placeholder="Confirm Password"
                        className="input_field"
                        type="password"
                      />
                    </Form.Item>
                  )}

                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn login_btn"
                  >
                    {isSignupVisible ? "Signup" : "Login"}
                  </Button>
                </div>

                {/*===== Form-Footer =====*/}
                <div className="form_foot">
                  <p>or login with</p>
                  <div className="login_options">
                    <Link to="/" onClick={handleSignInFB}>
                      Facebook
                    </Link>
                    <Link to="/" onClick={handleSignInGG}>
                      Google
                    </Link>
                    <Link to="/" onClick={handleSignInTW}>
                      Twitter
                    </Link>
                  </div>
                </div>

                {/*===== Form-Close-Btn =====*/}
                <div
                  className="close_btn"
                  title="Close"
                  onClick={() => {
                    /*  */
                    dispatch(toggleFormRedux(false));
                    /*  */
                  }}
                >
                  &times;
                </div>
              </Form>
              {pending && (
                <div className="pending">
                  <Spin indicator={antIcon} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountForm;
