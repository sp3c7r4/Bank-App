import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import Bank from './Tabs/Bank';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Card from './Tabs/Card'
import Transactions from './Tabs/Transactions';
import Settings from './Tabs/Settings';

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
      <Tab.Screen name="Cards" component={Card} options={{
        tabBarIcon: () => <Image source={require('./../assets/images/cards.png')} resizeMode="contain" style={{width: 30, height: 20}}/>,
      }}/>
      <Tab.Screen name="Transactions" component={Transactions} options={{
        tabBarBadge: 3,
        tabBarIcon: () => <Image source={require('./../assets/images/transactions.png')} resizeMode="contain" style={{width: 18, height: 20}}/>,
      }}/>
      <Tab.Screen name="Settings" component={Settings} options={{
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
