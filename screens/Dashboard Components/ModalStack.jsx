import { View, Button, StyleSheet,Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function ScreenA({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text>Screen A</Text>
      <Button title="Go to Screen B" onPress={() => navigation.navigate('ScreenB')} />
    </View>
  );
}

function ScreenB() {
  return (
    <View style={styles.screen}>
      <Text>Screen B</Text>
    </View>
  );
}

export default function ModalStack() {
  return (
    <Stack.Navigator screenOptions={{
    }}>
      <Stack.Screen name="ScreenAs" component={ScreenA} />
      <Stack.Screen name="ScreenB" component={ScreenB} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheetBackground: {
    backgroundColor: '#fff',
  },
});