import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { addGameToCollection } from '../services/ApiClient';

// TODO handle the remove from collection case, with an alert for accidental press
export default function UpdateCollection({ game, setGame }) {
  const [isAdded, setIsAdded] = useState(false);
  const userId = '6261e0b712592ddafe9b6aa2';
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          !isAdded
            ? addGameToCollection(userId, game).then((res) => {
                console.log(res.added);
                setGame(res.added, setIsAdded(!isAdded));
              })
            : null
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
