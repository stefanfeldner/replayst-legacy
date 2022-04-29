import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../pages/Home/Home';
import Collection from '../../pages/Collection/Collection';
import { UserProvider } from '../UserContext';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE } from '../../services/theme';
const Tab = createBottomTabNavigator();

function Main() {
  return (
    <UserProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'My Collection') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Explore') {
              iconName = focused
                ? 'ios-game-controller'
                : 'ios-game-controller-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: PALETTE.four,
          tabBarInactiveTintColor: PALETTE.four,
          tabBarActiveBackgroundColor: PALETTE.five,
          tabBarInactiveBackgroundColor: PALETTE.five,
          initialRouteName: 'My Collection',
          headerShown: false
        })}
      >
        <Tab.Screen name="My Collection" component={Collection} />
        <Tab.Screen name="Explore" component={Home} />
      </Tab.Navigator>
    </UserProvider>
  );
}

export default Main;
