import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import GameDetailsScreen from './GameDetailsScreen';
import { useNavigation } from '@react-navigation/native';
const HomeStack = createNativeStackNavigator();

function Home() {
  const navigation = useNavigation();
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          navigation={navigation}
        ></HomeStack.Screen>
        <HomeStack.Screen
          name="Details"
          component={GameDetailsScreen}
        ></HomeStack.Screen>
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

module.exports = Home;
