import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  addGameToCollection,
  removeFromCollection
} from '../services/DbClient';
//import { UserContext } from './UserContext';
import { Ionicons } from '@expo/vector-icons';

// TODO handle the remove from collection case, with an alert for accidental press
export default function UpdateCollection({
  game,
  //setGame, // logic for platform ownership feature
  match,
  setList,
  list,
  addIcon,
  removeIcon
}) {
  const [isAdded, setIsAdded] = useState(match);
  //const { owned } = useContext(UserContext); pass it from the parent for dynamic behaviour
  //const [tiles, setOwnedTiles] = owned;

  const userId =
    /* vic: '6266679c68159251ea6f845d';  filo:*/ '6261e0b712592ddafe9b6aa2'; // TODO make it dynamic by user
  return (
    <View style={styles.container}>
      <Pressable
        onPress={
          () =>
            !isAdded
              ? addGameToCollection(userId, game, list).then((res) => {
                  // setGame(res.added); // logic ready for platform ownership feature
                  // console.log(res); // --> after a while it breaks by itself!
                  setIsAdded(!isAdded);
                  setList((prev) => [
                    {
                      _id: res.added._id,
                      background_image: res.added.background_image,
                      id: res.added.id,
                      name: res.added.name
                    },
                    ...prev
                  ]);
                })
              : removeFromCollection(userId, game._id, list).then((res) => {
                  setIsAdded(!isAdded);
                  console.log(res);
                  setList((prev) => prev.filter((game) => game._id !== res.id));
                }) // TODO logic for game deletion
        }
      >
        {isAdded ? (
          <Ionicons name={removeIcon} size={28} color="#e9e7e3" />
        ) : (
          <Ionicons name={addIcon} size={28} color="#c8c6bf" />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  }
});
