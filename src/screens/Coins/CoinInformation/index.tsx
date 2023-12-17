import styled from 'styled-components/native';
import { MinterExplorerCoin } from '../../../models/coins';
import { Button } from '../../../components';
import { Colors } from '../../../utils/theme/colors';
import { translate } from '../../../utils/translations/i18n';
import { useAppDispatch, useAppSelector } from '../../../utils/redux/hooks';
import {
  removeCoinFromSaved,
  saveCoin,
  selectSavedCoins,
} from '../../../utils/redux/slices/savedCoinsSlice';

type Props = {
  coin: MinterExplorerCoin;
  goBack: () => void;
};

export const CoinInformation = ({ coin, goBack }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const savedCoins = useAppSelector(selectSavedCoins);

  return (
    <>
      <Button
        type="alternative"
        onPress={goBack}
        title={translate('navigation.back')}
      />
      <Title>{coin.name}</Title>
      <Details>${coin.price_usd}</Details>
      {!!savedCoins.find(saved => saved.value === coin.symbol) ? (
        <Button
          type="error"
          onPress={() => dispatch(removeCoinFromSaved(coin.symbol))}
          title={translate('buttons.remove_from_favorites')}
        />
      ) : (
        <Button
          type="default"
          onPress={() =>
            dispatch(saveCoin({ label: coin.name, value: coin.symbol }))
          }
          title={translate('buttons.add_to_favorites')}
        />
      )}
    </>
  );
};

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.textColor};
`;

const Details = styled.Text`
  font-size: 16px;
  color: ${Colors.textColor};
`;
