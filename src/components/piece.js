import React, { Component } from 'react';
import Icons from '../assets/SVG/icons.svg';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import {
  setAvailableSquares
} from '../actions/rootActions.js'
import { availableSquares } from '../utils/availableSquares.js';

class Piece extends Component {
  render() {
    let {squareValue, id, index, attackersTurn} = this.props;
    if (squareValue === 0) return null;
    if (squareValue === 'escape') return null;
    if (squareValue === 'throne') return null;

    let dragDisabled = (attackersTurn==='All') ?
      true :
      ((attackersTurn && (squareValue === 'white' || squareValue === 'king')) || (!attackersTurn && squareValue === 'black')) ?
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
          return event =>  {
            event.persist()
            let result = availableSquares(this.props.squareID, this.props.board);
            this.props.setAvailableSquares(result);
            provided.dragHandleProps.onMouseDown(event);
          }
        })();

          return (
            <div
              className={`${squareValue==='black' ? 'piece gray':'piece brown'}${!snapshot.isDragging ? ' non-translatable' : ''}`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onMouseDown ={onMouseDown}
            >
              <div className ={'piece_base'}></div>
              <svg
                className={'piece_image'}
                fill= {squareValue==='black' ? 'black' : squareValue==='white' ? 'white': 'gold'}
                width='50'
                height='50'
              >
                <use xlinkHref={`${Icons}#${squareValue==='black' ? 'wolf':'crow'}`}/>
              </svg>
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
