import React, { Component } from 'react';
import Square from './square.js';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import {
  setData,
  setAvailableSquares,
  setTurn
} from '../actions/rootActions.js'
import { removingPiece } from '../utils/removingPiece.js';

class Board extends Component {

  state = {
    squares: [],
  }

  // onBeforeDragStart = result => {
  //   let { droppableId } = result.source;
  //   let { board } = this.props;
  //   let a = availableSquares(droppableId, board)
  //
  //   this.setState({squares: a})
  //
  // }

  onDragEnd = result => {

    this.props.setAvailableSquares([])

    let { destination, source } = result
    let { board, setData, availableSquares, setTurn } = this.props;
    let blockAll=false;

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (!availableSquares.some(squareNumber => +squareNumber === +destination.droppableId)) {
      return
    }

    if ( board[source.droppableId] === 'king' && board[destination.droppableId] === 'escape') {
      blockAll = true;
      alert('Победа защитников!')
    }

    let a = removingPiece(source.droppableId, destination.droppableId, board)
    let newBoard = [...a];
    if (newBoard[source.droppableId] === 'king' && +source.droppableId === 60) {
      newBoard[destination.droppableId] = 'throne'
    }

    if (newBoard[source.droppableId] === 'king' && +destination.droppableId === 60) {
      newBoard[destination.droppableId] = 0
    }

    [newBoard[source.droppableId], newBoard[destination.droppableId]] = [newBoard[destination.droppableId], newBoard[source.droppableId]];
    setTurn(blockAll)
    setData(newBoard)

  }

  render() {
    let {board} = this.props;
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
