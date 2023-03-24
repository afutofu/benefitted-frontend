import React, { useState, useEffect, useRef, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { TimelineLite, Power3 } from "gsap";
import axios from "axios";

import { LanguageContext } from "../contexts/LanguageContext";

import RippleSpinner from "./RippleSpinner";

const HomeComp = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Gallery = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 120px;
  background-color: #e7e3d7;
  overflow: hidden;
  z-index: 0;

  @media only screen and (max-width: 1200px) {
    margin-top: 100px;
  }

  @media only screen and (max-width: 992px) {
    margin-top: 90px;
  }
`;

const GalleryCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #e9e8e3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor:grab;
  overflow-x: scroll;
  scrollbar-width: none;
  padding-bottom: 20px;
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
  /* -webkit-overflow-scrolling: touch; */
`;

const Container = styled.div`
  width: 90%;
  height: 100%;
  padding: 35px 9px;
  padding-bottom: calc(35px - 20px);
  display: flex;
  /* flex-direction: column; */
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;

  @media only screen and (max-width: 450px) {
    width: 80%;
  }
`;

const MediaWrapper = styled.a`
  margin-right: 50px;
  /* pointer-events: ${(props) => props.isDown ? "none" : "auto"}; */
  /* pointer-events:none; */
`;

const Image = styled.img`
  width: 50vh;
  height: 50vh;
  background-color: #e2d6c0;

  transform-origin: center center;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.15);

  transition: box-shadow 0.2s;

  :hover {
    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.5);
  }

  @media only screen and (max-width: 600px) {
    width: 45vh;
    height: 45vh;
  }

  @media only screen and (max-width: 450px) {
    width: 35vh;
    height: 35vh;
  }
`;

const Video = styled.video`
  width: 50vh;
  height: 50vh;
  background-color: #e2d6c0;

  transform-origin: center center;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.15);

  transition: box-shadow 0.2s;

  :hover {
    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.5);
  }

  @media only screen and (max-width: 600px) {
    width: 45vh;
    height: 45vh;
  }

  @media only screen and (max-width: 450px) {
    width: 35vh;
    height: 35vh;
  }
`;

const Prompt = styled.div`
  width: 100px;
  padding-right: 50px;
  text-align: center;
  line-height: 1.5em;

  a {
    text-decoration: none;
    color: black;
    font-size: 16px;

    :hover {
      color: grey;
    }

    @media only screen and (max-width: 992px) {
      font-size: 14px;
    }
  }
`;

const upAndDown = keyframes`
    0% {
      transform: translateY(0);
    }
    10% {
      transform: translateY(5px);
    }
    20% {
      transform: translateY(8px);
    }
    25% {
      transform: translateY(-2px);
    }
    30% {
      transform: translateY(2px);
    }
    40%{
        transform: translateY(-1px);
    }
    50%,
    100% {
      transform: translateY(0px);
    }
  `;

const BottomArea = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    position: relative;
    font-size: 25px;
    /* animation: ${upAndDown} 2.5s infinite; */
    /* opacity: 0; */
    margin-right: 10px;

    @media only screen and (max-width: 992px) {
      font-size: 20px;
    }
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

  @media only screen and (max-width: 992px) {
    height: 70px;
  }
`;

// Initialize mouse movement variable
let isDown = false;
let startX;
let scrollLeft;
let isScrolling = false;

const Home = () => {
  // Retreive language from LanguageContext
  const [language] = useContext(LanguageContext);

  // Initialize references
  let galleryCover = useRef(null);
  let arrow = useRef(null);
  let galleryContainer = useRef(null);

  // Initialize states
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  // Animation to open gallery cover
  const openGallery = () => {
    let tl = new TimelineLite();

    tl.to(galleryCover.current, {
      y: "-100%",
      duration: 1,
      ease: Power3.easeOut,
    });

    return tl;
  };

  // Animation for prompt arrow
  const arrowEnter = () => {
    let tl = new TimelineLite({ delay: 0.5 });

    tl.to(arrow.current, {
      autoAlpha: 1,
      duration: 1,
    });

    return tl;
  };

  // Functions for mouse movements
  const onMouseDown = (e) =>{
    isDown = true;
    if (galleryContainer.current === null) return;
    startX = e.pageX - galleryContainer.current.offsetLeft;
    scrollLeft = galleryContainer.current.scrollLeft;
  }

  const onMouseLeave = (e) =>{
    setTimeout(()=>{
      isDown = false;
      isScrolling = false;
    },10)
    e.preventDefault();
    e.stopPropagation();
  }

  const onMouseMove = (e) =>{
    if (!isDown) return;
    if (galleryContainer.current === null) return;
    isScrolling = true
    e.preventDefault();
    const x = e.pageX - galleryContainer.current.offsetLeft;
    const walk = (x - startX) * 2 // Scroll speed
    galleryContainer.current.scrollLeft = scrollLeft - walk;
  }

  // Retreive posts from API
  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => {
        // Set posts immediately after retreiving data
        setPosts([...res.data]);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      // Open gallery cover and arrow animation 1s after setting posts. Allows images to fully load before gallery opens
      setTimeout(() => {
        setTimeout(() => {
          arrowEnter();
          openGallery();
        }, 200);
        setPostsLoading(false);
      }, 2500);
    }
  }, [posts.length]);

  return (
    <HomeComp id="home">
      <Gallery>
        <GalleryCover ref={galleryCover}>
          {postsLoading && <RippleSpinner />}
        </GalleryCover>
        <ContainerWrapper ref={galleryContainer} 
          onMouseDown={(e) => onMouseDown(e)} 
          onMouseLeave={(e)=>onMouseLeave(e)} 
          onMouseUp={onMouseLeave}
          onMouseMove={(e)=>onMouseMove(e)}>
          <Container >
            {posts.map((post, i) => {
              if (post.media_type === "VIDEO") {
                return (
                  <MediaWrapper
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e=> isScrolling && e.preventDefault()}
                  >
                    <Video autoplay={true}>
                      <source src={post.media_url} type="video/mp4" />
                    </Video>
                  </MediaWrapper>
                );
              }

              return (
                <MediaWrapper
                  key={i}
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={e=> isScrolling && e.preventDefault()}
                >
                  <Image key={post.id} src={post.media_url} />
                </MediaWrapper>
              );
            })}
            <Prompt>
              <a
                href="https://www.instagram.com/benefitted.id/"
                target="_blank"
                rel="noreferrer"
              >
                {language === "english"
                  ? "Check our instagram for more!"
                  : "Lihat instagram kami untuk melihat yang lain!"}
              </a>
            </Prompt>
          </Container>
        </ContainerWrapper>
      </Gallery>
      <BottomArea>
        <i className="fab fa-instagram"></i>
        <a
          href="https://www.instagram.com/benefitted.id/"
          target="_blank"
          rel="noreferrer"
        >
          @benefitted.id
        </a>
      </BottomArea>
    </HomeComp>
  );
};

export default Home;
