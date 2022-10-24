import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Body from "./Body";
import { useDispatch, useSelector } from "react-redux";
import { toggleUserInfo } from "../../redux/commonSlice";
import useScrollDisable from "../../hooks/useScrollDisable";

const InfoWrapper = styled.div`
  height: auto;
  width: 40vw;
  border-radius: 5px;
`;

const UserInfo = () => {
  const dispatch = useDispatch();
  const isUserInfo = useSelector((state) => state.common.isUserInfo);
  const backdropRef = React.useRef();
  const modalRef = React.useRef();

  useScrollDisable(isUserInfo);

  const handleClickOutSide = async (e) => {
    if (e.target === backdropRef.current || e.target === modalRef.current) {
      dispatch(toggleUserInfo(false));
    }
  };

  return (
    <>
      {isUserInfo && (
        <div
          className="backdrop"
          onClick={handleClickOutSide}
          ref={backdropRef}
        >
          <div className="modal_centered" ref={modalRef}>
            <InfoWrapper className="userinfo_form">
              <Header />
              <Body />
            </InfoWrapper>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
