import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GameList from './GameList';
import { getCollection, fetchMore } from '../services/ApiClient';

export default function HomeScreen() {
  const [games, setGames] = useState([]);
  const [nextUrl, setNextUrl] = useState('');

  useEffect(() => {
    // getCollection('62615758b8b1a36468b51441')
    //   .then((res) => {
    //     setNextUrl(res.next);
    //     setGames(res.results);
    //   })
    //   .then(console.log('\nUSE EFFETCT AND SERVER CALL\n')); // TODO delete line
  }, []);

  // TODO UNNECESSARY WOUT PAGINATION, USEFUL FOR HUGE LISTS
  // function infiniteScroll(url) {
  //   fetchMore(url).then((res) =>
  //     setGames((prev) => [...prev, ...res.results], setNextUrl(res.next))
  //   );
  //   // setState accepts a callback function as a 2nd argument that gets executed once the new state is set
  // }

  return (
    <View style={styles.container}>
      {
        <GameList
          style={styles.list}
          games={games}
          // infiniteScroll={infiniteScroll}
          nextUrl={nextUrl}
          setGames={setGames}
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
