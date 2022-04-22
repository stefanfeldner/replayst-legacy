import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CollectionScreen from './CollectionScreen';
import { Button } from 'react-native';

const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
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
      <Tab.Screen name="Collection" component={CollectionScreen} />
    </Tab.Navigator>
  );
}

export default Main;
