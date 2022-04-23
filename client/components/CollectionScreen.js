import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import GameList from './GameList';
import { fetchMore } from '../services/ApiClient';

export default function CollectionScreen({ tiles, ownedIds }) {
  //const [nextUrl, setNextUrl] = useState(''); //TODO pagination
  //console.log('TILES', tiles);
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
      {
        <GameList
          style={styles.list}
          tiles={tiles}
          ownedIds={ownedIds}
          // infiniteScroll={infiniteScroll}
          // nextUrl={nextUrl}
        />
      }
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
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    marginTop: 10
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  list: {
    marginTop: 50
  }
});
