import { createContext, useEffect, useState } from 'react';
import { getUserCollection } from '../../services/DbClient';
import { Game } from '../../types/Game';
import { UserContextValue } from '../../types/User';

// define default context
const UserContext = createContext<UserContextValue>({
  toRender: [[], () => {}],
  rendered: ['', () => {}],
  owned: [[], () => {}],
  wishlist: [[], () => {}],
  favorites: [[], () => {}],
  ownedIds: [],
  wishIds: [],
  favsIds: [],
});

interface Props {
  children: React.ReactNode;
}

const UserProvider = ({ children }: Props) => {
  //const [nextUrl, setNextUrl] = useState<string>(''); //TODO pagination
  const [toRender, setToRender] = useState<Game[]>([]); // to be rendered on user side
  const [rendered, setRendered] = useState<string>('owned');
  const [owned, setOwned] = useState<Game[]>([]); // OWNED
  const [wishlist, setWishlist] = useState<Game[]>([]); // WL
  const [favorites, setFavorites] = useState<Game[]>([]); // FAV
  const ownedIds = owned && owned.map((tile) => tile.id);
  const wishIds = wishlist && wishlist.map((game) => game.id);
  const favsIds = favorites && favorites.map((game) => game.id);

  const value: UserContextValue = {
    toRender: [toRender, setToRender],
    rendered: [rendered, setRendered],
    owned: [owned, setOwned],
    wishlist: [wishlist, setWishlist],
    favorites: [favorites, setFavorites],
    ownedIds: ownedIds,
    wishIds: wishIds,
    favsIds: favsIds,
  };
  
  // call user collection at loading, rerenders only on value change
  const userId: String = '626add893f286892111c9490';
  
  useEffect(() => {
    getUserCollection(userId).then((res) => {
      if (!res.owned) return;
      // setNextUrl(res.next); // TODO ONLY FOR PAGINATION, to eventually implement on the backend
      setToRender(res.owned);
      setOwned(res.owned);
      setFavorites(res.favorites);
      setWishlist(res.wishlist);
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
