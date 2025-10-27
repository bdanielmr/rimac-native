import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import PlanScreen from "../screens/PlanScreen";
import SummaryFinishScreen from "../screens/SummaryFinishScreen";

export type RootStack = {
  Home: undefined;
  SummaryFinish: { quoteId: string };
  Plans: undefined;
};

const Stack = createNativeStackNavigator<RootStack>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Plans" component={PlanScreen} />
        <Stack.Screen name="SummaryFinish" component={SummaryFinishScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
