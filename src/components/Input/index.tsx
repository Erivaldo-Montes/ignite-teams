import { Container } from "./styles";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

export function Input({ ...rest }: TextInputProps) {
  const theme = useTheme();
  return <Container placeholderTextColor={theme.COLORS.GREY_300} {...rest} />;
}
