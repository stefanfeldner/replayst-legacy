import { useContext } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { PALETTE } from '../../services/theme';
import { UserContext } from '../UserContext/UserContext';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Game } from '../../types/Game';

interface Props {
  list: Game[];
  listName: String;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  iconed: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}

export default function GameListHeaderButton({
  list,
  listName,
  icon,
  iconed,
}: Props) {
  const { rendered, toRender } = useContext(UserContext);
  const [renderedList, setRenderedList] = rendered;
  const [games, setToRender] = toRender;

  const isToggled = renderedList === listName;

  return (
    <Pressable
      onPress={() => {
        if (!isToggled) {
          setToRender(list);
          setRenderedList(listName);
        }
      }}
    >
      <View
        style={[
          styles.image,
          { backgroundColor: isToggled ? PALETTE.four : PALETTE.five },
        ]}
      >
        <MaterialCommunityIcons
          name={isToggled ? icon : iconed}
          size={24}
          color={isToggled ? PALETTE.five : PALETTE.four}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 35,
    width: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: PALETTE.one,
    fontSize: 16,
  },
});
