import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { BellSimpleZ, UsersThree } from "phosphor-react-native";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 90px;

  background-color: ${(props) => props.theme.COLORS.GREY_500};

  border-radius: 6px;
  flex-direction: row;
  align-items: center;

  padding: 24px;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GREY_200};
    font-size: ${theme.FONT_SIZE.MD}px;
  `}
`;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  color: theme.COLORS.GREEN_500,
  size: 32,
  weight: "fill",
}))`
  margin-right: 20px;
`;
