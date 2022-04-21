import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import GameList from './GameList';
import { getPopularGames, fetchMore } from '../services/ApiClient';

export default function HomeScreen() {
  const [games, setGames] = useState([]);
  const [nextUrl, setNextUrl] = useState('');

  useEffect(() => {
    // getPopularGames()
    //   .then((res) => {
    //     setNextUrl(res.next);
    //     setGames(res.results);
    //   })
    //   .then(console.log('\nUSE EFFETCT AND SERVER CALL\n')); // TODO delete line
  }, []);

  function infiniteScroll(url) {
    fetchMore(url).then((res) =>
      setGames((prev) => [...prev, ...res.results], setNextUrl(res.next))
    );
    // setState accepts a callback function as a 2nd argument that gets executed once the new state is set
  }

  return (
    <View style={styles.container}>
      {
        <GameList
          style={styles.list}
          games={games}
          infiniteScroll={infiniteScroll}
          nextUrl={nextUrl}
          setGames={setGames}
        />
      }

      {/* <Image source={{url: "https://media.rawg.io/media/games/283/283e7e600366b0da7021883d27159b27.jpg"}} style={styles.logo} />
      <Text style={styles.testDesc}>Hello, it's me. I don't know why words like from and with are blue in the tutorial. Maybe I need an extension.</Text>
      <TouchableOpacity
        onPress={() => alert('Yo-ho, yo-ho, a pirate life for me')}
        style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(24, 16, 9)',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  testDesc: {
    color: 'rgb(222, 219, 214)',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  list: {
    marginTop: 50,
  },
});
