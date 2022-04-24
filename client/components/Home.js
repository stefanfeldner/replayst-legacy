import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import GameDetailsScreen from './GameDetailsScreen';
import SearchScreen from './SearchScreen';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchGameBar from './SearchGameBar';
import { useRef, useState } from 'react';
import { searchGamesFromAPI } from '../services/ApiClient';

const HomeStack = createNativeStackNavigator();

function Home({ ownedIds, setOwnedTiles }) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [nextSearchUrl, setNextSearchUrl] = useState('');

  let listViewRef = useRef();

  function handleOnSubmit() {
    searchGamesFromAPI(search).then((res) => {
      setNextSearchUrl(res.next);
      setSearchResults(res.results);
      listViewRef.current.scrollToOffset({ offset: 0, animated: true }); // flatlist auto-scroll to top
      setSearch('');
    });
  }

  return (
    <NavigationContainer independent={true}>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          children={() => (
            <HomeScreen /*ownedIds={ownedIds} setOwnedTiles={setOwnedTiles}*/ />
          )}
          options={({ navigation }) => ({
            headerTintColor: '#dedbd6',
            headerStyle: { backgroundColor: '#20150d' },
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('SearchScreen')}>
                <Ionicons name="search" size={20} color="#dedbd6" />
              </Pressable>
            )
          })}
        />
        <HomeStack.Screen
          name="Details"
          component={GameDetailsScreen}
          options={{
            headerBackTitle: '',
            headerTintColor: '#dedbd6',
            headerStyle: { backgroundColor: '#20150d' }
          }}
        />
        <HomeStack.Screen
          name="SearchScreen"
          children={() => (
            <SearchScreen
              ownedIds={ownedIds}
              setOwnedTiles={setOwnedTiles}
              tiles={searchResults} // WARNING --> NEEDED A PROP NAME CHANGE
              nextUrl={nextSearchUrl} // --> SAME AS ABOVE
              setNextUrl={setNextSearchUrl} // --> SAME AS ABOVE
              listViewRef={listViewRef}
            />
          )}
          options={{
            headerBackTitle: '',
            headerTintColor: '#c8c6bf',
            headerStyle: { backgroundColor: '#20150d' },
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
