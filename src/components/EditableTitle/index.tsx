import styled from 'styled-components/native';
import { Colors } from '../../utils/theme/colors';
import { TextInputProps } from 'react-native';
import { useState } from 'react';

const StyledInput = styled.TextInput`
  font-size: 18px;
  color: ${Colors.textColor};
  padding: 0;
`;

type Props = TextInputProps & { maxAmountSymbols?: number };

const EditableTitle = (props: Props): JSX.Element => {
  const { maxAmountSymbols, value, onFocus, onBlur, ...rest } = props;

  const [focused, setFocused] = useState(false);

  const shortenText = (): string => {
    const substring = value?.substring(0, maxAmountSymbols || 20);

    if (!substring) return '';

    return value === substring ? substring : `${substring}..`;
  };

  return (
    <StyledInput
      {...rest}
      onFocus={e => {
        setFocused(true);
        onFocus && onFocus(e);
      }}
      onBlur={e => {
        setFocused(false);
        onBlur && onBlur(e);
      }}
      value={focused ? value : shortenText()}
    />
  );
};

export default EditableTitle;
