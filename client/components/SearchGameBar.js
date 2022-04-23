import { SearchBar } from 'react-native-screens';

function SearchGameBar() {
  return (
    <SearchBar
      round
      searchIcon={{ size: 24 }}
      onChangeText={(text) => text}
      placeholder="Type Here..."
      value={search}
    />
  );
}

export default SearchGameBar;
