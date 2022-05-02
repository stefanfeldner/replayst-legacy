import GameDetailsScreen from './GameDetailsScreen';
import { render } from '@testing-library/react-native';

const route = {
  key: 'Details-voZoAg-94IMmyqnnHlzwE',
  name: 'Details',
  params: {
    id: 1030,
  },
};

test('should render correctly', () => {
  const tree = render(<GameDetailsScreen route={route} navigation={''} />);
  expect(tree).toMatchSnapshot();
});

// TODO: Find out why it's not finding anything...
// test('should find three collection buttons', async () => {
//   const { findAllByTestId } = render(
//     <GameDetailsScreen route={route} navigation={[]} />
//   );
//   const buttons = await findAllByTestId('toggleIcon');
//   console.log('button length: ', buttons);
//   expect(buttons.length).toBe(3);
// });
