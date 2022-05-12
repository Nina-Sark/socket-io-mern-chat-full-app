import styled from "styled-components";

export const EmailVerifyContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Titan+One&display=swap");

  text-align: center;

  h1 {
    color: ${(props) => props.theme.secondaryAccentColor};
    font-size: 3.5em;
    font-family: "Titan One", cursive;
    margin-top : -55px;
    margin-bottom: 0.5em;
  }

  p {
      color : #fff;
      text-align: center;
      font-size : 1.2em;
  }

  @media screen and (max-width: 1000px) {
     h1 {
         font-size : 2.5em;
         margin-top : -100px;
     }

  }
`;

export const Title = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Parisienne&family=Titan+One&display=swap");

  color : #5B089C;
  font-family: "Parisienne", cursive;
`
