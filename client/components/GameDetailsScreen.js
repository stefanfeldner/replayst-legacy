import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, ScrollView, View } from 'react-native';
import { fetchOne } from '../services/ApiClient';
import { DateTime } from 'luxon';
import UpdateCollection from './UpdateCollection';
import { UserContext } from './UserContext';
import { PALETTE } from '../services/theme';

export default function GameDetailsScreen(props) {
  const [game, setGame] = useState(null);

  const { owned, ownedIds, wishlist, wishIds, favorites, favsIds } =
    useContext(UserContext);

  const [pwnd, setPwned] = owned;
  const [whish, setWish] = wishlist;
  const [favs, setFavs] = favorites;

  // check if the games is in the collection and make the call accordingly
  const ownedMatch = ownedIds.some(id => id === props.route.params.id);
  const wishMatch = wishIds.some(id => id === props.route.params.id);
  const favMatch = favsIds.some(id => id === props.route.params.id);
  const source = ownedMatch || wishMatch || favMatch ? 'DB' : 'API';

  useEffect(() => {
    console.log(source);
    fetchOne(props.route.params.id, source).then(res => setGame(res));
  }, []);

  return (
    <View style={styles.container}>
      {!game ? (
        <Text style={{ color: 'white' }}>Loading...</Text>
      ) : (
        <ScrollView>
          <Image source={{ uri: game.background_image }} style={styles.image} />
          <View style={styles.buttons}>
            <UpdateCollection
              match={favMatch}
              game={game}
              list={'favorites'}
              setList={setFavs}
              addIcon={'ios-heart-outline'}
              removeIcon={'ios-heart'}
              //setGame={setGame} // TODO for platform ownership feature
            />
            <UpdateCollection
              match={wishMatch}
              game={game}
              list={'wishlist'}
              setList={setWish}
              addIcon={'ios-star-outline'}
              removeIcon={'ios-star'}
              //setGame={setGame} // TODO for platform ownership feature
            />
            <UpdateCollection
              match={ownedMatch}
              game={game}
              list={'owned'}
              setList={setPwned}
              addIcon={'ios-add-circle-outline'}
              removeIcon={'ios-checkmark-circle'}
              //setGame={setGame} // TODO for platform ownership feature
            />
          </View>
          {game.developers.map(dev => (
            <Text style={styles.textCol} key={dev.id}>
              {dev.name}
            </Text>
          ))}
          <Text style={[styles.title, styles.textCol]}>{game.name}</Text>
          {game.genres.map(genre => (
            <Text style={styles.textCol} key={genre.id}>
              {genre.name}
            </Text>
          ))}
          {game.platforms.map(p => (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.five,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    aspectRatio: 1.25
  },
  title: {
    fontSize: 24
  },
  textCol: {
    color: PALETTE.one
  },
  desc: {
    padding: 15
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
