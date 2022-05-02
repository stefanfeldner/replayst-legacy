import GameDetailsScreen from './GameDetailsScreen';
import { render, waitFor } from '@testing-library/react-native';

const route = {
  key: 'Details-voZoAg-94IMmyqnnHlzwE',
  name: 'Details',
  params: {
    id: 1030,
  },
};

it('should render game name', async () => {
  const { findByText } = render(
    <GameDetailsScreen route={route} navigation={[]} />
  );
  const title = await findByText('Limbo');
  expect(title).toBeDefined();
});
