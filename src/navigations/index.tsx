import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Routes from "../models/routes";
import screens from "../screens";

export type RootStackParamList = {
  [Routes.NAV_TERMINAL_SCREEN]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={Routes.NAV_TERMINAL_SCREEN}>
        <RootStack.Screen
          name={Routes.NAV_TERMINAL_SCREEN}
          component={screens.TerminalScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
