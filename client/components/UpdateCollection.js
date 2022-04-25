import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { addGameToCollection } from '../services/DbClient';
import { UserContext } from './UserContext';

// TODO handle the remove from collection case, with an alert for accidental press
export default function UpdateCollection({
  game,
  //setGame, // logic for platform ownership feature
  match
}) {
  const [isAdded, setIsAdded] = useState(match);
  const { owned } = useContext(UserContext);
  const [tiles, setOwnedTiles] = owned;

  const userId = '6266679c68159251ea6f845d'; //'6261e0b712592ddafe9b6aa2'; // TODO make it dynamic by user
  return (
    <View style={styles.container}>
      <Pressable
        onPress={
          () =>
            !isAdded
              ? addGameToCollection(userId, game).then((res) => {
                  // setGame(res.added); // logic ready for platform ownership feature
                  // console.log(res); // --> after a while it breaks by itself!
                  setIsAdded(!isAdded);
                  setOwnedTiles((prev) => [
                    {
                      _id: res.added._id,
                      background_image: res.added.background_image,
                      id: res.added.id,
                      name: res.added.name
                    },
                    ...prev
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
