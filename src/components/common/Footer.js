import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input } from "antd";
import { footMenu, footSocial } from "../../data/footerData";
import { addDocument } from "../../firebase/service";
import useToast from "../../hooks/useToast";
import { createdAt } from "../../helpers/utils";

const Footer = () => {
  const [alert, setAlert] = useState("");
  const [form] = Form.useForm();
  const { notify } = useToast();

  const onFinish = (values) => {
    addDocument("subscribersData", {
      ...values,
      createdAt: createdAt(),
    });
    form.resetFields();
    setAlert("Thankyou, you are subscribed to receive our daily newsletter");

    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo.errorFields);
  };

  const currYear = new Date().getFullYear();

  const onClickFooterItem = (e, path) => {
    e.preventDefault();
    notify("info", "Coming soon...", { position: "bottom-right" });
  };

  return (
    <footer id="footer">
      <div className="container">
        <div className="wrapper footer_wrapper">
          <div className="foot_about">
            <h2>
              <Link to="/">X-Beat</Link>
            </h2>
            <div className="foot_subs">
              <p>
                Subscribe to our Email alerts to receive early discount offers,
                and new products info.
              </p>

              <Form
                form={form}
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
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
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
                  <Input
                    placeholder="Email Address*"
                    className="input_field"
                    onBlur={() => {
                      if (
                        document.querySelector(".ant-form-item-explain-error")
                      ) {
                        document
                          .querySelector(".ant-form-item-explain-error")
                          .setAttribute("style", "display: none");
                      }
                    }}
                    onFocus={() => {
                      if (
                        document.querySelector(".ant-form-item-explain-error")
                      ) {
                        document
                          .querySelector(".ant-form-item-explain-error")
                          .setAttribute("style", "display: block");
                      }
                    }}
                  />
                </Form.Item>
                {alert && <p style={{ marginBottom: 0 }}>{alert}</p>}
                <button type="submit" className="btn">
                  Subscribe
                </button>
              </Form>
            </div>
          </div>

          {footMenu.map((item) => {
            const { id, title, menu } = item;
            return (
              <div className="foot_menu" key={id}>
                <h4>{title}</h4>
                <ul>
                  {menu.map((item) => {
                    const { id, link, path } = item;
                    return (
                      <li key={id}>
                        <Link
                          to={path}
                          onClick={(e) => onClickFooterItem(e, path)}
                        >
                          {link}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="separator"></div>

      <div className="sub_footer">
        <div className="container">
          <div className="sub_footer_wrapper">
            <div className="foot_copyright">
              <p>
                {currYear} | X-Beat. All Rights Reserved. Customize by |{" "}
                <a href="https://github.com/tiroxuki0">Miinh Huy</a>
              </p>
            </div>
            <div className="foot_social">
              {footSocial.map((item) => {
                const { id, icon, path } = item;
                return (
                  <Link to={path} key={id}>
                    {icon}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
