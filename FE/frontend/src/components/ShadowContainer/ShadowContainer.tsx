import React from "react";
import { Container } from "./style";

export interface ShadowContainerProps {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  bgColor?: string;
  children?: React.ReactNode;
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

function ShadowContainer({
  width,
  height,
  margin,
  padding,
  bgColor,
  children,
}: ShadowContainerProps) {
  return (
    <Container
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      bgColor={bgColor}
    >
      {children}
    </Container>
  );
}

export default ShadowContainer;
