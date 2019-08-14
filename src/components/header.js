import React from 'react';
import styled from 'styled-components'

const StyledHeader = styled.div`
  margin: 1em 0 1.5em;
  `
const StyledH1 = styled.h1`
  font-family: 'Norse';
  margin: 0;
  `

export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>Hnefatafl the game</StyledH1>
      <StyledH1>Be a viking</StyledH1>
    </StyledHeader>
  );
}
