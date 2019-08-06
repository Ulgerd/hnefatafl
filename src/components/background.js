import React from 'react';
import Icon from './icon.js';
import styled from 'styled-components'

const StyledPieceBase = styled.div`
  position: absolute;`

export default function Background (props) {
  if ( props.squareValue === 0 ) return null;

  let svg = props.squareValue==='escape' ?
    'gates' :
    'throne';

  return (
    <div>
      <StyledPieceBase />
      <Icon
        fill={'white'}
        svg={svg}
      />
    </div>
  );
}
