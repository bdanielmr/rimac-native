import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Screen = styled.SafeAreaView`
  flex: 1;
  background: transparent;
`;

const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1 },
  showsVerticalScrollIndicator: false,
})``;

const Container = styled.View`
  flex: 1;
  width: 100%;
  max-width: 1360px;
  padding: 0px 5%;
  align-self: center;
  justify-content: space-between;
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

const Footer = styled.View`
  padding: 24px 0;
  border-top-width: 1px;
  border-top-color: #e5e7eb;
  background: #03050f;
  margin: 0 -16px;
  padding: 24px 16px;
`;

const FooterContent = styled.View`
  max-width: 1360px;
  width: 100%;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
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
}

export function Layout({ children, background }: LayoutProps) {
  return (
    <Screen>
      {background}
      <ScrollContainer>
        <Container>
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

          {children}

          <View style={{ height: 0 }} />
        </Container>
      </ScrollContainer>

      <Footer>
        <FooterContent>
          <FooterLogo
            source={require("../../assets/images/logo-white.png")}
            resizeMode="contain"
          />
          <CopyrightText>© 2023 RIMAC Seguros y Reaseguros.</CopyrightText>
        </FooterContent>
      </Footer>
    </Screen>
  );
}