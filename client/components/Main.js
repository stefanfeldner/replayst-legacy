import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Collection from './Collection';
import { Button } from 'react-native';
import { useState, useEffect } from 'react';
import { getUserCollection } from '../services/ApiClient';

const Tab = createBottomTabNavigator();

function Main() {
  const [tiles, setOwnedTiles] = useState([]);
  const ownedIds = tiles.map((tile) => tile.id);

  const userId = '6261e0b712592ddafe9b6aa2';
  useEffect(() => {
    getUserCollection(userId).then((res) => {
      // setNextUrl(res.next); // TODO ONLY FOR PAGINATION, TO BE IMPLEMENTED ON THE BACKEND
      setOwnedTiles(res);
    });
  }, []);
  console.log('IDS from main', ownedIds);

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="CollectionTab"
        children={() => <Collection tiles={tiles} ownedIds={ownedIds} />}
        options={{
          headerTintColor: '#20150d',
          tabBarStyle: { backgroundColor: 'rgb(222, 219, 214)' },
          headerStyle: { backgroundColor: 'rgb(222, 219, 214)' },
          headerRight: () => (
            <Button
              onPress={() => alert('working!')}
              title="But"
              color="#000"
            />
          )
        }}
      />
      <Tab.Screen
        name="HomeTab"
        children={() => (
          <Home ownedIds={ownedIds} setOwnedTiles={setOwnedTiles} />
        )}
        options={{
          headerTintColor: '#20150d',
          tabBarStyle: { backgroundColor: 'rgb(222, 219, 214)' },
          headerStyle: { backgroundColor: 'rgb(222, 219, 214)' },
          headerRight: () => (
            <Button
              onPress={() => alert('working!')}
              title="But"
              color="#000"
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
