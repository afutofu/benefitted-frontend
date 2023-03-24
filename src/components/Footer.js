import React, { useContext } from "react";
import styled from "styled-components";

import { AdminContext } from "../contexts/AdminContext";

const FooterComp = styled.div`
  width: 100%;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #e7e3d7;
  /* border-top: 1px solid #d3c092; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  width: 90%;
  height: 100%;
  margin: 0 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  cursor: default;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 600px) {
    justify-content: space-between;
    font-size: 10px;
  }

  @media only screen and (max-width: 450px) {
    width: 80%;
  }

  i {
    position: absolute;
    right: 0px;
    color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const Footer = () => {
  // Retreive admin states from AdminContext
  const { admin, modal } = useContext(AdminContext);
  const { isAdmin } = admin;
  const { setModalOpen } = modal;

  return (
    <FooterComp>
      <Container>
        &#169; 2022 Benefitted. All rights reserved.
        {!isAdmin && (
          <i
            className="fas fa-sign-in-alt"
            onClick={() => setModalOpen(true)}
          ></i>
        )}
      </Container>
    </FooterComp>
  );
};

export default Footer;
