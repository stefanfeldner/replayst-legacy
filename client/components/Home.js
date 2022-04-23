import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import GameDetailsScreen from './GameDetailsScreen';
import SearchScreen from './SearchScreen';
import { Button } from 'react-native';
import SearchGameBar from './SearchGameBar';
import { useState } from 'react';

const HomeStack = createNativeStackNavigator();

function Home({ ownedIds, setOwnedTiles }) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function handleOnSubmit() {}

  return (
    <NavigationContainer independent={true}>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          children={() => (
            <HomeScreen ownedIds={ownedIds} setOwnedTiles={setOwnedTiles} />
          )}
          options={({ navigation }) => ({
            headerTintColor: '#20150d',
            tabBarStyle: { backgroundColor: 'rgb(222, 219, 214)' },
            headerStyle: { backgroundColor: 'rgb(222, 219, 214)' },
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('SearchScreen')}
                title="But"
                color="#000"
              />
            )
          })}
        />
        <HomeStack.Screen
          name="Details"
          component={GameDetailsScreen}
          options={{ headerBackTitle: '' }}
        />
        <HomeStack.Screen
          name="SearchScreen"
          children={() => (
            <SearchScreen
              ownedIds={ownedIds}
              setOwnedTiles={setOwnedTiles}
              search={search}
            />
          )}
          options={{
            headerBackTitle: '',
            headerTitle: () => (
              <SearchGameBar
                search={search}
                setSearch={setSearch}
                setSearchResults={setSearchResults}
                handleOnSubmit={handleOnSubmit}
              />
            )
          }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

module.exports = Home;
