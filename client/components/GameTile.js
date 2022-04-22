import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { memo } from 'react';

function GameTile({ game, ownedIds, setOwnedTiles }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('click');
        navigation.navigate('Details', {
          id: game.id,
          ownedIds: ownedIds,
          setOwnedTiles: setOwnedTiles
        });
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: game.background_image }} style={styles.tile} />
        <View style={styles.desc}>
          <Text style={styles.title}>{game.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(GameTile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  tile: {
    aspectRatio: 2,
    width: '90%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10
  },
  title: {
    fontSize: 18,
    padding: 10,
    color: 'rgb(222, 219, 214)'
  },
  desc: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'rgb(32, 21, 13)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});
