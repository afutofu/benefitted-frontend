import React, { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";

import { AdminContext } from "../contexts/AdminContext";
import api from "../api";

const modalFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%)
  }
  1%{
    opacity:0;
    transform:translateX(0%);
  }
  100%{
    opacity:1;
    transform: translateX(0%)
  }
`;

const modalFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0%)
  }
  99%{
    opacity:0;
    transform: translateX(0%)
  }
  100%{
    opacity:0;
    transform: translateX(100%)
  }
`;

const ButtonContainerHeight = "70px";
const horizontalPadding = "25px";

const AdminModalComp = styled.div`
  color: #222;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  transform: translateX(-100%);
  opacity: 0;

  animation: ${(props) =>
      props.modalOpen ? modalFadeIn : props.firstRender ? "none" : modalFadeOut}
    0.5s forwards;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 250;
`;

const AdminBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 400px;
  /* background-color: #e9e8e3; */
  background-color: #e2d6c0;
  font-family: "Montserrat", "san-serif";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: ${ButtonContainerHeight};
  box-sizing: border-box;
  z-index: 300;
  border-radius: 10px;

  @media only screen and (max-width: 450px) {
    width: 250px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: ${horizontalPadding};
  padding-bottom: 0;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 22px;
  margin-bottom: 25px;
`;

const Header = styled.h3`
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: 500;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  color: red;
`;

const Input = styled.input.attrs(() => ({
  type: "password",
}))`
  position: relative;
  width: 100%;
  height: 45px;
  padding: 10px 20px;
  border-radius: 10px;
  color: black;
  background-color: #e9e8e3;
  outline: none;
  border: none;
  box-sizing: border-box;
  font-size: 14px;
  font-family: "Montserrat", "san-serif";
  margin: 0;
  margin-bottom: 20px;
  letter-spacing: 3px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${ButtonContainerHeight};
  background-color: #d3c092;
  border-radius: 0 0 10px 10px;
  padding: ${horizontalPadding};
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-family: "Montserrat", "san-serif";
    box-sizing: border-box;
    font-weight: 500;
  }
`;

const LoginButton = styled.button`
  border: none;
  outline: none;
  background: ${(props) => (props.success ? "#11d111" : "#e9e8e3")};
  pointer-events: ${(props) => (props.success ? "none" : "auto")};
  color: #222;
  margin-right: 20px;

  transition: 0.2s;
  :hover {
    background: ${(props) => (props.success ? "#11d111" : "white")};
  }
`;

const CancelButton = styled.button`
  border: none;
  outline: none;
  background: none;
  color: #222;

  :hover {
    text-decoration: underline;
  }
`;

// Env variable for API
const { REACT_APP_API_URL } = process.env;

let firstRender = true;
const AdminModal = () => {
  // Iniitalize states
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);

  // Retreive states from AdminContext
  const { admin, modal } = useContext(AdminContext);
  const { modalOpen, setModalOpen } = modal;
  const { setIsAdmin } = admin;

  // firstRender prevents modal from appearing and disappearing when app is first opened. Modal only opens when it is prompted to open
  if (modalOpen) firstRender = false;

  // Login through auth route
  const login = (password) => {
    // Reset error message
    setErrorMsg(null);

    // Post request to auth route, takes in a password. If password is verified, api will send back new jwt, if not it will send back an error and error message
    api
      .post(`${REACT_APP_API_URL}/api/auth`, { password })
      .then((res) => {
        // If data is retreived, store received token to localstorage
        localStorage.setItem("token", res.data.token);

        // Set admin and success to true
        setIsAdmin(true);
        setSuccess(true);

        // Close modal after 1 second, allows admin to see the success message
        setTimeout(() => {
          setModalOpen(false);
          setSuccess(false);
        }, 1000);
      })
      .catch((err) => {
        // Reset password and display error message in 0.5 seconds
        setPassword("");
        setTimeout(() => {
          setErrorMsg(err.response.data.msg);
        }, 500);
      });
  };

  // Close modal and set password input to empty string
  const closeModal = () => {
    setPassword("");
    setModalOpen(false);
  };

  // Doesnt render the first time it is initialized. Prevents appearing and dissapearing bug
  if (!firstRender) {
    return (
      <AdminModalComp modalOpen={modalOpen} firstRender={firstRender}>
        <Backdrop onClick={() => closeModal(false)} />
        <AdminBox>
          <Container>
            <Title>admin login</Title>
            <Header>enter password</Header>
            {errorMsg !== "" && <ErrorMessage>{errorMsg}</ErrorMessage>}
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              onKeyPress={(e) => {
                if (e.key === "Enter") login(password);
              }}
            />
          </Container>
          <ButtonContainer>
            <LoginButton onClick={() => login(password)} success={success}>
              {success ? "Success" : "Login"}
            </LoginButton>
            <CancelButton onClick={() => closeModal(false)}>
              Cancel
            </CancelButton>
          </ButtonContainer>
        </AdminBox>
      </AdminModalComp>
    );
  }

  return null;
};

export default AdminModal;
