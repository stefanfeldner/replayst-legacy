import HomeScreen from './HomeScreen';
import { render, fireEvent } from '@testing-library/react-native';

it('should render found games', async () => {
  const { findByText } = render(<HomeScreen />);

  setTimeout(async () => {
    const gta = await findByText('Grand Theft Auto V');
    const witcher = await findByText(/The Witcher 3/i)
    const portal = await findByText(/Portal 2/i)

    expect(gta).toBeDefined()
    expect(witcher).toBeDefined()
    expect(portal).toBeDefined()
  }, 4000);
});

it('should render detail page of clicked game', async () => {
  const { findByText } = render(<HomeScreen />);

  setTimeout(async () => {
    const game = await findByText('Grand Theft Auto V')
    await fireEvent.press(game);
    const releaseDate = await findByText(/17.9.2013/i)
  
    expect(releaseDate).toBe('18.9.2013')
  }, 4000);
})