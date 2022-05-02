import CollectionScreen from './CollectionScreen';
import { render } from '@testing-library/react-native';

test('should render correctly', () => {
  const tree = render(<CollectionScreen />);
  expect(tree).toMatchSnapshot();
});