import styled from 'styled-components/native'
import { CaretLeft } from 'phosphor-react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const Container = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  height: 55px;
  width: 46px
`;

export const BackButton = styled.TouchableOpacity`
  flex: 1;
`;

export const BackIcon = styled(CaretLeft).attrs(({theme}) => ({
  size: 32,
  color: theme.COLORS.WHITE,
}))``