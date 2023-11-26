import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../../utils/theme/colors';

type ButtonProps = {
  alternative?: boolean;
};

const Button = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  background-color: ${props =>
    props.alternative ? Colors.mainLight : Colors.main};
  border-radius: 4px;
  border: 1px solid
    ${props => (props.alternative ? Colors.main : Colors.mainLight)};
  padding: 8px;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: ${Colors.textColorLight};
`;

export default { Component: Button, InnerText: ButtonText };
