import { Text } from 'react-native';

import styled from 'styled-components/native';
import { Colors } from '../../utils/theme/colors';

type Props = {
  name: string;
  amount: string;
};

const Container = styled.View`
  padding: 8px;
  background-color: ${Colors.coinInfoBackground};
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

const ShortCoinInfo = (props: Props): JSX.Element => {
  return (
    <Container>
      <Title>{props.name}</Title>
      <Details>{props.amount}</Details>
    </Container>
  );
};

export default ShortCoinInfo;
