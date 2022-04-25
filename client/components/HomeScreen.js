import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import GameList from './GameList';
import { getPopularGames, fetchMore } from '../services/ApiClient';

export default function HomeScreen() {
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

  //TODO modify infinite scroll to be list-length aware
  function infiniteScroll(url) {
    fetchMore(url).then((res) =>
      setTiles((prev) => [...prev, ...res.results], setNextUrl(res.next))
    );
    // setState accepts a callback function as a 2nd argument that gets executed once the new state is set
  }

  return (
    <View style={styles.container}>
      {!tiles ? (
        <Text style={styles.testDesc}>Loading...</Text>
      ) : (
        <GameList
          style={styles.list}
          tiles={tiles}
          infiniteScroll={infiniteScroll}
          nextUrl={nextUrl}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#110d07',
    flex: 1,
    justifyContent: 'center'
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
