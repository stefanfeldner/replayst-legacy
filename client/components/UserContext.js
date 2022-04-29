import { createContext, useEffect, useState } from 'react';
import { getUserCollection } from '../services/DbClient';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  //const [nextUrl, setNextUrl] = useState(''); //TODO pagination
  const [toRender, setToRender] = useState([]); // to be rendered on user side
  const [rendered, setRendered] = useState('owned');
  const [owned, setOwned] = useState([]); // OWNED
  const [wishlist, setWishlist] = useState([]); // WL
  const [favorites, setFavorites] = useState([]); // FAV
  const ownedIds = owned && owned.map((tile) => tile.id);
  const wishIds = wishlist && wishlist.map((game) => game.id);
  const favsIds = favorites && favorites.map((game) => game.id);

  const value = {
    toRender: [toRender, setToRender],
    rendered: [rendered, setRendered],
    owned: [owned, setOwned],
    wishlist: [wishlist, setWishlist],
    favorites: [favorites, setFavorites],
    ownedIds: ownedIds,
    wishIds: wishIds,
    favsIds: favsIds
  };
  // call user collection at loading, rerenders only on value change
  const userId =
    /*'6266679c68159251ea6f845d'; //filo*/ '626add893f286892111c9490';
  useEffect(() => {
    getUserCollection(userId).then((res) => {
      if (!res.owned) return;
      // setNextUrl(res.next); // TODO ONLY FOR PAGINATION, to eventually implement on the backend
      setToRender(res.owned);
      setOwned(res.owned);
      setFavorites(res.favorites);
      setWishlist(res.wishlist);
      console.log('MAIN');
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
