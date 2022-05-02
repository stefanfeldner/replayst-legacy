import { memo, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Pressable,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PALETTE } from '../../services/theme';
import GameListHeader from '../GameListHeader/GameListHeader';
import GameTile from '../GameTile/GameTile';
import { Game } from '../../types/Game';

interface Props {
  tiles: Game[];
  isFromCollection?: boolean;
  infiniteScroll?: any;
  nextUrl?: string | null;
  listViewRef?: any;
}

function GameList({
  tiles,
  infiniteScroll,
  nextUrl,
  listViewRef,
  isFromCollection,
}: Props) {
  const [cols, setCols] = useState<number>(1);
  const [fontSize, setFontSize] = useState<number>(18);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const add = () => {
    setCols((prev) => prev - 1);
    setFontSize((prev) => prev + 2);
  };
  const remove = () => {
    setCols((prev) => prev + 1);
    setFontSize((prev) => prev - 2);
  };
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 35,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = (type: string) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 135,
      useNativeDriver: true,
    }).start(() => {
      if (type === 'add') add();
      else remove();
      fadeIn();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tiles}
        extraData={fontSize}
        ref={listViewRef}
        key={cols}
        numColumns={cols}
        initialNumToRender={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
            <GameTile game={item} cols={cols} />
          </Animated.View>
        )}
        maxToRenderPerBatch={3}
        onEndReached={() => {
          if (nextUrl) return infiniteScroll(nextUrl); //UNCOMMENT TO ACTIVATE INFINITE SCROLL
        }} // <-- when we call a function directly in JSX we need to put it in a callback function!!!
        onEndReachedThreshold={0.1} // TODO check how many times it gets fired with the active infinite scroll
        ListHeaderComponent={isFromCollection ? GameListHeader : null}
      />

      <View style={styles.buttons}>
        <Pressable onPress={() => cols > 1 && fadeOut('add')}>
          <MaterialIcons
            name="add"
            size={26}
            color={cols > 1 ? PALETTE.two : 'gray'}
          />
        </Pressable>
        <Pressable onPress={() => cols < 3 && fadeOut('remove')}>
          <MaterialIcons
            name="remove"
            size={26}
            color={cols < 3 ? PALETTE.two : 'gray'}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default memo(GameList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    justifyContent: 'space-between',
    alignContent: 'center',
    position: 'absolute',
    backgroundColor: PALETTE.five,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
    paddingVertical: 12,
    right: 22,
    bottom: 24,
  },
  plusButton: {
    color: PALETTE.three,
  },
  minusBUtton: {
    color: PALETTE.three,
  },
  list: {
    marginTop: 50,
  },
});
