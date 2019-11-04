import React from 'react';
import Icon from '../icon.js';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { setAvailableSquares } from '../../actions/rootActions.js'
import { calcAvailableSquares } from '../../utils/calcAvailableSquares.js';
import styled from 'styled-components'

const StyledPiece = styled.div`
  position: relative;
  border: 1px solid black;
  border-radius: 100px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  width: 1.9em;
  height: 1.9em;
  margin: 0 auto;
  top: 1.5%;
  box-shadow:
   inset rgba(0,0,0,.5) -3px -3px 8px,
   inset rgba(255,255,255,.9) 3px 3px 8px,
   rgba(0,0,0,.8) 3px 3px 8px -3px;
  background-color: brown;
  ${({ base }) => base && `
    background-color: gray;
  `}
  ${({ snapshot }) => snapshot && `
    -webkit-transform: unset !important;
    transform: unset !important;
  `}
`

const onMouseEnter = (squareID, board, setAvailableSquares, dragDisabled) => {
  if (!dragDisabled) {
    let result = calcAvailableSquares(squareID, board)
    setAvailableSquares(result)
  }
}

const onMouseLeave = (isDragging, setAvailableSquares) => {
  if (!isDragging) {
    setAvailableSquares([])
  }
}

function centerPiece(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  const { moveTo } = snapshot.dropAnimation;
  const translate = `translate(${moveTo.x+1}px, ${moveTo.y+1}px)`;
  return {
    ...style,
    transform: `${translate}`,
  };
}

function Piece (props) {
  let { squareValue, id, index, attackersTurn, squareID, board, setAvailableSquares} = props;

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
        return (
          <StyledPiece
            onMouseEnter = {() => {onMouseEnter(squareID, board, setAvailableSquares, dragDisabled)}}
            onMouseLeave = {() => {onMouseLeave(snapshot.isDragging, setAvailableSquares)}}
            snapshot = {!snapshot.isDragging}
            base = {squareValue==='black'}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={centerPiece(provided.draggableProps.style, snapshot)}
          >
            <Icon fill={fill} svg={svg} width='45' height='45' />
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
