import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GameList from './GameList';
import { getPopularGames, fetchMore } from '../services/ApiClient';

export default function HomeScreen({ ownedIds, setOwnedTiles }) {
  const [tiles, setTiles] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  useEffect(() => {
    getPopularGames()
      .then((res) => {
        setNextUrl(res.next);
        setTiles(res.results);
      })
      .then(console.log('\nUSE EFFETCT AND API CALL\n')); // TODO delete line
  }, []);

  function infiniteScroll(url) {
    fetchMore(url).then((res) =>
      setTiles((prev) => [...prev, ...res.results], setNextUrl(res.next))
    );
    // setState accepts a callback function as a 2nd argument that gets executed once the new state is set
  }

  return (
    <View style={styles.container}>
      {
        <GameList
          style={styles.list}
          tiles={tiles}
          infiniteScroll={infiniteScroll}
          nextUrl={nextUrl}
          ownedIds={ownedIds}
          setOwnedTiles={setOwnedTiles}
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
