import React, { Component } from 'react';
import Square from './square.js';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import {
  setData,
  setAvailableSquares
} from '../actions/rootActions.js'
import { removingPiece } from '../utils/removingPiece.js';


class Board extends Component {

  state = {
    squares: [],
  }

  onBeforeDragStart = result => {
    let { droppableId } = result.source;
    let { board } = this.props;
  }

  onDragEnd = result => {

    this.props.setAvailableSquares([])

    let { destination, source } = result
    let { board, setData } = this.props;

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (board[destination.droppableId] !== 0) {
      return
    }

    let a = removingPiece(source.droppableId, destination.droppableId, board)
    let newBoard = [...a];
    [newBoard[source.droppableId], newBoard[destination.droppableId]] = [newBoard[destination.droppableId], newBoard[source.droppableId]];

    setData(newBoard)
  }

  componentDidMount() {
    let black_pieces = [3,4,5,6,7,16,33,43,44,54,55,56,64,65,66,76,77,87,104,113,114,115,116,117]
    let white_pieces = [38,48,49,50,58,59,61,62,70,71,72,82]
    let king = [60]
    let board = new Array(121).fill(0).map((id, i) => {
        if (black_pieces.indexOf(i) > -1) {return 'black'}
        if (white_pieces.indexOf(i) > -1) {return 'white'}
        if (king.indexOf(i) > -1) {return 'king'}
        return 0;
    })
    this.props.setData(board)
  }

  render() {
    let {board} = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd} onBeforeDragStart={this.onBeforeDragStart}>
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
    black_pieces: store.black_pieces,
    white_pieces: store.white_pieces,
    king: store.king,
  }
}

const mapDispatchToProps = dispatch => ({
  setData: (board) => {dispatch(setData(board))},
  setAvailableSquares: (squares) => {dispatch(setAvailableSquares(squares))}
})

export default connect(mapStateToProps, mapDispatchToProps) (Board);
