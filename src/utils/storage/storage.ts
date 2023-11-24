import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';

const APP_LOCAL_STORAGE_PREFIX = 'MISCAN_LOCAL_DATA';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
});

export type STORAGE_KEY = 'savedAddresses';

export const LocalStorage = {
  get: <T>(key: STORAGE_KEY) =>
    storage.load<T>({ key: `${APP_LOCAL_STORAGE_PREFIX}_${key}` }),
  save: <T>(key: STORAGE_KEY, data: T) =>
    storage.save({
      key,
      data,
    }),
};
