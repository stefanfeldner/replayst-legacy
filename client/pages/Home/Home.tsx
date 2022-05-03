import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../components/HomeScreen/HomeScreen';
import GameDetailsScreen from '../GameDetailsScreen/GameDetailsScreen';
import SearchScreen from '../SearchScreen/SearchScreen';
import { FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchGameBar from '../../components/SearchGameBar/SearchGameBar';
import { useRef, useState } from 'react';
import { searchGamesFromAPI } from '../../services/ApiClient';
import { Game, SearchResultType } from '../../types/Game';

const HomeStack = createNativeStackNavigator();

function Home() {
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [nextSearchUrl, setNextSearchUrl] = useState<string | null>('');
  let listViewRef = useRef<FlatList>();

  async function handleOnSubmit() {
    const results = await searchGamesFromAPI(search);
    if (searchResults.length && listViewRef.current) {
      listViewRef.current.scrollToOffset({ offset: 0, animated: true });
      
      setTimeout(() => {
        if (!results) return;
        setNextSearchUrl(results.next);
        setSearchResults(results.results);
        setSearch('');
      }, 100);
    }
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
            ),
          })}
        />
        <HomeStack.Screen
          name="Details"
          component={GameDetailsScreen}
          options={{
            headerBackTitle: '',
            headerTintColor: '#dedbd6',
            headerStyle: { backgroundColor: '#20150d' },
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
            ),
          }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default Home;
