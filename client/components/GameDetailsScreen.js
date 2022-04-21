import { useEffect } from 'react';
import { View } from 'react-native';
import { fetchOne } from '../services/ApiClient';

export default function GameDetails({ id }) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetchOne(id).then((res) => {});
  });

  return <View></View>;
}
