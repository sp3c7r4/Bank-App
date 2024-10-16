import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import { Image, StyleSheet } from 'react-native';
import Bank from './Tabs/Bank';
import BottomSheet from './ScreenBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <GestureHandlerRootView>

    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,tabBarStyle: {
        elevation: 0, // Remove shadow on Android
        shadowOpacity: 0, // Remove shadow on iOS
        // borderTopWidth: 0, // Remove the border top shadow
      },
    }}>
      <Tab.Screen name="Home" component={Bank} options={{
        tabBarIcon: () => <Image source={require('./../assets/images/home_black.png')} style={{width: 20, height: 20}}/>,
      }}/>
      <Tab.Screen name="Cards" component={BottomSheet} options={{
        tabBarIcon: () => <Image source={require('./../assets/images/cards.png')} resizeMode="contain" style={{width: 30, height: 20}}/>,
      }}/>
      <Tab.Screen name="Transactions" component={LoginScreen} options={{
        tabBarIcon: () => <Image source={require('./../assets/images/transactions.png')} resizeMode="contain" style={{width: 18, height: 20}}/>,
      }}/>
      <Tab.Screen name="Settings" component={LoginScreen} options={{
        tabBarIcon: () => <Image source={require('./../assets/images/settings.png')} resizeMode="contain" style={{width: 20, height: 20}}/>,
      }}/>
    </Tab.Navigator>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  tab: {
    height: 20
  }
})
