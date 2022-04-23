import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import GameDetailsScreen from './GameDetailsScreen';

const HomeStack = createNativeStackNavigator();

function Home({ ownedIds, setOwnedTiles }) {
  return (
    <NavigationContainer independent={true}>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          children={() => (
            <HomeScreen ownedIds={ownedIds} setOwnedTiles={setOwnedTiles} />
          )}
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
