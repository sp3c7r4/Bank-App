import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import LoginScreen from "./screens/LoginScreen";
import UserContextProvider from "./context/UserContext";
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TransferToMontreal from "./screens/Dashboard Components/TransferToMontreal";
import TabScreen from "./screens/TabScreen";
import Bank from "./screens/Tabs/Bank";
enableScreens();

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync("black");

export default function App() {
  const Stack = createNativeStackNavigator();
  const [loaded, error] = useFonts({
    "outfit": require("./assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "outfit-black": require("./assets/fonts/Outfit-Black.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <GestureHandlerRootView>
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Bank" component={Bank} />
            <Stack.Screen name="Tab" component={TabScreen} />
            <Stack.Screen options={{
              animation: "slide_from_bottom",
            }} name="ToBank" component={TransferToMontreal} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </GestureHandlerRootView>
  );
}
