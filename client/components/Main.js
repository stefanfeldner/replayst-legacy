import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Collection from './Collection';
import { UserProvider } from './UserContext';
const Tab = createBottomTabNavigator();

function Main() {
  return (
    <UserProvider>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="CollectionTab"
          component={Collection}
          options={{
            tabBarStyle: { backgroundColor: 'rgb(222, 219, 214)' }
          }}
        />
        <Tab.Screen
          name="HomeTab"
          component={Home}
          options={{
            tabBarStyle: { backgroundColor: 'rgb(222, 219, 214)' }
          }}
        />
      </Tab.Navigator>
    </UserProvider>
  );
}

export default Main;
