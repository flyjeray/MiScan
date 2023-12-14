import styled from 'styled-components/native';
import { Colors } from '../../../../../../utils/theme/colors';
import { translate } from '../../../../../../utils/translations/i18n';

type Props =
  | {
      name: string;
      amount: string;
      type: 'free';
    }
  | {
      name: string;
      amount: string;
      endBlock: number;
      startBlock: number;
      type: 'locked';
    };

const Container = styled.View<{ locked: boolean }>`
  padding: 8px;
  background-color: ${props =>
    props.locked ? Colors.fail : Colors.coinInfoBackground};
  border-radius: 4px;

  gap: 8px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.textColorLight};
`;

const Details = styled.Text`
  font-size: 12px;
  font-weight: regular;
  color: ${Colors.textColorLight};
`;

export const BalanceCoinInformation = (props: Props): JSX.Element => {
  return (
    <Container locked={props.type === 'locked'}>
      <Title>{props.name}</Title>
      <Details>{props.amount}</Details>
      {props.type === 'locked' && (
        <Details>
          {translate('unions.from')} {props.startBlock}{' '}
          {translate('unions.until')} {props.endBlock}
        </Details>
      )}
    </Container>
  );
};
