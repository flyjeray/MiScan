import { Axios } from '..';
import { MinterAPIGetAddressResponse } from './models';

const getAddress = (address: string) =>
  Axios.get<MinterAPIGetAddressResponse>(`/api/v2/addresses/${address}`);

export const AddressAPI = {
  getAddress,
};
