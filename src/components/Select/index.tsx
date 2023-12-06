import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';
import { Colors } from '../../utils/theme/colors';
import { CaretDown } from 'phosphor-react-native';

const Select = (props: SelectDropdownProps): JSX.Element => {
  return (
    <SelectDropdown
      buttonStyle={{
        width: '100%',
        backgroundColor: Colors.main,
        borderRadius: 4,
        paddingHorizontal: 16,
      }}
      buttonTextStyle={{
        color: Colors.textColorLight,
      }}
      renderDropdownIcon={() => <CaretDown color="white" />}
      {...props}
    />
  );
};

export default Select;
