import React, { Component } from 'react';
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
    props.isDraggingOver ? 'skyblue' : props.squareColor }`

class Square extends Component {

  render () {
    let { squareID, squareValue, availableSquares } = this.props;

    let escape = forbidden_squares.some( (forbidden_one) => {
      return (forbidden_one === squareID);
    })

    let availableSquare = availableSquares.some( (availableSquare) => {
      return (availableSquare === squareID);
    })

    let whatToGenerate = (squareValue === 'throne' || squareValue === 0 || squareValue === 'escape') ?
      <Background squareValue={squareValue} /> : <Piece squareValue={squareValue} id={squareID+200} index = {1} squareID={squareID} />

    return (
      <Droppable droppableId={squareID+''} type="TASK" isDropDisabled={!availableSquare} >
      {(provided, snapshot) => (
        <StyledSquare
          squareColor={availableSquare ? 'green' : escape ? 'brown' : 'DarkGoldenRod'}
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
}

const mapStateToProps = store => {
  return {
    board: store.board,
    availableSquares: store.availableSquares,
  }
}

export default connect(mapStateToProps, null) (Square);
