import { Searchbar } from 'react-native-paper';

function SearchGameBar({ search, setSearch, handleOnSubmit }) {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearch}
      value={search}
      onSubmitEditing={handleOnSubmit}
    />
  );
}

export default SearchGameBar;
