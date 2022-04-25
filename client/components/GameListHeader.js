import { useContext } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { PALETTE } from '../services/theme';
import { UserContext } from './UserContext';

export default function GameListHeader() {
  const { owned, favorites, wishlist, rendered, toRender } =
    useContext(UserContext);
  const [renderedList, setRenderedList] = rendered;
  const [games, setToRender] = toRender;
  const [coll] = owned;
  const [favs] = favorites;
  const [wish] = wishlist;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          setToRender(coll);
          setRenderedList('owned');
        }}
      >
        <Text style={styles.text}>Collection</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setToRender(favs);
          setRenderedList('favorites');
        }}
      >
        <Text style={styles.text}>Favorites</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setToRender(wish);
          setRenderedList('wishlist');
        }}
      >
        <Text style={styles.text}>Wishlist</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  text: {
    color: PALETTE.one
  }
});
