import { memo } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
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
    </SafeAreaView>
  );
}

export default memo(GameList);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
