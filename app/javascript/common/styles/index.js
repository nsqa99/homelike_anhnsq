import styled from 'styled-components'

export const Rounded = styled.div`
  border-radius: ${props => parseInt(props.width_height)/2}px;
  width: ${props => parseInt(props.width_height)}px;
  height: ${props => parseInt(props.width_height)}px;
  font-size: 12px;
`

export const Flex = styled.div`
  display: flex;
`

export const FlexCentered = styled(Flex)`
  justify-content: center;
  align-items: center;
`

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`
