import { Feed } from '../models/feed';
import { Item } from '../models/item';
import { Settings } from '../models/settings';

export interface AppState {
  feed: Feed,
  items: Item[],
  settings: Settings
};
