import React, { Component } from 'react';
import Piece from './piece.js';
import { Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux';
import styled from 'styled-components'
import {
} from '../actions/rootActions.js'

const StyledSquare = styled.div`
  width: 2em;
  height: 2em;
  border: 1px solid black;
  background-color: ${props =>

    props.isDraggingOver ? 'skyblue' : props.squareColor }`

class Square extends Component {

  render () {
    let {squareID, squareValue, availableSquares} = this.props;

    let onlyForKingSquare = [0, 10, 60, 110, 120].some( (forbidden_one) => {
      return (forbidden_one === squareID);
    }) // различное отображение для выходов и трона. Можно рассматривать board, там все нынче норм))

    let availableSquare = availableSquares.some( (availableSquare) => {
      return (availableSquare === squareID);
    })

    return (
      <Droppable droppableId={squareID+''} type="TASK" isDropDisabled={!availableSquare} >
      {(provided, snapshot) => (
        <StyledSquare
          squareColor={availableSquare ? "green" : onlyForKingSquare ? "black" : 'DarkGoldenRod'}
          {...provided.droppableProps}
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {<Piece color={squareValue} id={squareID+200} index = {1} squareID={squareID} />}
          {provided.placeholder}
        </StyledSquare>
        )}
      </Droppable>
    )
  }
}

const mapStateToProps = store => {
  return {
    availableSquares: store.availableSquares,
  }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps) (Square);
