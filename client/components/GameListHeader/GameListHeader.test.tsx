import GameListHeader from './GameListHeader';
import { render } from '@testing-library/react-native';

test('should display three buttons', () => {
  const tree = render(<GameListHeader />);
  expect(tree).toMatchSnapshot();
});
