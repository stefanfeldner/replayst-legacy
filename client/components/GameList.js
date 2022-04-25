import { memo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Pressable,
  Text
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PALETTE } from '../services/theme';
import GameListHeader from './GameListHeader';
import GameTile from './GameTile';

function GameList({
  tiles,
  infiniteScroll,
  nextUrl,
  listViewRef,
  isFromCollection
}) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tiles}
        ref={listViewRef}
        initialNumToRender={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <GameTile game={item} />}
        maxToRenderPerBatch={3}
        onEndReached={() => {
          console.log('fired');
          if (nextUrl) return infiniteScroll(nextUrl); //UNCOMMENT TO ACTIVATE INFINITE SCROLL
        }} // <-- when we call a function directly in JSX we need to put it in a callback function!!!
        onEndReachedThreshold={0.1} // TODO check how many times it gets fired with the active infinite scroll
        ListHeaderComponent={isFromCollection ? GameListHeader : null}
      />
      <View style={styles.buttons}>
        <Pressable>
          <MaterialIcons name="add" size={26} color={PALETTE.three} />
        </Pressable>
        <Pressable>
          <MaterialIcons name="remove" size={26} color={PALETTE.three} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default memo(GameList);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons: {
    justifyContent: 'space-between',
    alignContent: 'center',
    position: 'absolute',
    backgroundColor: PALETTE.five,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
    paddingVertical: 12,
    right: 22,
    bottom: 24
  },
  plusButton: {
    color: PALETTE.three
  },
  minusBUtton: {
    color: PALETTE.three
  }
});
