import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PALETTE } from '../services/theme';
import { UserContext } from './UserContext';
import GameListHeaderButton from './GameListHeaderButton';

export default function GameListHeader() {
  const { owned, favorites, wishlist } = useContext(UserContext);

  const [coll] = owned;
  const [favs] = favorites;
  const [wish] = wishlist;

  return (
    <View style={styles.container}>
      <GameListHeaderButton
        list={coll}
        listName={'owned'}
        iconed={'safe-square-outline'}
        icon={'safe-square'}
      />
      <GameListHeaderButton
        list={favs}
        listName={'favorites'}
        iconed={'heart-outline'}
        icon={'heart'}
      />
      <GameListHeaderButton
        list={wish}
        listName={'wishlist'}
        iconed={'star-outline'}
        icon={'star'}
      />
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
