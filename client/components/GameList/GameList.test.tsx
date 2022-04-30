import GameList from './GameList';
import { render } from '@testing-library/react-native';
import { Game } from '../../types/Game';

const tiles: Game[] = [
  {
    _id: '626ba7fbb35021b2d7e68235',
    id: 422,
    name: 'Terraria',
    metacritic: 81,
    released: '2011-05-16',
    background_image:
      'https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg',
  },
  {
    _id: '626c193536accdbf70a87a85',
    id: 1030,
    name: 'Limbo',
    metacritic: 88,
    released: '2010-07-21',
    background_image:
      'https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg',
  },
];

test('FlatList should render Items', () => {
  const { getByText } = render(<GameList tiles={tiles} />);
  
  expect(getByText('Terraria')).toBeDefined;
  expect(getByText('Limbo')).toBeDefined;
});
