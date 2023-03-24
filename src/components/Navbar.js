import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { TimelineLite, Power3 } from "gsap";

import LanguagePicker from "./LanguagePicker";
import logoText from "../assets/text_logo.png";

const NavbarComp = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  padding: 30px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dfd9c9;
  z-index: 100;

  transition: top 0.3s;

  @media only screen and (max-width: 1200px) {
    height: 100px;
  }

  @media only screen and (max-width: 992px) {
    height: 90px;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  transition: transform 0.4s ease-out;
  transform: ${(props) =>
    props.navOpen ? "translateX(0)" : "translateX(100%)"};
`;

const Container = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 450px) {
    width: 80%;
  }
`;

const Title = styled.h1`
  position: relative;
  text-transform: uppercase;
  margin: 0;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 150px;
  }
`;

const Hamburger = styled.div`
  cursor: pointer;
  padding: 5px;
  margin-right: 9px;
  font-size: 18px;
  display: none;
  color: ${(props) => (props.navOpen ? "white" : "black")};
  @media only screen and (max-width: 600px) {
    display: block;
  }
  z-index: 150;
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  z-index: 150;

  @media only screen and (max-width: 600px) {
    position: absolute;
    top: 90px;
    right: 5%;
    display: ${(props) => (props.navOpen ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-end;
  }
`;

const NavItem = styled.li`
  font-size: 16px;
  text-transform: uppercase;
  padding: 5px;
  margin: 0 20px;
  font-weight: 500;
  cursor: pointer;

  transition: color 0.1s;

  &:hover {
    color: #d3c092;
  }

  @media only screen and (max-width: 1200px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 992px) {
    font-size: 14px;
    margin: 0 10px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 600px) {
    font-size: 20px;
    color: white;
    margin-bottom: 30px;
  }
`;

const Navbar = () => {
  // Initialize state
  const [navOpen, setNavOpen] = useState(false);

  // Initialize references
  let navbar = useRef(null);
  // let title = useRef(null);
  let burger = useRef(null);
  let about = useRef(null);
  let order = useRef(null);
  let bookSlot = useRef(null);
  let faq = useRef(null);
  let languagePicker = useRef(null);

  // Animation for nav items entering. Fade in from top.
  const navItemsEnter = () => {
    let tl = new TimelineLite();

    tl.staggerFrom(
      [about, order, bookSlot, faq, languagePicker],
      0.7,
      {
        y: -30,
        autoAlpha: 0,
        ease: Power3.easeOut,
      },
      0.2
    );

    return tl;
  };

  // Animation for hamburger icon. Fade in from top.
  const burgerEnter = () => {
    let tl = new TimelineLite({ delay: 0.2 });

    tl.from(burger, {
      y: -30,
      autoAlpha: 0,
      ease: Power3.easeOut,
      duration: 0.5,
    });

    return tl;
  };

  // Initialize animations after components are mounted
  useEffect(() => {
    navItemsEnter();
    burgerEnter();
  }, []);

  // Make navbar hide and appear based on scrolling
  useEffect(() => {
    // Set navbar top to 0px
    navbar.style.top = "0px";

    // Get navbar class
    const navbarClass = "." + navbar.getAttribute("class").split(" ").join(".");

    let lastScrollPosition = 0;
    window.addEventListener("scroll", () => {
      // Get navbar element
      const navbarDOM = document.querySelector(navbarClass);

      // Get position of top of screen, cross browser compatible
      let topOfScreenPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      // Make navbar stick until out of its height value
      if (topOfScreenPosition < navbarDOM.clientHeight) {
        navbarDOM.style.top = "0";

        // Get rid of shadow once it reaches 10px from top
        if (topOfScreenPosition < 10) {
          navbarDOM.style.boxShadow = "";
        }

        // Scrolling down
      } else if (topOfScreenPosition > lastScrollPosition) {
        // Set navbar over the screen
        navbarDOM.style.top = `-${navbarDOM.clientHeight}px`;
      } else {
        // Scrolling up
        // Set navbar on screen. Add box shadow
        navbarDOM.style.top = "0";
        navbarDOM.style.boxShadow = "0px 1px 15px 0px rgba(0, 0, 0, 0.1)";
      }
      lastScrollPosition = topOfScreenPosition;
    });
  }, [navbar]);

  // Close navbar after 100 ms
  const closeNavbar = () => {
    setTimeout(() => {
      setNavOpen(false);
    }, 100);
  };

  return (
    <NavbarComp ref={(el) => (navbar = el)}>
      <Container>
        <Link
          to="home"
          smooth={true}
          duration={1000}
          onClick={() => {
            closeNavbar();
          }}
        >
          <Title>
            <img src={logoText} alt="logoText" />
          </Title>
        </Link>

        <Hamburger
          onClick={() => setNavOpen(!navOpen)}
          navOpen={navOpen}
          ref={(el) => (burger = el)}
        >
          {navOpen ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </Hamburger>
        <Backdrop navOpen={navOpen} />
        <NavItems navOpen={navOpen}>
          <Link
            to="about"
            smooth={true}
            duration={1000}
            onClick={() => {
              closeNavbar();
            }}
          >
            <NavItem ref={(el) => (about = el)}>about</NavItem>
          </Link>
          <Link
            to="order"
            smooth={true}
            duration={1000}
            onClick={() => {
              closeNavbar();
            }}
          >
            <NavItem ref={(el) => (order = el)}>Order</NavItem>
          </Link>
          <Link
            to="bookslot"
            smooth={true}
            duration={1000}
            onClick={() => {
              closeNavbar();
            }}
          >
            <NavItem ref={(el) => (bookSlot = el)}>book slot</NavItem>
          </Link>
          <Link
            to="faq"
            smooth={true}
            duration={1000}
            onClick={() => {
              closeNavbar();
            }}
          >
            <NavItem ref={(el) => (faq = el)}>faq</NavItem>
          </Link>
          <LanguagePicker
            setNavOpen={setNavOpen}
            ref={(el) => (languagePicker = el)}
          />
        </NavItems>
      </Container>
    </NavbarComp>
  );
};

export default Navbar;
