import React from "react";
import styled from "styled-components";

import order1 from "../assets/order1.jpg";
import order2 from "../assets/order2.jpg";
import order3 from "../assets/order3.jpg";
import order4 from "../assets/order4.jpg";
import order5 from "../assets/order5.jpg";

const OrderComp = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15vh 0;
  font-family: "Montserrat", "sans-serif";
`;

const Container = styled.div`
  position: relative;
  width: 50%;
  padding: 0 40px;
  padding-top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;

  @media only screen and (max-width: 1200px) {
    width: 50%;
    padding: 0 20px;
    padding-top: 100px;
  }

  @media only screen and (max-width: 600px) {
    width: 70%;
    padding: 0 20px;
    padding-top: 80px;
  }
`;

const Title = styled.h1`
  position: absolute;
  top: 50px;
  text-transform: uppercase;
  font-size: 60px;
  text-align: center;
  font-weight: 900;
  font-style: italic;
  z-index: 10;
  margin: 0;

  @media only screen and (max-width: 1200px) {
    top: 20px;
    font-size: 60px;
  }

  @media only screen and (max-width: 786px) {
    top: 30px;
    font-size: 50px;
  }

  @media only screen and (max-width: 600px) {
    top: 30px;
    font-size: 45px;
  }

  @media only screen and (max-width: 500px) {
    top: 30px;
    font-size: 40px;
  }

  @media only screen and (max-width: 400px) {
    top: 30px;
    font-size: 35px;
  }

  @media only screen and (max-width: 350px) {
    top: 35px;
    font-size: 30px;
  }

  @media only screen and (max-width: 300px) {
    top: 40px;
    font-size: 25px;
  }
`;

const Instructions = styled.ol`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;
`;

const Instruction = styled.li`
  margin: 0;
  margin-bottom: 30px;
  line-height: 1.5em;
  padding-left: 5px;
  font-size: 16px;

  @media only screen and (max-width: 1200px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 992px) {
    font-size: 12px;
    margin-bottom: 20px;
  }

  a {
    box-sizing: border-box;
    text-decoration: none;
    color: black;
    font-weight: 500;
    border-bottom: #d3c092 4px solid;

    :hover {
      border-bottom: #e2d6c0 4px solid;
    }
  }

  :last-child {
    margin: 0;
  }
`;

const Image = styled.img`
  width: 70%;
  margin-left: ${({ marginLeft }) => (marginLeft ? "auto" : "")};
  margin-bottom: ${({ noMargin }) => (noMargin ? "0" : "30px")};
`;

const Order = () => {
  return (
    <OrderComp id="order">
      <Title>How To Order</Title>
      <Container>
        <Instructions>
          <Instruction>
            Go to our instagram{" "}
            <a href="https://www.instagram.com/benefitted.id/" target="blank">
              @benefitted.id
            </a>
            .
          </Instruction>
          <Instruction>
            DM us your shoe type and what design you would like. If you don't
            have a design, you can ask for a theme. We will help make the design
            with you.
          </Instruction>
          <Image src={order1} alt="dm" />
          <Instruction>
            Once you are satisfied with our design, we can start discussing
            price.
          </Instruction>
          <Image src={order2} alt="dm" noMargin={true} />
          <Image src={order3} alt="dm" marginLeft={true} />
          <Instruction>
            You will receive an order form and start booking a slot. To book a
            slot, you will need to pay at least 50% of the price of your order.
          </Instruction>
          <Image src={order4} alt="dm" marginLeft={true} />
          <Instruction>
            Once transferred, send your shoe to our address a minimum of 3 days
            prior to slot date.
          </Instruction>
          <Instruction>
            We will send you a picture of after we have finished painting,
            ensuring you are satisfied with the quality. If you want changes in
            the design, you will have to pay accordingly.
          </Instruction>
          <Instruction>
            Once your payment is received, we will pack your shoe and send it
            off. We will send your tracking number (Nomor Resi). Will be sent
            H+1 after delivery.
          </Instruction>
          <Image src={order5} alt="dm" marginLeft={true} />
        </Instructions>
      </Container>
    </OrderComp>
  );
};

export default Order;
