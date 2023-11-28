import { Text } from 'react-native';
import { Button, EditableTitle, ShortCoinInfo } from '../../../components';
import { MinterExplorerAddress } from '../../../models/addresses';
import { LocalStorage } from '../../../utils/storage/storage';
import { LocalStorageSavedAddress } from '../../../utils/storage/models';
import { PassedState } from '../../../models/global';

type Props = {
  address: MinterExplorerAddress;
  name: PassedState<string>;
  list: PassedState<LocalStorageSavedAddress[]>;
  goBack: () => void;
};

export const AddressInformation = ({
  address,
  name,
  list,
  goBack,
}: Props): JSX.Element => {
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
      <Button.Component onPress={goBack} alternative>
        <Button.InnerText>Go Back</Button.InnerText>
      </Button.Component>
      <EditableTitle
        maxAmountSymbols={30}
        editable={isAddressSaved(address.address)}
        onChangeText={val => name.update(val)}
        onBlur={() => handleEditSaved(address.address, name.value)}
        value={name.value || address.address}
      />
      {name && <Text selectable>{address.address}</Text>}
      {list.value.find(svd => svd.address === address.address) ? (
        <Button.Component
          onPress={() => handleRemoveFromSaved(address.address)}>
          <Button.InnerText>Remove from favorites</Button.InnerText>
        </Button.Component>
      ) : (
        <Button.Component onPress={() => handleAddToSaved(address.address)}>
          <Button.InnerText>Add to favorites</Button.InnerText>
        </Button.Component>
      )}
      {address.balances
        .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
        .map(balance => (
          <ShortCoinInfo
            key={`${address.address}-${balance.coin.id}`}
            name={balance.coin.symbol}
            amount={balance.amount}
          />
        ))}
    </>
  );
};
