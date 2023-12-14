import { Text, View } from 'react-native';
import { Button, EditableTitle } from '../../../components';
import { AddressDataWithLockedBalance } from '../../../models/addresses';
import { PassedState } from '../../../models/global';
import { useState } from 'react';
import { AddressSection } from './Sections';
import { translate } from '../../../utils/translations/i18n';
import { useAppDispatch, useAppSelector } from '../../../utils/redux/hooks';
import { selectChain } from '../../../utils/redux/slices/chainSlice';
import {
  editSavedAddress,
  removeAddressFromSaved,
  saveAddress,
  selectSavedAddresses,
} from '../../../utils/redux/slices/savedAddressesSlice';

type Props = {
  address: AddressDataWithLockedBalance;
  name: PassedState<string>;
  goBack: () => void;
};

export type AddressSection = 'balances' | 'transactions';

export const AddressInformation = ({
  address,
  name,
  goBack,
}: Props): JSX.Element => {
  const [displayedSection, setDisplayedSection] =
    useState<AddressSection>('balances');

  const dispatch = useAppDispatch();
  const addressChain = useAppSelector(selectChain);
  const savedAddresses = useAppSelector(selectSavedAddresses);

  const findAddressInSaved = (address: string) =>
    savedAddresses.find(svd => svd.address === address);

  return (
    <>
      <Button
        onPress={goBack}
        type="alternative"
        title={
          translate('navigation.back') +
          (addressChain.length > 1
            ? ` - ${
                findAddressInSaved(addressChain[addressChain.length - 2])
                  ?.name || addressChain[addressChain.length - 2]
              }`
            : '')
        }
      />
      <EditableTitle
        maxAmountSymbols={30}
        editable={!!findAddressInSaved(address.address)}
        onChangeText={val => name.update(val)}
        onBlur={() =>
          dispatch(
            editSavedAddress({ address: address.address, name: name.value }),
          )
        }
        value={name.value}
      />
      {name && <Text selectable>{address.address}</Text>}
      {!!findAddressInSaved(address.address) ? (
        <Button
          onPress={() => dispatch(removeAddressFromSaved(address.address))}
          title={translate('screens.address_information.remove_from_favorites')}
          type="error"
        />
      ) : (
        <Button
          onPress={() => dispatch(saveAddress(address.address))}
          title={translate('screens.address_information.add_to_favorites')}
          type="default"
        />
      )}
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Button
          type={displayedSection === 'balances' ? 'alternative' : 'default'}
          onPress={() => setDisplayedSection('balances')}
          title={translate('screens.address_information.balances')}
        />
        <Button
          type={displayedSection === 'transactions' ? 'alternative' : 'default'}
          onPress={() => setDisplayedSection('transactions')}
          title={translate('screens.address_information.transactions.title')}
        />
      </View>
      {address && <AddressSection address={address} type={displayedSection} />}
    </>
  );
};
