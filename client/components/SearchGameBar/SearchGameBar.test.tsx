import SearchGameBar from './SearchGameBar';
import { render, fireEvent } from '@testing-library/react-native';

const search = 'GTA';
const setSearch = jest.fn();
const handleOnSubmit = jest.fn();
const setSearchResults = jest.fn();

it('should render search input', () => {
  const { getByPlaceholderText, getByText } = render(
    <SearchGameBar
      search={search}
      setSearch={setSearch}
      handleOnSubmit={handleOnSubmit}
      setSearchResults={setSearchResults}
    />
  );
  const inputElement = getByPlaceholderText(/search/i);
  expect(inputElement).toBeDefined()
});