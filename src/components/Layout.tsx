import React, { ReactNode } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Screen = styled.View`
  flex: 1;
  background: white;
`;

const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1 },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

const HeaderContainer = styled.View`
  width: 100%;
  max-width: 1360px;
  padding: 0px 8%;
  align-self: center;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Logo = styled.Image`
  width: 73px;
  height: 36px;
`;

const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const HeaderText = styled.Text`
  color: #03050f;
  font-size: 12px;
  font-weight: 700;
`;

const PhoneText = styled.Text`
  color: #03050f;
  font-size: 18px;
  font-weight: 700;
`;

const StepperWrapper = styled.View`
  width: 100%;
  background-color: #EDEFFC;
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  max-width: 1360px;
  padding: 0px 8%;
  align-self: center;
`;

const ContentWrapper = styled.View`
  flex: 1;
`;

const Footer = styled.View`
  border-top-width: 1px;
  border-top-color: #e5e7eb;
  background: #03050f;
  padding: 24px 8%;
`;

const FooterContent = styled.View`
  max-width: 1360px;
  width: 100%;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FooterLogo = styled.Image`
  width: 85px;
  height: 42px;
`;

const CopyrightText = styled.Text`
  color: #ffffff;
  font-size: 14px;
`;

interface LayoutProps {
  children: ReactNode;
  background?: ReactNode;
  stepper?: ReactNode;
}

export function Layout({ children, background, stepper }: LayoutProps) {
  return (
    <Screen>
      {background}
      
      <HeaderContainer>
        <Header>
          <HeaderLeft>
            <Logo
              source={require("../../assets/images/Logo.png")}
              resizeMode="contain"
            />
          </HeaderLeft>
          <HeaderRight>
            <HeaderText>¡Compra por este medio!</HeaderText>
            <Text style={{ fontSize: 20 }}>📞</Text>
            <PhoneText>(01) 411 6001</PhoneText>
          </HeaderRight>
        </Header>
      </HeaderContainer>

      {stepper && <StepperWrapper>{stepper}</StepperWrapper>}

      <ScrollContainer>
        <Container>
          <ContentWrapper>{children}</ContentWrapper>
        </Container>

        <Footer>
          <FooterContent>
            <FooterLogo
              source={require("../../assets/images/logo-white.png")}
              resizeMode="contain"
            />
            <CopyrightText>© 2023 RIMAC Seguros y Reaseguros.</CopyrightText>
          </FooterContent>
        </Footer>
      </ScrollContainer>
    </Screen>
  );
}