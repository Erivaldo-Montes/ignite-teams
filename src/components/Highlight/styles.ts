import styled from 'styled-components/native'

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 35px;
  margin-bottom: 32px;
`

export const Title = styled.Text`
  font-size: ${props => props.theme.FONT_SIZE.XL}px;
  font-family: ${props => props.theme.FONT_FAMILY.BOLD};
  color: ${props => props.theme.COLORS.WHITE}
`
export const Subtitle = styled.Text`
  margin-top: 4px;
  font-family: ${props => props.theme.FONT_FAMILY.REGULAR};
  font-size: ${props => props.theme.FONT_SIZE.MD}px;
  color: ${props => props.theme.COLORS.GREY_300}
`