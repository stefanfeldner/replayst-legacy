import GameDetailsScreen from './GameDetailsScreen';
import { render } from '@testing-library/react-native';

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

it('should render about heading', async () => {
  const { findByText } = render(
    <GameDetailsScreen route={route} navigation={[]} />
  );
  const about = await findByText(/ABOUT/i);
  expect(about).toBeDefined();
});

it('should render genres heading', async () => {
  const { findByText } = render(
    <GameDetailsScreen route={route} navigation={[]} />
  );
  const genres = await findByText('Genres');
  expect(genres).toBeDefined();
});

it('should render release date', async () => {
  const { findByText } = render(
    <GameDetailsScreen route={route} navigation={[]} />
  );
  const date = await findByText('21.7.2010');
  expect(date).toBeDefined();
});

it('should render description', async () => {
  const { findByText } = render(
    <GameDetailsScreen route={route} navigation={[]} />
  );
  const description = await findByText(
    /This popular 2D puzzle-platformer creates the atmosphere of isolation/i
  );
  expect(description).toBeDefined();
});
