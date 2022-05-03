import GameTile from './GameTile';
import { render, fireEvent } from '@testing-library/react-native';
import { Game } from '../../types/Game';
import { NavigationContainer } from '@react-navigation/native';

const mockGame: Game = {
  _id: '626c193536accdbf70a87a85',
  id: 1030,
  name: 'Limbo',
  metacritic: 88,
  released: '2010-07-21',
  background_image:
    'https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg',
};

it('should render detail page of clicked game', async () => {
  const { findByText } = render(
    <NavigationContainer>
      <GameTile game={mockGame} cols={1} />
    </NavigationContainer>
  );

  setTimeout(async () => {
    const game = await findByText('Limbo');
    await fireEvent.press(game);
    const releaseDate = await findByText(/21.7.2010/i);
    
    expect(game).toBeDefined();
    expect(releaseDate).toBe('21.7.2010');
  }, 4000);
});
