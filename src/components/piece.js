import React, { Component } from 'react';
import Icon from './icon.js';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { setAvailableSquares } from '../actions/rootActions.js'
import { availableSquares } from '../utils/availableSquares.js';

class Piece extends Component {
  render() {
    let { squareValue, id, index, attackersTurn } = this.props;

    let fill = squareValue==='black' ?
      'black' :
      squareValue==='king' ?
      'gold' :
      'white';
    let svg = squareValue==='black' ? 'wolf': 'crow';
    let base = squareValue==='black' ? 'piece gray': 'piece brown';

    let dragDisabled = (
      (attackersTurn && (squareValue === 'white' || squareValue === 'king')) ||
      (!attackersTurn && squareValue === 'black') ||
      attackersTurn==='All') ?
      true :
      false;

    return (
      <Draggable
        key={id}
        draggableId={id}
        index={index}
        isDragDisabled={dragDisabled}
      >
      {(provided, snapshot) => {
        const onMouseDown = (() => {
          if (!provided.dragHandleProps) {
            return;
          }
          return event => {
            event.persist()
            setTimeout(() => {
              let result = availableSquares(this.props.squareID, this.props.board);
              this.props.setAvailableSquares(result);
            }, 200)
            provided.dragHandleProps.onMouseDown(event);
          }
        })();

          return (
            <div
              className={`${base}${!snapshot.isDragging ? ' non-translatable' : ''}`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onMouseDown ={onMouseDown}
            >
              <div className ={'piece_base'}></div>
              <Icon fill={fill} svg={svg} />
            </div>
        );
        }}
      </Draggable>
    )
  }
}

const mapStateToProps = store => {
  return {
    board: store.board,
    attackersTurn: store.attackersTurn,
  }
}

const mapDispatchToProps = dispatch => ({
  setAvailableSquares: (squares) => {dispatch(setAvailableSquares(squares))}
})

export default connect(mapStateToProps, mapDispatchToProps) (Piece);
