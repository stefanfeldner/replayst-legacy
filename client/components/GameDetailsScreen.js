import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, ScrollView, View } from 'react-native';
import { fetchOne } from '../services/ApiClient';
import { DateTime } from 'luxon';
import UpdateCollection from './UpdateCollection';

export default function GameDetailsScreen(props) {
  const [game, setGame] = useState(null);
  const { ownedIds, setOwnedTiles } = props.route.params;
  // check if the games is in the collection and make the call accordingly
  const match = ownedIds.some((id) => id === props.route.params.id);
  const source = match ? 'DB' : 'API';
  console.log(source);

  useEffect(() => {
    fetchOne(props.route.params.id, source).then((res) => setGame(res));
  }, []);

  return (
    <>
      {!game ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView style={styles.container}>
          <Image source={{ uri: game.background_image }} style={styles.image} />
          <UpdateCollection
            match={match}
            game={game}
            setGame={setGame}
            setOwnedTiles={setOwnedTiles}
          />
          {game.developers.map((dev) => (
            <Text style={styles.textCol} key={dev.id}>
              {dev.name}
              {dev.id}
            </Text>
          ))}
          <Text style={[styles.title, styles.textCol]}>{game.name}</Text>
          {game.genres.map((genre) => (
            <Text style={styles.textCol} key={genre.id}>
              {genre.name}
              {genre.id}
            </Text>
          ))}
          {game.platforms.map((p) => (
            <Text style={styles.textCol} key={p.id}>
              {p.name}
              {p.id}
            </Text>
          ))}
          <Text style={styles.textCol}>
            Release date: {DateTime.fromISO(game.released).toLocaleString()}
          </Text>
          <Text style={[styles.textCol, styles.desc]}>{game.description}</Text>
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
  },
  textCol: {
    color: 'rgb(222, 219, 214)'
  },
  desc: {
    padding: 15
  }
});
