import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Collection from './Collection';
import { useState, useEffect, createContext } from 'react';
import { getUserCollection } from '../services/DbClient';

const Tab = createBottomTabNavigator();

export const UserContext = createContext();

function Main() {
  const [tiles, setOwnedTiles] = useState([]);
  const ownedIds = tiles && tiles.map((tile) => tile.id);

  // call user collection at loading, rerenders only on value change
  const userId = '6261e0b712592ddafe9b6aa2';
  useEffect(() => {
    getUserCollection(userId).then((res) => {
      // setNextUrl(res.next); // TODO ONLY FOR PAGINATION, to eventually implement on the backend
      setOwnedTiles(res);
      console.log('MAIN');
    });
  }, []);

  return (
    <UserContext.Provider value={[tiles, setOwnedTiles]}>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="CollectionTab"
          children={() => <Collection tiles={tiles} ownedIds={ownedIds} />}
          options={{
            tabBarStyle: { backgroundColor: 'rgb(222, 219, 214)' }
          }}
        />
        <Tab.Screen
          name="HomeTab"
          children={() => (
            <Home ownedIds={ownedIds} setOwnedTiles={setOwnedTiles} />
          )}
          options={{
            tabBarStyle: { backgroundColor: 'rgb(222, 219, 214)' }
          }}
        />
      </Tab.Navigator>
    </UserContext.Provider>
  );
}

export default Main;
