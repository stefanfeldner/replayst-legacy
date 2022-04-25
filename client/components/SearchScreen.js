import { useState } from 'react';
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
  const [searchMore, setSearchMore] = useState(true);
  function infiniteScroll(url) {
    if (searchMore) {
      fetchMore(url).then((res) => {
        //console.log('another BATCH');
        res.next
          ? setSearchResults(
              (prev) => [...prev, ...res.results],
              setNextSearchUrl(res.next)
            )
          : setSearchResults((prev) => [...prev, ...res.results]);
        if (res.results.length < 40) setSearchMore(!searchMore);
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
