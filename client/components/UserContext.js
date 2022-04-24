import { createContext, useEffect, useState } from 'react';
import { getUserCollection } from '../services/DbClient';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [tiles, setOwnedTiles] = useState([]);
  const ownedIds = tiles && tiles.map((tile) => tile.id);

  const value = {
    owned: [tiles, setOwnedTiles],
    ownedIds: ownedIds
  };
  // call user collection at loading, rerenders only on value change
  const userId = '6261e0b712592ddafe9b6aa2';
  useEffect(() => {
    getUserCollection(userId).then((res) => {
      // setNextUrl(res.next); // TODO ONLY FOR PAGINATION, to eventually implement on the backend
      setOwnedTiles(res);
      console.log('MAIN');
    });
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
