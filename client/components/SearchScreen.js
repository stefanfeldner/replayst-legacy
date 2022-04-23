import { useState } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-screens';

function SearchScreen() {
  const [tiles, setTiles] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
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
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        onChangeText={(text) => text}
        placeholder="Type Here..."
        value={search}
      />
      {
        <GameList
          style={styles.list}
          tiles={tiles}
          infiniteScroll={infiniteScroll}
          nextUrl={nextUrl}
          ownedIds={ownedIds}
        />
      }
    </View>
  );
}

module.exports = SearchScreen;
