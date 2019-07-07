import React, { Component } from 'react';
import Piece from './piece.js';
import { Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux';
import {
} from '../actions/rootActions.js'
import nanoid from 'nanoid';

class Square extends Component {
  render() {
    let {squareID, squareValue, forbidden_squares, availableSquares} = this.props;
    let current_square = forbidden_squares.some( (forbidden_one) => {
      return (forbidden_one === squareID);
    })
    let availableSquare = availableSquares.some( (availableSquare) => {
      return (availableSquare === squareID);
    })

    let pieceID = nanoid(6);

    return (
      <Droppable droppableId={squareID+''} type="TASK">
      {(provided, snapshot) => (
        <div
          className={availableSquare ? "Square green" : current_square ? "Square black" : "Square"}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {<Piece color={squareValue} id={pieceID} index = {1} squareID={squareID} />}
          {provided.placeholder}
        </div>
        )}
      </Droppable>
    )
  }
}

const mapStateToProps = store => {
  return {
    forbidden_squares: store.forbidden_squares,
    availableSquares: store.availableSquares,
  }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps) (Square);
