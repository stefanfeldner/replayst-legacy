import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../components/HomeScreen';
import GameDetailsScreen from '../GameDetailsScreen/GameDetailsScreen';
import SearchScreen from '../SearchScreen/SearchScreen';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchGameBar from '../../components/SearchGameBar';
import { useRef, useState } from 'react';
import { searchGamesFromAPI } from '../../services/ApiClient';

const HomeStack = createNativeStackNavigator();

function Home() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [nextSearchUrl, setNextSearchUrl] = useState('');
  let listViewRef = useRef();

  function handleOnSubmit() {
    searchGamesFromAPI(search).then((res) => {
      if (searchResults.length)
        listViewRef.current.scrollToOffset({ offset: 0, animated: true }); // flatlist auto-scroll to top
      // setTimout necessary cause searchGameBar renders in the same screen,
      // if deep in the infinite scoll it fires again before reaching the top of the bar.
      // TODO Better solution would be render each result list in a new screen
      //(no need to trigger scroll to top) and save search history on search page
      setTimeout(() => {
        setNextSearchUrl(res.next);
        setSearchResults(res.results);
        setSearch('');
      }, 100);
    });
  }

  return (
    <NavigationContainer independent={true}>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
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
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              nextSearchUrl={nextSearchUrl}
              setNextSearchUrl={setNextSearchUrl}
              // tiles={searchResults} // WARNING --> NEEDED A PROP NAME CHANGE
              // seTiles={setSearchResults} // --> SAME AS ABOVE (needed for infinite loop?)
              // nextUrl={nextSearchUrl} // --> SAME AS ABOVE
              // setNextUrl={setNextSearchUrl} // --> SAME AS ABOVE
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

export default Home;
