import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { fetchOne } from '../services/ApiClient';

export default function GameDetails({ id }) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetchOne(id).then((res) => setGame(res));
  }, []);

  return (
    <View>
      <Image source={{ url: game.background_image }} />
      {game.developers.map((dev) => (
        <Text key={dev.id}>{dev.name}</Text>
      ))}
      <Text>{game.name}</Text>
      {game.genres.map((genre) => (
        <Text key={genre.id}>{genre.name}</Text>
      ))}
      {game.platforms.map((p) => (
        <Text key={p.id}>{p.name}</Text>
      ))}
      <Text>Release date: {game.released}</Text>
      <Text>{game.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
