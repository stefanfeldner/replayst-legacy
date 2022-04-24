import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Collection from './Collection';
import { useEffect, useContext } from 'react';
import { getUserCollection } from '../services/DbClient';
import { UserContext, UserProvider } from './UserContext';
const Tab = createBottomTabNavigator();

function Main() {
  // const [tiles, setOwnedTiles] = useContext(UserContext);
  // const ownedIds = tiles && tiles.map((tile) => tile.id);

  // // call user collection at loading, rerenders only on value change
  // const userId = '6261e0b712592ddafe9b6aa2';
  // useEffect(() => {
  //   getUserCollection(userId).then((res) => {
  //     // setNextUrl(res.next); // TODO ONLY FOR PAGINATION, to eventually implement on the backend
  //     setOwnedTiles(res);
  //     console.log('MAIN');
  //   });
  // }, []);

  return (
    <UserProvider>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="CollectionTab"
          component={Collection}
          // children={() => <Collection /*tiles={tiles} ownedIds={ownedIds}*/ />}
          options={{
            tabBarStyle: { backgroundColor: 'rgb(222, 219, 214)' }
          }}
        />
        <Tab.Screen
          name="HomeTab"
          component={Home}
          // children={() => (
          //   <Home /*ownedIds={ownedIds} setOwnedTiles={setOwnedTiles}*/ />
          // )}
          options={{
            tabBarStyle: { backgroundColor: 'rgb(222, 219, 214)' }
          }}
        />
      </Tab.Navigator>
    </UserProvider>
  );
}

export default Main;
