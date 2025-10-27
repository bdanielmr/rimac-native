import React from "react";
import styled from "styled-components/native";
import { useBreakpoint } from "../theme/responsive";

const Container = styled.View`
  flex: 1;
  width: 100%;
  gap: 32px;
  justify-content: center;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  gap: 180px;
  flex-wrap: nowrap;
  width: 100%;
  max-width: 1136px;
  align-items: flex-start;
`;

const ColLeft = styled.View`
  width: 480px;
  flex-shrink: 0;
`;

const ColRight = styled.View`
  width: 352px;
  flex-shrink: 0;
`;

const MobileContainer = styled.View`
  width: 100%;
  gap: 10px;
  padding: 0 4px;
`;

interface GridProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}
export function Grid({ left, right, top, bottom }: GridProps) {
  const { isMobile } = useBreakpoint();

  if (isMobile) {
    return (
      <MobileContainer>
        {top}
        {bottom}
      </MobileContainer>
    );
  }

  return (
    <Container>
      <Row>
        <ColLeft>{left}</ColLeft>
        <ColRight>{right}</ColRight>
      </Row>
    </Container>
  );
}