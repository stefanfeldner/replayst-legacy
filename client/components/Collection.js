import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameDetailsScreen from './GameDetailsScreen';
import CollectionScreen from './CollectionScreen';
const CollectionStack = createNativeStackNavigator();

function Collection() {
  return (
    <NavigationContainer>
      <CollectionStack.Navigator>
        <CollectionStack.Screen
          name="Collection"
          component={CollectionScreen}
        ></CollectionStack.Screen>
        <CollectionStack.Screen
          name="Details"
          component={GameDetailsScreen}
        ></CollectionStack.Screen>
      </CollectionStack.Navigator>
    </NavigationContainer>
  );
}

module.exports = Collection;
