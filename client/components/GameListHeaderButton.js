import { useContext } from 'react';
import { Pressable, Text, Image } from 'react-native';
import { UserContext } from './UserContext';

export default function GameListHeaderButton({ list, listName }) {
  const { rendered, toRender } = useContext(UserContext);
  const [renderedList, setRenderedList] = rendered;
  const [games, setToRender] = toRender;
  return (
    <Pressable
      onPress={() => {
        setToRender(list);
        setRenderedList(listName);
      }}
    >
      <Text style={{ color: 'white' }}>{listName}</Text>
      {/* <Image>{listName}</Image> */}
    </Pressable>
  );
}
