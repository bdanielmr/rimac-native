import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";


export type RootStack = {
  Home: undefined;
  Result: { quoteId: string };
};

const Stack = createNativeStackNavigator<RootStack>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={()=><></>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
