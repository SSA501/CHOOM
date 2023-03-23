import { wrap } from "module";
import styled, { css } from "styled-components";

export interface ShadowContainerProps {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  bgColor?: string;
  children?: React.ReactNode;
  display?: string;
  flexWrap?: string;
  justifyContent?: string;
}

/**
 * css 추가해서 사용시
 * type ChildrenProp = {
    children: React.ReactNode;
  };
 * 
 * const CustomContainer = styled(ShadowContainer)<ChildrenProp>`
    커스텀할 css 내용
  `;
 */
export const ShadowContainer = styled.div<ShadowContainerProps>`
  ${({
    width,
    height,
    margin,
    padding,
    bgColor,
    display,
    flexWrap,
    justifyContent,
  }) => css`
    width: ${width || "100%"};
    max-width: 1728px;
    height: ${height || "100%"};
    background-color: var(--${bgColor}-color);
    border-radius: 50px;
    margin: ${margin || "0 auto 3em"};
    padding: ${padding || "3em"};
    border: 3px solid black;
    box-shadow: 12px 12px black;
    display: ${display};
    flex-wrap: ${flexWrap};
    justify-content: ${justifyContent};
  `}
`;
