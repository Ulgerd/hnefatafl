import React from 'react';
import Icon from './icon.js';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { setAvailableSquares } from '../actions/rootActions.js'
import { availableSquares } from '../utils/availableSquares.js';
import styled from 'styled-components'

const StyledPiece = styled.div`
  position: relative;
  border: 1px solid black;
  border-radius: 100px;
  width: 2em;
  height: 2em;
  background-color: brown;
  ${({ base }) => base && `
    background-color: gray;
  `}
  ${({ snapshot }) => snapshot && `
    -webkit-transform: unset !important;
    transform: unset !important;
  `}
`

function Piece (props) {
  let { squareValue, id, index, attackersTurn } = props;

  let fill = squareValue==='black' ?
    'black' :
    squareValue==='king' ?
    'gold' :
    'white';
  let svg = squareValue==='black' ? 'wolf': 'crow';

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
            let result = availableSquares(props.squareID, props.board);
            props.setAvailableSquares(result);
          }, 180)
          provided.dragHandleProps.onMouseDown(event);
        }
      })();

        return (
          <StyledPiece
            snapshot = {!snapshot.isDragging}
            base = {squareValue==='black'}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onMouseDown ={onMouseDown}
          >
            <Icon fill={fill} svg={svg} />
          </StyledPiece>
      );
      }}
    </Draggable>
  )
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
