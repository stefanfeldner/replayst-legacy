import { useState } from 'react';
import { Searchbar } from 'react-native-paper';

function SearchGameBar() {
  const [search, setSearch] = useState('');
  return (
    <Searchbar placeholder="Search" onChangeText={setSearch} value={search} />
  );
}

export default SearchGameBar;
