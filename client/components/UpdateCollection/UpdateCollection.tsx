import { useState, useContext } from 'react';
import { Pressable } from 'react-native';
import {
  addGameToCollection,
  removeFromCollection,
} from '../../services/DbClient';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE } from '../../services/theme';
import { UserContext } from '../UserContext/UserContext';
import { Game } from '../../types/Game';

interface Props {
  game: Game;
  match: boolean;
  setList: Function;
  addIcon: string;
  list: string;
  removeIcon: string;
  setGame?: Function;
}

// TODO handle the remove from collection case, with an alert for accidental press
export default function UpdateCollection({
  game,
  //setGame, // logic for platform ownership feature
  match,
  setList,
  list,
  addIcon,
  removeIcon,
}: Props) {
  const [isAdded, setIsAdded] = useState<boolean>(match);
  const { rendered, toRender } = useContext(UserContext);
  const [renderedList] = rendered;
  const [gamesToRender, setGamesToRender] = toRender;

  const userId: string = '626add893f286892111c9490'; // TODO make it dynamic by user
  return (
    <Pressable
      testID="toggleIcon"
      onPress={() => {
        console.log(userId, game, list);
        
        return !isAdded
          ? addGameToCollection(userId, game, list).then((res) => {
              // setGame(res.added); // logic ready for platform ownership feature
              setIsAdded(!isAdded);
              console.log(res);

              setList((prev: Game[]) => [
                {
                  _id: res.added._id,
                  background_image: res.added.background_image,
                  id: res.added.id,
                  name: res.added.name,
                },
                ...prev,
              ]);
            })
          : removeFromCollection(userId, game._id, list).then((res) => {
              setIsAdded((prev) => !prev);
              setList((prev: Game[]) =>
                prev.filter((game) => game._id !== res.id)
              );
              renderedList === list &&
                setGamesToRender((prev: Game[]) =>
                  prev.filter((game) => game._id !== res.id)
                );
            });
      }}
    >
      {isAdded ? (
        <Ionicons name={removeIcon as any} size={28} color={PALETTE.one} />
      ) : (
        <Ionicons name={addIcon as any} size={28} color={PALETTE.four} />
      )}
    </Pressable>
  );
}
