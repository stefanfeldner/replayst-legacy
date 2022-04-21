import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { fetchOne } from '../services/ApiClient';
import { DateTime } from 'luxon';

export default function GameDetails(props) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetchOne(props.route.params.id).then((res) => setGame(res));
  }, []);

  return (
    <>
      {!game ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView>
          <Image source={{ url: game.background_image }} style={styles.image} />
          {game.developers.map((dev) => (
            <Text key={dev.id}>{dev.name}</Text>
          ))}
          <Text style={styles.title}>{game.name}</Text>
          {game.genres.map((genre) => (
            <Text key={genre.id}>{genre.name}</Text>
          ))}
          {game.platforms.map((p) => (
            <Text key={p.id}>{p.name}</Text>
          ))}
          <Text>
            Release date: {DateTime.fromISO(game.released).toLocaleString()}
          </Text>
          <Text>{game.description}</Text>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32, 21, 13)'
  },
  image: {
    width: '100%',
    aspectRatio: 1.25
  },
  title: {
    fontSize: 24
  }
});
