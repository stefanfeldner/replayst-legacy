import { Searchbar } from 'react-native-paper';

function SearchGameBar({ search, setSearch, handleOnSubmit }) {
  return (
    <Searchbar
      style={{
        width: '86%',
        height: 27,
        marginBottom: 10,
        position: 'relative',
        right: 20,
        top: 5.5,
        backgroundColor: '#000'
      }}
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
