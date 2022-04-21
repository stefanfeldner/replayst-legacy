import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GameTile({ game }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Details', { id: game.id });
      }}
    >
      <View style={styles.container}>
        <Image source={{ url: game.background_image }} style={styles.tile} />
        <View style={styles.desc}>
          <Text style={styles.title}>
            {game.name}
            {game.id}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

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
