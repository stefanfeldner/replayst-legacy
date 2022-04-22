import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GameList from './GameList';
import { getCollection, fetchMore } from '../services/ApiClient';

export default function HomeScreen() {
  const [games, setGames] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const userId = '6261e0b712592ddafe9b6aa2';
  useEffect(() => {
    // getCollection(userId)
    //   .then((res) => {
    //     setNextUrl(res.next); // TODO ONLY FOR PAGINATION, TO BE IMPLEMENTED ON THE BACKEND
    //     setGames(res.results);
    //   })
    //   .then(console.log('\nUSE EFFETCT AND BACKEND CALL\n')); // TODO delete line
  }, []);

  // TODO UNNECESSARY WOUT PAGINATION
  // function infiniteScroll(url) {
  //   fetchMore(url).then((res) =>
  //     setGames((prev) => [...prev, ...res.results], setNextUrl(res.next))
  //   );
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
