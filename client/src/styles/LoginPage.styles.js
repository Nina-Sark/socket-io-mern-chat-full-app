import styled from "styled-components"

export const Container = styled.div`
   background-color: #000;
   min-height : 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   padding : 5em;

   @media screen and (max-width: 800px) {
      padding : 3em;
   }
`