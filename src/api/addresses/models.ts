import { MinterExplorerAddress } from '../../models/addresses';

export type MinterAPIGetAddressResponse = {
  data: MinterExplorerAddress;
  latest_block_time: string;
};
