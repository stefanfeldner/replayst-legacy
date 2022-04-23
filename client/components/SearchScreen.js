import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameList from './GameList';

function SearchScreen({ ownedIds, setOwnedTiles, tiles, nextUrl, setNextUrl }) {
  const [searchMore, setSearchMore] = useState(true);

  function infiniteScroll(url) {
    if (searchMore) {
      fetchMore(url).then((res) => {
        setTiles((prev) => [...prev, ...res.results], setNextUrl(res.next));
        if (res.results.length < 40) setSearchMore(!searchMore);
      });
    }
    // setState accepts a callback function as a 2nd argument that gets executed once the new state is set
  }

  return (
    <View style={styles.container}>
      {!tiles.length ? (
        <Text style={{ color: '#fff' }}>SEARCH LIST HERE</Text>
      ) : (
        <GameList
          style={styles.list}
          tiles={tiles}
          infiniteScroll={infiniteScroll}
          nextUrl={nextUrl}
          ownedIds={ownedIds}
          setOwnedTiles={setOwnedTiles}
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
