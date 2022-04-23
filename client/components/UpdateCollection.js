import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { addGameToCollection } from '../services/DbClient';

// TODO handle the remove from collection case, with an alert for accidental press
export default function UpdateCollection({
  game,
  setGame,
  setOwnedTiles,
  match
}) {
  const [isAdded, setIsAdded] = useState(match);

  const userId = '6261e0b712592ddafe9b6aa2';
  return (
    <View style={styles.container}>
      <Pressable
        onPress={
          () =>
            !isAdded
              ? addGameToCollection(userId, game).then((res) => {
                  setGame(res.added); // logic ready for platform ownership feature
                  setIsAdded(!isAdded);
                  setOwnedTiles((prev) => [
                    ...prev,
                    {
                      _id: res.added._id,
                      background_image: res.added.background_image,
                      id: res.added.id,
                      name: res.added.name
                    }
                  ]);
                })
              : null // TODO logic for game deletion
        }
      >
        <Text style={styles.text}>{isAdded ? '-' : '+'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    padding: 10,
    width: '10%'
  },
  text: {
    color: 'rgb(222, 219, 214)',
    fontSize: 24
  }
});
