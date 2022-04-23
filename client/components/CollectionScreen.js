import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import GameList from './GameList';
import { fetchMore } from '../services/ApiClient';

export default function CollectionScreen({ tiles, ownedIds }) {
  //const [nextUrl, setNextUrl] = useState(''); //TODO pagination
  //console.log('IDS', ownedIds);

  useEffect(() => {}, [tiles]);

  // TODO UNNECESSARY WOUT PAGINATION
  // function infiniteScroll(url) {
  //   fetchMore(url).then((res) =>
  //     setTiles((prev) => [...prev, ...res.results], setNextUrl(res.next))
  //   );
  // }

  return (
    <View style={styles.container}>
      {!tiles ? (
        <Text style={styles.testDesc}>Loading...</Text>
      ) : (
        <GameList
          style={styles.list}
          tiles={tiles}
          ownedIds={ownedIds}
          // infiniteScroll={infiniteScroll}
          // nextUrl={nextUrl}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(24, 16, 9)',
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10
  },
  testDesc: {
    color: 'rgb(222, 219, 214)',
    fontSize: 18,
    marginHorizontal: 15
  },
  list: {
    marginTop: 50
  }
});
