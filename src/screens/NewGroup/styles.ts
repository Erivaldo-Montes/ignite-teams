import styled from "styled-components/native";
import { UsersThree } from "phosphor-react-native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.COLORS.GREY_600};
  padding: 24px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 56,
  color: theme.COLORS.GREEN_700,
}))`
  align-self: center;
`;
