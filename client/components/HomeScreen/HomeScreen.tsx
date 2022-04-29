import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import GameList from '../GameList/GameList';
import { getPopularGames, fetchMore } from '../../services/ApiClient';
import { Game } from '../../types/Game';

export default function HomeScreen() {
  const [tiles, setTiles] = useState<Game[]>([]);
  const [nextUrl, setNextUrl] = useState<string>('');

  useEffect(() => {
    getPopularGames().then((res) => {
      // res.next && results only available on Explore page
      if (res && res.next) {
        setNextUrl(res.next);
        setTiles(res.results);
      }
    });
  }, []);

  //TODO modify infinite scroll to be list-length aware
  function infiniteScroll(url: string) {
    if (nextUrl) {
      fetchMore(url).then((res) => {
        if (res) {
          setTiles((prev) => [...prev, ...res.results]);
          setNextUrl(res.next)
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      {!tiles ? (
        <Text>Loading...</Text>
      ) : (
        <GameList
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
    justifyContent: 'center',
  }
});
