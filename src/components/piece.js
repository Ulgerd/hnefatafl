import React, { Component } from 'react';
import Icons from '../data/icons.svg';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import {
  setAvailableSquares
} from '../actions/rootActions.js'
import { availableSquares } from '../utils/availableSquares.js';

class Piece extends Component {
  render() {
    let {color, id, index, attackersTurn} = this.props;
    if (color === 0) return null;
    if (color === 'escape') return null;
    if (color === 'throne') return null;

    let dragDisabled = (attackersTurn==='All') ? true : ((attackersTurn && (color === 'white' || color === 'king')) || (!attackersTurn && color === 'black')) ? true : false;

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
              className={`${color==='black' ? 'piece gray':'piece brown'}${!snapshot.isDragging ? ' non-translatable' : ''}`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onMouseDown ={onMouseDown}
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
