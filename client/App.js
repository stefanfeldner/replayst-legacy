import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import GameDetails from './components/GameDetailsScreen';
import CollectionScreen from './components/CollectionScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
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
          ></Stack.Screen>
          <Stack.Screen name="Details" component={GameDetails}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer> */}
      <NavigationContainer>
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
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
