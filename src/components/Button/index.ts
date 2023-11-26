import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../../utils/theme/colors';

const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: ${Colors.main};
  border-radius: 4px;
  border: 1px solid ${Colors.mainLight};
  padding: 8px;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: ${Colors.textColorLight};
`;

export default { Component: Button, InnerText: ButtonText };
