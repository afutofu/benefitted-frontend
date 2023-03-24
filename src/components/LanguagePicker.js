import React, { useContext, forwardRef } from "react";
import styled from "styled-components";

import { LanguageContext } from "../contexts/LanguageContext";

const LanguagePickerComp = styled.ul`
  padding: 0;
  list-style: none;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 500;
  display: flex;

  @media only screen and (max-width: 992px) {
    margin: 0 5px;
  }
`;

const LanguageOption = styled.li`
  position: relative;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 500;
  padding: 5px;
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

const Separator = styled.p`
  margin: 0 5px;
  display: flex;
  align-items: center;
  font-size: 16px;

  @media only screen and (max-width: 1200px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 992px) {
    font-size: 14px;
    margin: 0 2px;
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

const UnderlineWrapper = styled.div`
  position: absolute;
  bottom: 3px;
  width: calc(100% - 10px);
  height: 4px;
  overflow: hidden;
  opacity: ${(props) => (props.selected ? "1" : "0")};
`;

const Underline = styled.div`
  width: 100%;
  height: 100%;
  background-color: #d3c092;
`;

const LanguagePicker = forwardRef((props, ref) => {
  // Retreive state from LanguageContext
  const [language, setLanguage] = useContext(LanguageContext);

  // Close navbar after 200 ms
  const closeNavbar = () => {
    setTimeout(() => {
      props.setNavOpen(false);
    }, 200);
  };

  return (
    <LanguagePickerComp ref={ref}>
      <LanguageOption
        onClick={() => {
          setLanguage("english");
          if (language === "indonesian") {
            closeNavbar();
          }
        }}
      >
        en
        <UnderlineWrapper selected={language === "english"}>
          <Underline />
        </UnderlineWrapper>
      </LanguageOption>
      <Separator>/</Separator>
      <LanguageOption
        onClick={() => {
          setLanguage("indonesian");
          if (language === "english") {
            closeNavbar();
          }
        }}
      >
        id
        <UnderlineWrapper selected={language === "indonesian"}>
          <Underline />
        </UnderlineWrapper>
      </LanguageOption>
    </LanguagePickerComp>
  );
});

export default LanguagePicker;
