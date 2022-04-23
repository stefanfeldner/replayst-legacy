import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameDetailsScreen from './GameDetailsScreen';
import CollectionScreen from './CollectionScreen';

const CollectionStack = createNativeStackNavigator();

function Collection({ tiles, ownedIds }) {
  return (
    <CollectionStack.Navigator>
      <CollectionStack.Screen
        name="Collection"
        children={() => <CollectionScreen tiles={tiles} ownedIds={ownedIds} />}
      ></CollectionStack.Screen>
      <CollectionStack.Screen
        name="Details"
        component={GameDetailsScreen}
        options={{ headerBackTitle: '' }}
      ></CollectionStack.Screen>
    </CollectionStack.Navigator>
  );
}

module.exports = Collection;
