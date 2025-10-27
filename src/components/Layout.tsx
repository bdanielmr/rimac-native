import React, { ReactNode } from "react";
import { Image, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

const HeaderContainer = styled.View<{ topInset: number }>`
  width: 100%;
  max-width: 1360px;
  padding: 0px 8%;
  padding-top: ${({ topInset } : any) => topInset}px;
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
  gap: 15px;
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
  margin-left: -10px;
`;

const StepperWrapper = styled.View`
  width: 100%;
  background-color: #edeffc;
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

const Footer = styled.View<{ bottomInset: number }>`
  border-top-width: 1px;
  border-top-color: #e5e7eb;
  background: #03050f;
  padding: 20px 11%;
  padding-bottom: ${({ bottomInset } : any) => Math.max(bottomInset + 20, 20)}px;
`;

const FooterContent = styled.View<{isMobile : any}>`
  max-width: 1360px;
  width: 100%;
  align-self: center;
  flex-direction: ${({ isMobile } : any) => (isMobile ? "row" : "column")};
  justify-content:  space-between;
  align-items: center;
`;

const Divider = styled.View`
  height: 1px;
  width: 100%;
  margin: 15px 0px;
  background-color: #2B304E;
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
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isMobile = width < 925;
  return (
    <Screen>
      {background}
      
      <HeaderContainer topInset={insets.top}>
        <Header>
          <HeaderLeft>
            <Logo
              source={require("../../assets/images/Logo.png")}
              resizeMode="contain"
            />
          </HeaderLeft>
          <HeaderRight>
            {!isMobile && <HeaderText>¡Compra por este medio!</HeaderText>}
            <Image
              source={require("../../assets/images/telephoneSolid.png")}
            />
            <PhoneText>(01) 411 6001</PhoneText>
          </HeaderRight>
        </Header>
      </HeaderContainer>

      {stepper && <StepperWrapper>{stepper}</StepperWrapper>}

      <ScrollContainer>
        <Container>
          <ContentWrapper>{children}</ContentWrapper>
        </Container>

        <Footer bottomInset={insets.bottom}>
          <FooterContent isMobile={!isMobile}>
            <FooterLogo
              source={require("../../assets/images/logo-white.png")}
              resizeMode="contain"
            />
            {isMobile && <Divider/>}
            <CopyrightText>© 2023 RIMAC Seguros y Reaseguros.</CopyrightText>
          </FooterContent>
        </Footer>
      </ScrollContainer>
    </Screen>
  );
}