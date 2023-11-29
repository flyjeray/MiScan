import { Text, View } from 'react-native';
import { Button, EditableTitle, ShortCoinInfo } from '../../../components';
import { MinterExplorerAddress } from '../../../models/addresses';
import { LocalStorage } from '../../../utils/storage/storage';
import { LocalStorageSavedAddress } from '../../../utils/storage/models';
import { PassedState } from '../../../models/global';
import { useState } from 'react';
import { AddressSection } from './Sections';

type Props = {
  address: MinterExplorerAddress;
  name: PassedState<string>;
  list: PassedState<LocalStorageSavedAddress[]>;
  goBack: () => void;
};

export type AddressSection = 'balances' | 'transactions';

export const AddressInformation = ({
  address,
  name,
  list,
  goBack,
}: Props): JSX.Element => {
  const [displayedSection, setDisplayedSection] =
    useState<AddressSection>('balances');

  const handleAddToSaved = (address: string) => {
    if (!list.value.find(svd => svd.address === address)) {
      const newSaved: LocalStorageSavedAddress[] = [
        ...list.value,
        { name: address, address },
      ];

      LocalStorage.save('savedAddresses', newSaved);
      list.update(newSaved);
    }
  };

  const handleRemoveFromSaved = (address: string) => {
    const index = list.value.findIndex(svd => svd.address === address);
    if (index !== -1) {
      const newSaved = [...list.value];
      newSaved.splice(index, 1);

      LocalStorage.save('savedAddresses', newSaved);
      list.update(newSaved);
    }
  };

  const handleEditSaved = (address: string, title: string) => {
    const index = list.value.findIndex(svd => svd.address === address);
    let titleToSaveWith = title;

    if (!titleToSaveWith) {
      name.update(address);
      titleToSaveWith = address;
    }

    if (index !== -1) {
      const copy = [...list.value];
      const edited = {
        name: titleToSaveWith,
        address,
      };

      copy[index] = edited;

      LocalStorage.save('savedAddresses', copy).then(() => name.update(title));
    }
  };

  const isAddressSaved = (address: string) =>
    !!list.value.find(svd => svd.address === address);

  return (
    <>
      <Button onPress={goBack} alternative title="Go back" />
      <EditableTitle
        maxAmountSymbols={30}
        editable={isAddressSaved(address.address)}
        onChangeText={val => name.update(val)}
        onBlur={() => handleEditSaved(address.address, name.value)}
        value={name.value || address.address}
      />
      {name && <Text selectable>{address.address}</Text>}
      {isAddressSaved(address.address) ? (
        <Button
          onPress={() => handleRemoveFromSaved(address.address)}
          title="Remove from favorites"
        />
      ) : (
        <Button
          onPress={() => handleAddToSaved(address.address)}
          title="Add to favorites"
        />
      )}
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Button
          alternative={displayedSection === 'balances'}
          onPress={() => setDisplayedSection('balances')}
          title="Balances"
        />
        <Button
          alternative={displayedSection === 'transactions'}
          onPress={() => setDisplayedSection('transactions')}
          title="Transactions"
        />
      </View>
      {address && <AddressSection address={address} type={displayedSection} />}
    </>
  );
};
