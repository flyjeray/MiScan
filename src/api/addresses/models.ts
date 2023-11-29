import { MinterExplorerAddress } from '../../models/addresses';
import {
  PaginationRequestLinks,
  PaginationRequestMetaData,
} from '../../models/global';
import { MinterExplorerTransaction } from '../../models/transactions';

export type MinterAPIGetAddressResponse = {
  data: MinterExplorerAddress;
  latest_block_time: string;
};

export type MinterAPIGetTransactionsResponse = {
  data: MinterExplorerTransaction[];
  links: PaginationRequestLinks;
  meta: PaginationRequestMetaData;
};
