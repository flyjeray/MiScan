import { PageContainer } from '../../components';

import SelectDropdown from 'react-native-select-dropdown';
import i18n from '../../utils/translations/i18n';

type Option = {
  title: string;
  value: string;
};

const languages: Record<string, string> = {
  English: 'en',
  Russian: 'ru',
};

export const SettingsScreen = (): JSX.Element => {
  return (
    <PageContainer>
      <SelectDropdown
        data={Object.keys(languages)}
        onSelect={value => i18n.changeLanguage(languages[value])}
        defaultValue={Object.keys(languages).find(
          key => languages[key] === i18n.language,
        )}
      />
    </PageContainer>
  );
};
