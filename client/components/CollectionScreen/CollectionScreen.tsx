import { useContext } from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import GameList from '../GameList/GameList';
import { UserContext } from '../UserContext/UserContext';
import { Game } from '../../types/Game';

export default function CollectionScreen() {
  const { toRender }: { toRender: [Game[], Function], } = useContext(UserContext);
  const [tiles] = toRender;
  
  return (
    <View style={styles.container}>
      {!tiles ? (
        <Text>Loading...</Text>
      ) : (
        <GameList tiles={tiles} isFromCollection={true} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#110d07',
  },
});
