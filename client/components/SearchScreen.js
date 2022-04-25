import { StyleSheet, Text, View } from 'react-native';
import GameList from './GameList';
import { fetchMore } from '../services/ApiClient';

function SearchScreen({
  searchResults,
  setSearchResults,
  nextSearchUrl,
  setNextSearchUrl,
  listViewRef
}) {
  // INFINITE SCROLL END OF API LIST-AWARE
  function infiniteScroll(url) {
    if (nextSearchUrl) {
      fetchMore(url).then(res => {
        setSearchResults(
          prev => [...prev, ...res.results],
          setNextSearchUrl(res.next)
        );
      });
    }
  }

  return (
    <View style={styles.container}>
      {!searchResults.length ? (
        <Text style={{ color: '#fff' }}>SEARCH LIST HERE</Text>
      ) : (
        <GameList
          style={styles.list}
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
    backgroundColor: 'rgb(24, 16, 9)',
    flex: 1,
    justifyContent: 'center'
  },
  list: {
    marginTop: 50
  }
});
