import { ShadowContainerProps } from "./ShadowContainer";
import styled, { css } from "styled-components";

const Container = styled.div<ShadowContainerProps>`
  ${({ width, height, margin, padding, bgColor }) => css`
    width: ${width || "100%"};
    max-width: 1728px;
    height: ${height || "100%"};
    background-color: var(--${bgColor}-color);
    border-radius: 50px;
    margin: ${margin || "0 auto 3em"};
    padding: ${padding || "3em"};
    border: 3px solid black;
    box-shadow: 12px 12px black;
  `}
`;

export { Container };
