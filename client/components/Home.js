import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import GameDetailsScreen from './GameDetailsScreen';
import { Text } from 'react-native';
const HomeStack = createNativeStackNavigator();

function Home() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen}></HomeStack.Screen>
        {/* <HomeStack.Screen
          name="Details"
          component={GameDetailsScreen}
        ></HomeStack.Screen> */}
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

module.exports = Home;
