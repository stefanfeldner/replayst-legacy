import UpdateCollection from './UpdateCollection';
import { render, fireEvent } from '@testing-library/react-native';
import { Game } from '../../types/Game';
import { act } from 'react-test-renderer';

const game = {
  _id: '626ae441b1b5b6489ae1f376',
  id: 3498,
  name: 'Grand Theft Auto V',
  slug: 'grand-theft-auto-v',
  description:
    'Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. \nSimultaneous storytelling from three unique perspectives: \nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. \nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.',
  metacritic: 93,
  released: '2013-09-17',
  background_image:
    'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
  website: 'http://www.rockstargames.com/V/',
  genres: [],
  platforms: [],
  developers: [
    {
      id: 3524,
      name: 'Rockstar North',
      slug: 'rockstar-north',
      _id: '626ae441b1b5b6489ae1f377',
    },
  ],
  __v: 0,
};

const match = false;
const setList = jest.fn();
const listName = 'favorites';
const addIcon = 'ios-heart-outline';
const removeIcon = 'ios-heart';

test('should add game to favorites', async () => {
  const { findByTestId } = render(
    <UpdateCollection
      game={game}
      match={match}
      setList={setList}
      list={listName}
      addIcon={addIcon}
      removeIcon={removeIcon}
    />
  );

  const toggleIcon = await findByTestId('toggleIcon');

  await act(async () => {
    await fireEvent.press(toggleIcon);
  });

  expect(setList).toHaveBeenCalledTimes(1);
});
