import styled from "styled-components";

export const ForgotPasswordContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Titan+One&display=swap");

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10em;

  @media screen and (max-width: 1200px) {
    width: 89vw;
  }
`;

export const ForgotPasswordTitle = styled.h1`
  font-size: 2.5em;
  font-family: "Titan One", cursive;
  color: ${(props) => props.theme.primaryAccentColor};
  margin-bottom: 1em;
`;
