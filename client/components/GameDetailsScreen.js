import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, ScrollView, View } from 'react-native';
import { fetchOne } from '../services/ApiClient';
import { DateTime } from 'luxon';
import UpdateCollection from './UpdateCollection';
import { UserContext } from './UserContext';

export default function GameDetailsScreen(props) {
  const [game, setGame] = useState(null);

  const { ownedIds, wishIds, favsIds } = useContext(UserContext);
  // check if the games is in the collection and make the call accordingly

  const ownedMatch = ownedIds.some((id) => id === props.route.params.id);
  const wishMatch = wishIds.some((id) => id === props.route.params.id);
  const favMatch = favsIds.some((id) => id === props.route.params.id);
  const source = ownedMatch || wishMatch || favMatch ? 'DB' : 'API';

  useEffect(() => {
    console.log(source);
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
            match={ownedMatch}
            game={game}
            //setGame={setGame} // TODO for platform ownership feature
          />
          {game.developers.map((dev) => (
            <Text style={styles.textCol} key={dev.id}>
              {dev.name}
            </Text>
          ))}
          <Text style={[styles.title, styles.textCol]}>{game.name}</Text>
          {game.genres.map((genre) => (
            <Text style={styles.textCol} key={genre.id}>
              {genre.name}
            </Text>
          ))}
          {game.platforms.map((p) => (
            <Text style={styles.textCol} key={p.id}>
              {p.name}
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
