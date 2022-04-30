import { FlatList, StyleSheet, Text, View } from 'react-native';
import GameList from '../../components/GameList/GameList';
import { fetchMore } from '../../services/ApiClient';
import { Fontisto } from '@expo/vector-icons';
import { PALETTE } from '../../services/theme';
import { Game, SearchResultsInfiniteScrollRes } from '../../types/Game';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  searchResults: Game[];
  setSearchResults: Dispatch<SetStateAction<Game[]>>;
  nextSearchUrl: string | null;
  setNextSearchUrl: Dispatch<SetStateAction<string | null>>;
  listViewRef: React.MutableRefObject<FlatList<any> | undefined>;
}

function SearchScreen({
  searchResults,
  setSearchResults,
  nextSearchUrl,
  setNextSearchUrl,
  listViewRef,
}: Props) {
  // INFINITE SCROLL END OF API LIST-AWARE
  function infiniteScroll(url: string) {
    if (nextSearchUrl) {
      fetchMore(url).then((res: void | SearchResultsInfiniteScrollRes) => {
        if (!res) return;
        setSearchResults((prev: Game[]) => [...prev, ...res.results]);
        setNextSearchUrl(res.next);
      });
    }
  }

  return (
    <View style={styles.container}>
      {!searchResults.length ? (
        // <Text style={{ color: '#fff' }}>SEARCH LIST HERE</Text>
        <Fontisto name="search" size={150} color="#71797E" />
      ) : (
        <GameList
          tiles={searchResults}
          nextUrl={nextSearchUrl}
          infiniteScroll={infiniteScroll}
          listViewRef={listViewRef}
        />
      )}
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: PALETTE.six,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
