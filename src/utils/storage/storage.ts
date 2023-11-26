import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';
import { LocalStorageSavedAddress } from './models';

const APP_LOCAL_STORAGE_PREFIX = 'MISCANLOCALDATA';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
});

type STORAGE_MAP = {
  savedAddresses: LocalStorageSavedAddress[];
};

export const LocalStorage = {
  get: <T extends keyof STORAGE_MAP>(key: T) =>
    storage.load<STORAGE_MAP[T]>({ key: `${APP_LOCAL_STORAGE_PREFIX}-${key}` }),
  save: <T extends keyof STORAGE_MAP>(key: T, data: STORAGE_MAP[T]) =>
    storage.save({
      key: `${APP_LOCAL_STORAGE_PREFIX}-${key}`,
      data,
    }),
};
