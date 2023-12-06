import { PageContainer, Select } from '../../components';
import i18n from '../../utils/translations/i18n';

const languages: Record<string, string> = {
  English: 'en',
  Русский: 'ru',
};

export const SettingsScreen = (): JSX.Element => {
  return (
    <PageContainer>
      <Select
        data={Object.keys(languages)}
        onSelect={value => i18n.changeLanguage(languages[value])}
        defaultValue={Object.keys(languages).find(
          key => languages[key] === i18n.language,
        )}
      />
    </PageContainer>
  );
};
