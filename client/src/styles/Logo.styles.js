import styled from "styled-components";

export const LogoContainer = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Titan+One&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Parisienne&family=Titan+One&display=swap");

  text-align: center;
  padding: 4em;
  border-radius: 50%;
  box-shadow: 0 0 5px ${(props) => props.theme.primaryAccentColor},
    0 0 10px ${(props) => props.theme.primaryAccentColor},
    0 0 15px ${(props) => props.theme.primaryAccentColor},
    0 0 25px ${(props) => props.theme.primaryAccentColor};

  span:nth-child(1) {
    font-size: 6.5em;
    font-family: "Titan One", cursive;
    color: ${(props) => props.theme.primaryAccentColor};
  }

  span:last-child {
    font-family: "Parisienne", cursive;
    font-size: 5em;
    color: ${(props) => props.theme.secondaryAccentColor};
  }

  @media screen and (max-width: 1300px) and (min-width : 800px) {
    padding : 3em;

    span:nth-child(1) {
      font-size: 5.5em;
    }

    span:last-child {
      font-size: 4em;
    }
  }

  @media screen and (max-width: 800px) {
    padding : 2em;

    span:nth-child(1) {
      font-size: 4.5em;
    }

    span:last-child {
      font-size: 3em;
    }
  }
`;
