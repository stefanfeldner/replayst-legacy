import { useContext } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { PALETTE } from '../services/theme';
import { UserContext } from './UserContext';

export default function GameListHeader() {
  const { owned, favorites, wishlist } = useContext(UserContext);
  const [coll] = owned;
  const [favs] = favorites;
  const [wish] = wishlist;

  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.text}>Collection</Text>
      </Pressable>
      <Pressable>
        <Text style={styles.text}>Favorites</Text>
      </Pressable>
      <Pressable>
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
