import { Game } from "./Game";

export interface UserContextValue {
  toRender: [Game[], Function],
  rendered: [string, Function],
  owned: [Game[], Function],
  wishlist: [Game[], Function],
  favorites: [Game[], Function],
  ownedIds: number[],
  wishIds: number[],
  favsIds: number[]
}