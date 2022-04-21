import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import GameTile from './GameTile';

export default function GameList({ games, infiniteScroll, nextUrl, setGames }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={games}
        initialNumToRender={8}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <GameTile game={item} />}
        maxToRenderPerBatch={8}
        onEndReached={() => {
          console.log('fired');
          // return infiniteScroll(nextUrl) //UNCOMMENT TO ACTIVATE INFINITE SCROLL
        }} // <-- when we call a function directly in JSX we need to put it in a callback function!!!
        onEndReachedThreshold={0}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
