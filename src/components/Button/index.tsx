import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../../utils/theme/colors';

type StyledButtonProps = {
  alternative?: boolean;
  title?: string;
};

const ButtonText = styled.Text<{ alternative?: boolean }>`
  text-align: center;

  color: ${props =>
    props.alternative ? Colors.textColor : Colors.textColorLight};
`;

const ButtonStyle = styled.TouchableOpacity<StyledButtonProps>`
  width: 100%;
  background-color: ${props =>
    props.alternative ? Colors.background : Colors.main};
  border-radius: 4px;
  border: 1px solid
    ${props => (props.alternative ? Colors.main : Colors.mainLight)};
  padding: 8px;
`;

type Props = TouchableOpacityProps & StyledButtonProps;

const Button = (props: Props): JSX.Element => (
  <ButtonStyle {...props}>
    <ButtonText alternative={props.alternative}>{props.title}</ButtonText>
  </ButtonStyle>
);

export default Button;
