import React from 'react';
import Square from './square.js';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { setData, setAvailableSquares, setTurn } from '../../actions/rootActions.js'
import { removingPiece } from '../../utils/removingPiece.js';
import { winningConditionsCheck } from '../../utils/winningConditionsCheck.js'
import { movementRejected } from '../../utils/movementRejected.js'
import { onlyForKingSquares } from '../../data/gameConditions.js';
import styled from 'styled-components'
import border from '../../assets/SVG/boardBorder.svg'
import woodTexture from '../../assets/backgrounds/wood.jpg'
import Popup from "reactjs-popup";

const StyledWrapper = styled.div`
  background-image: url(${border});
  background-color: #8e7618;
  background-size: 100% 100%;
  border-radius: 0.5em;
  background-repeat: no-repeat;
  position: relative;
  font-size: 2em;
  width: 23.3em;
  height: 23.3em;`

const StyledBoard = styled.div`
  background-image: url(${woodTexture});
  margin-top: 0.65em;
  margin-left: 0.64em;
  font-size: 1em;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(11, 1fr);
  grid-gap: 0;`

const StyledPopupDiv = styled.div`
  font-family: 'Norse';
  margin: 1em 0;
  font-size:1em;`

let iSeeWinner;

function Board (props) {
  const onDragEnd = result => {
    let { destination, source } = result
    let {
      board,setData, availableSquares, setTurn, setAvailableSquares
    } = props;

    if ( movementRejected(destination, source, availableSquares) ) return;

    let srcID = result.source.droppableId;
    let destID = result.destination.droppableId;

    setAvailableSquares([])

    let newBoard = removingPiece(board, srcID, destID);

    iSeeWinner = winningConditionsCheck(newBoard, srcID, destID);

    let blockAllMoves = Boolean (iSeeWinner);

    if ( newBoard[srcID] === 'king' ) {
      if ( +srcID === 60 ) newBoard[destID] = 'throne';
      if ( onlyForKingSquares.indexOf(+destID) !== -1 ) newBoard[destID] = 0;
    }

    [newBoard[srcID], newBoard[destID]] = [newBoard[destID], newBoard[srcID]];
    setTurn(blockAllMoves)
    setData(newBoard)
  }

  let { board } = props;
  return (

    <DragDropContext onDragEnd={onDragEnd}>
      <StyledWrapper src={border} alt="Logo">
      <Popup
        open={Boolean (iSeeWinner)}
        closeOnDocumentClick
      >
      <StyledPopupDiv>{iSeeWinner}</StyledPopupDiv>
      </Popup>
        <StyledBoard>
            {board.map((id, i) => {
              return <Square
                key={i}
                squareID = {i}
                squareValue={id}
              />
            })}
        </StyledBoard>
      </StyledWrapper>
    </DragDropContext>
  )
}

const mapStateToProps = store => {
  return {
    board: store.board,
    availableSquares: store.availableSquares,
  }
}

const mapDispatchToProps = dispatch => ({
  setData: (board) => {dispatch(setData(board))},
  setAvailableSquares: (squares) => {dispatch(setAvailableSquares(squares))},
  setTurn: (blockAll) => {dispatch(setTurn(blockAll))}
})

export default connect(mapStateToProps, mapDispatchToProps) (Board);
