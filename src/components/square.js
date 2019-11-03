import React from 'react';
import Piece from './piece.js';
import Background from './background.js';
import { Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux';
import { forbidden_squares } from '../data/gameConditions.js';
import styled from 'styled-components'

const StyledSquare = styled.div`
  width: 2em;
  height: 2em;
  border: 1px solid black;
  background-color: ${props =>
    props.isDraggingOver ? 'rgba(135,206,235,0.6)' : props.squareColor }`

function Square (props) {
  let { squareID, squareValue, availableSquares} = props;

  const escape = forbidden_squares.some( (forbidden_one) => {
    return (forbidden_one === squareID);
  })

  let availableSquare = availableSquares.some( (availableSquare) => {
    return (availableSquare === squareID);
  })

  let whatToGenerate = (
    [0,'throne','escape'].indexOf(squareValue) !== -1
  ) ? <Background squareValue={squareValue} /> :
      <Piece
        id={squareID+200}
        index = {1}
        squareID={squareID}
        squareValue={squareValue}
      />

  return (
    <Droppable
      droppableId={squareID+''}
      type="TASK"
      isDropDisabled={!availableSquare}
    >
    {(provided, snapshot) => (
      <StyledSquare
        squareColor={availableSquare ? 'rgba(0, 201, 8, 0.65)' :
                     escape ? 'rgba(166, 0, 0, 0.75)' :
                     'rgba(184, 134, 11,0.4)'}
        {...provided.droppableProps}
        ref={provided.innerRef}
        isDraggingOver={snapshot.isDraggingOver}
      >
        {whatToGenerate}
        {provided.placeholder}
      </StyledSquare>
      )}
    </Droppable>
  )
}

const mapStateToProps = store => {
  return {
    board: store.board,
    availableSquares: store.availableSquares,
  }
}

export default connect(mapStateToProps, null) (Square);
