import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import GameDetailsScreen from './GameDetailsScreen';
import { Text } from 'react-native';
import CollectionScreen from './CollectionScreen';
const HomeStack = createNativeStackNavigator();

function Home() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen}></HomeStack.Screen>
        <HomeStack.Screen
          name="Details"
          component={GameDetailsScreen}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="Collection"
          component={CollectionScreen}
        ></HomeStack.Screen>
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

module.exports = Home;
