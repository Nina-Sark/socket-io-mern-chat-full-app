import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => (!props.direction ? "row" : props.direction)};
  align-items: ${(props) =>
    !props.alignItems ? "flex-start" : props.alignItems};
  justify-content: ${(props) =>
    !props.justifyContent ? "center" : props.justifyContent};
  gap: ${(props) => (!props.gap ? 0 : props.gap)};
  max-width: calc(100vh - 1550px);

  @media screen and (max-width: 1000px) {
      flex-direction: column;
      gap : 3em;
  }
`;
