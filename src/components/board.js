import React from 'react';
import Square from './square.js';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { setData, setAvailableSquares, setTurn } from '../actions/rootActions.js'
import { removingPiece } from '../utils/removingPiece.js';
import { winningConditionsCheck } from '../utils/winningConditionsCheck.js'
import { movementRejected } from '../utils/movementRejected.js'
import { onlyForKingSquares } from '../data/gameConditions.js';
import styled from 'styled-components'

const StyledBoard = styled.div`
  font-size: 2em;
  width: 22em;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(11, 1fr);
  grid-gap: 0;`

function Board (props) {

  const onDragEnd = result => {
    let { destination, source } = result
    let {
      board,setData, availableSquares, setTurn, setAvailableSquares
    } = props;

    setAvailableSquares([]);

    if ( movementRejected(destination, source, availableSquares) ) return;

    let srcID = result.source.droppableId;
    let destID = result.destination.droppableId;

    let newBoard = removingPiece(board, srcID, destID);
    let blockAllMoves = winningConditionsCheck(newBoard, srcID, destID);

    if ( newBoard[srcID] === 'king' ) {
      if ( +srcID === 60 ) newBoard[destID] = 'throne';
      if ( onlyForKingSquares.indexOf(+destID) !== -1 ) newBoard[destID] = 0;
    }

    [newBoard[srcID], newBoard[destID]] = [newBoard[destID], newBoard[srcID]];
    setTurn(blockAllMoves)
    setData(newBoard)
  }

  let { board } = props;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledBoard>
          {board.map((id, i) => {
            return <Square
              key={i}
              squareID = {i}
              squareValue={id}
            />
          })}
      </StyledBoard>
    </DragDropContext>
  )
}

const mapStateToProps = store => {
  return {
    board: store.board,
    availableSquares: store.availableSquares,
  }
}

const mapDispatchToProps = dispatch => ({
  setData: (board) => {dispatch(setData(board))},
  setAvailableSquares: (squares) => {dispatch(setAvailableSquares(squares))},
  setTurn: (blockAll) => {dispatch(setTurn(blockAll))}
})

export default connect(mapStateToProps, mapDispatchToProps) (Board);
