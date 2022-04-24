import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Collection from './Collection';
import { useState, useEffect } from 'react';
import { getUserCollection } from '../services/DbClient';

const Tab = createBottomTabNavigator();

function Main() {
  const [tiles, setOwnedTiles] = useState([]);
  const ownedIds = tiles && tiles.map((tile) => tile.id);

  const userId = '6261e0b712592ddafe9b6aa2';
  useEffect(() => {
    getUserCollection(userId).then((res) => {
      // setNextUrl(res.next); // TODO ONLY FOR PAGINATION, to eventually implement on the backend
      setOwnedTiles(res);
      console.log('MAIN');
    });
  }, []);

  console.log(process.env.API_KEY);

  return (
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
  );
}

export default Main;
