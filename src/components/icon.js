import React from 'react';
import Icons from '../assets/SVG/icons.svg';
import styled from 'styled-components'

const StyledPieceImage = styled.svg`
  margin-top: 7px;`

export default function Icon(props) {
  return (
    <StyledPieceImage
        fill= {props.fill}
        width='50'
        height='50'
      >
        <use xlinkHref={`${Icons}#${props.svg}`}/>
    </StyledPieceImage>
  )
}
