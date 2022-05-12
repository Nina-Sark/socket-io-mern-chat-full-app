import styled from "styled-components";

export const FormContainer = styled.form`
  padding: 3em 2em;
  color: white;
  border-radius: 1rem;
  display : flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1000px) {
      width : 100vw;
      padding : 2.5em;
  }
`;

export const Input = styled.input`
  @import url("https://fonts.googleapis.com/css2?family=Parisienne&family=Raleway:wght@300&display=swap");

  width: 350px;
  padding: 0.5em 0.4em;
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 2px solid ${(props) => props.theme.primaryAccentColor};
  font-family: "Raleway", sans-serif;
  color: ${(props) => props.theme.primaryAccentColor};
  font-size : 1.1em;

  ::placeholder {
    color: ${(props) => props.theme.secondaryAccentColor};
  }

  :focus {
      border : none;
      box-shadow : 0 0 5px ${(props) => props.theme.primaryAccentColor},
      0 0 10px ${(props) => props.theme.primaryAccentColor};
  }

  @media screen and (max-width: 1000px) {
      width : 100%;
  }
`;

export const InputContainer = styled.div`
  margin-bottom: 1.4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap : 0.6em;
  width : 100%;
`

export const FormButton = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Parisienne&family=Raleway:wght@300&display=swap");

  width : 350px;
  padding : 0.5em 1em;
  border-radius: 0.4rem;
  background-color: ${(props) => props.bg};
  color : ${props => props.color};
  font-family: "Raleway", sans-serif;
  font-size : 1.3em;
  cursor: pointer;
  border: none;
  margin-top : 0.5em;
  outline: none;
  transition: background-color, color 0.1s;

  @media screen and (max-width: 1000px) {
      width : 100%;
  }

  :hover {
      background-color: ${props => props.hoverBg};
      color : ${props => props.hoverColor};
  }
`
export const Divider = styled.hr`
  margin : 1.3em 0;
  width : 100%;
  height : 1px;
  background-color: #fff;
  border : none;
`

export const HelperText = styled.small`
   color : ${props => props.theme.error};
`