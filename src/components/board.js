import React, { Component } from 'react';
import Square from './square.js';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { setData, setAvailableSquares, setTurn } from '../actions/rootActions.js'
import { removingPiece } from '../utils/removingPiece.js';
import { winningConditionsCheck } from '../utils/winningConditionsCheck.js'
import { movementRejected } from '../utils/movementRejected.js'
import { onlyForKingSquares } from '../data/gameConditions.js';

class Board extends Component {

  onDragEnd = result => {
    let { destination, source } = result
    let {
      board,setData, availableSquares, setTurn, setAvailableSquares
    } = this.props;

    setAvailableSquares([]);

    if ( movementRejected(destination, source, availableSquares) ) return;

    let sourceID = result.source.droppableId;
    let destinationID = result.destination.droppableId;

    let newBoard = removingPiece(board, sourceID, destinationID);
    let blockAll = winningConditionsCheck(newBoard, sourceID, destinationID);

    if ( newBoard[sourceID] === 'king' ) {
      if ( +sourceID === 60 ) newBoard[destinationID] = 'throne';
      if ( onlyForKingSquares.indexOf(+destinationID) !== -1 ) newBoard[destinationID] = 0;
    }

    [newBoard[sourceID], newBoard[destinationID]] = [newBoard[destinationID], newBoard[sourceID]];
    setTurn(blockAll)
    setData(newBoard)
  }

  render() {
    let { board } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="Board">
            {board.map((id, i) => {
              return <Square
                key={i}
                squareID = {i}
                squareValue={id}
              />
            })}
        </div>
      </DragDropContext>
    )
  }
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
