import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CollectionScreen from './CollectionScreen';
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

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Collection"
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
      >
        {() => <CollectionScreen tiles={tiles} ownedIds={ownedIds} />}
      </Tab.Screen>
      <Tab.Screen
        name="Home"
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
      >
        {/* {() => <HomeScreen ownedIds={ownedIds} setOwnedTiles={setOwnedTiles} />} */}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default Main;
