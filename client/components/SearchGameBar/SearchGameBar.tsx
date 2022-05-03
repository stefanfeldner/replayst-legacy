import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Game } from '../../types/Game';

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  handleOnSubmit: () => void;
  setSearchResults: Dispatch<SetStateAction<Game[]>>;
}

function SearchGameBar({
  search,
  setSearch,
  handleOnSubmit,
  setSearchResults,
}: Props) {
  return (
    <Searchbar
      style={styles.bar}
      inputStyle={{ color: '#e9e7e3' }}
      iconColor="#c8c6bf"
      placeholderTextColor="#c8c6bf"
      placeholder="Search"
      onChangeText={setSearch}
      value={search}
      onSubmitEditing={handleOnSubmit}
    />
  );
}

export default SearchGameBar;

const styles = StyleSheet.create({
  bar: {
    width: '86%',
    height: 27,
    marginBottom: 10,
    position: 'relative',
    right: 20,
    top: 5.5,
    backgroundColor: '#000',
  },
});
