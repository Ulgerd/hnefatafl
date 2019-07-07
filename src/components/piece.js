import React, { Component } from 'react';
import Icons from '../data/icons.svg';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import {
  setData,
  setAvailableSquares
} from '../actions/rootActions.js'
import { availableSquares } from '../utils/availableSquares.js';

class Piece extends Component {

  onClick = () => {
    let result = availableSquares(this.props.squareID, this.props.board);
    this.props.setAvailableSquares(result);
  }

  render() {
    let {color, id, index} = this.props;
    if (color === 0) return null;
    return (
      <Draggable
        draggableId={id}
        index={index}
      >
      {(provided, snapshot) => (
          <div
            className={`${color==='black' ? 'piece gray':'piece brown'}${!snapshot.isDragging ? ' non-translatable' : ''}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick = {this.onClick}
          >
            <div className ={'piece_base'}></div>
            <svg
              className={'piece_image'}
              fill= {color==='black' ? 'black' : color==='white' ? 'white': 'gold'}
              width='50'
              height='50'
            >
              <use xlinkHref={`${Icons}#${color==='black' ? 'wolf':'crow'}`}/>
            </svg>
          </div>
        )}
      </Draggable>
    )
  }
}

const mapStateToProps = store => {
  return {
    forbidden_squares: store.forbidden_squares,
    board: store.board,
  }
}

const mapDispatchToProps = dispatch => ({
  setData: (board) => {dispatch(setData(board))},
  setAvailableSquares: (squares) => {dispatch(setAvailableSquares(squares))}
})

export default connect(mapStateToProps, mapDispatchToProps) (Piece);
