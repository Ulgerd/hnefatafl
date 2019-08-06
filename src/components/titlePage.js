import React, { useEffect } from 'react';
import Header from './header.js';
import Board from './board.js';
import GameMenu from './gameMenu.js';
import { connect } from 'react-redux';
import { setInitialData } from '../actions/rootActions.js'
import {
  black_pieces, white_pieces, king, forbidden_squares
} from '../data/gameConditions.js';
import styled from 'styled-components'

const StyledApp = styled.div`
  text-align: center;`

const StyledAppBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;`

function TitlePage (props) {
  useEffect(() => {
    let board = new Array(121).fill(0).map((id, i) => {
        if ( black_pieces.indexOf(i) > -1 ) return 'black';
        if ( white_pieces.indexOf(i) > -1 ) return 'white';
        if ( king.indexOf(i) > -1 ) return 'king';
        if ( forbidden_squares.indexOf(i) > -1 ) return 'escape';
        return 0;
    })
    props.setInitialData(board)
  })

  return (
    <StyledApp>
      <Header/>
      <StyledAppBody>
        <Board/>
        <GameMenu />
      </StyledAppBody>
    </StyledApp>
  );
}

const mapDispatchToProps = dispatch => ({
  setInitialData: (board) => {dispatch(setInitialData(board))},
})

export default connect(null, mapDispatchToProps) (TitlePage);