import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../../utils/theme/colors';

type ButtonType = 'default' | 'alternative' | 'error';

type StyledButtonProps = {
  title?: string;
  type: ButtonType;
};

const ButtonText = styled.Text<{ type: ButtonType }>`
  text-align: center;

  color: ${props => {
    switch (props.type) {
      case 'alternative':
        return Colors.textColor;
      case 'error':
        return Colors.textColorLight;
      default:
      case 'default':
        return Colors.textColorLight;
    }
  }};
`;

const ButtonStyle = styled.TouchableOpacity<StyledButtonProps>`
  flex: 1;
  background-color: ${props => {
    switch (props.type) {
      case 'alternative':
        return Colors.background;
      case 'error':
        return Colors.fail;
      default:
      case 'default':
        return Colors.main;
    }
  }};
  border-radius: 4px;
  border: 1px solid
    ${props => {
      switch (props.type) {
        case 'alternative':
          return Colors.main;
        case 'error':
          return Colors.fail;
        default:
        case 'default':
          return Colors.main;
      }
    }};
  padding: 8px;
`;

type Props = TouchableOpacityProps & StyledButtonProps;

const Button = (props: Props): JSX.Element => (
  <ButtonStyle {...props}>
    <ButtonText type={props.type}>{props.title}</ButtonText>
  </ButtonStyle>
);

export default Button;
