import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import { Layout } from "../components/Layout";
import { RootStack } from "../navigation/AppNavigator";


export default function SummaryFinishScreen({
  route,
}: NativeStackScreenProps<RootStack, "SummaryFinish">) {
  const { quoteId } = route.params;

  return (
    <Layout>
      <Text>Quote ID: {quoteId}</Text>
    </Layout>
  );
}
