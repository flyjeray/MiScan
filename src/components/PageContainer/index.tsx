import styled from 'styled-components/native';
import { Colors } from '../../utils/theme/colors';
import { ScrollViewProps } from 'react-native';

export const PageContainer = (props: ScrollViewProps): JSX.Element => {
  return (
    <Container contentContainerStyle={{ gap: 16, padding: 8 }} {...props}>
      {props.children}
    </Container>
  );
};

const Container = styled.ScrollView`
  background-color: ${Colors.background};
`;

export default PageContainer;
