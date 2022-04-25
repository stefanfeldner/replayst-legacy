import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import GameList from './GameList';
import { UserContext } from './UserContext';
//import { fetchMore } from '../services/ApiClient';

export default function CollectionScreen() {
  const { toRender } = useContext(UserContext);
  const [tiles] = toRender;
  useEffect(() => {}, [tiles]);

  // TODO UNNECESSARY WOUT PAGINATION
  // function infiniteScroll(url) {
  //   fetchMore(url).then((res) =>
  //     setTiles((prev) => [...prev, ...res.results], setNextUrl(res.next))
  //   );
  // }

  return (
    <View style={styles.container}>
      {!tiles ? (
        <Text style={styles.testDesc}>Loading...</Text>
      ) : (
        <GameList style={styles.list} tiles={tiles} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#110d07',
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10
  },
  testDesc: {
    color: 'rgb(222, 219, 214)',
    fontSize: 18,
    marginHorizontal: 15
  },
  list: {
    marginTop: 50
  }
});
