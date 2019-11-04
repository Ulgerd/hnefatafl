import React from 'react';
import styled from 'styled-components'

const StyledH2 = styled.h2`
  margin-top: 0.5em;
  margin-bottom: 0.5em;`

export default function GameRules (props) {
  return  <div>
    <StyledH2>Game Rules</StyledH2>
    <div>   </div>
    <div>The attackers take the first move.</div>
    <div>- - -</div>
    <div>In his turn a player can move a single piece any number of spaces along
    a row or column; this piece may not jump over nor land on another of either colour.</div>
    <div>- - -</div>
    <div>The five marked squares in the centre and corners of the board are special,
    and only the king may land on them.</div>
    <div>- - -</div>
    <div>A piece other than the king is captured when it is caught
    between two enemies along a row or column.</div>
    <div>- - -</div>
    <div>A piece other than the king may also be captured by surrounding it
    between and enemy and one of the marked empty squares.</div>
    <div>- - -</div>
    <div>The king is captured by surrounding him on all four sides by attackers.</div>
    <div>- - -</div>
    <div>The king may also be captured by surrounding him on three sides, if the
    fourth side is the marked central square.</div>
    <div>- - -</div>
    <div>The king wins the game if he reaches one of the corner squares.
    The attackers win if they capture the king.</div>
    <div>- - -</div>
    <div>Perpetual repetition is illegal. If the board position is repeated three
    times, the player in control of the situation must find another move.</div>
    </div>
}
