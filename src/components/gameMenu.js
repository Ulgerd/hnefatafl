import React from 'react';
import Icon from './icon.js';
import { piecesCounter } from '../utils/piecesCounter.js'
import { connect } from 'react-redux';
import { setData, setNewGame, returnGameToTurn } from '../actions/rootActions.js'
import styled from 'styled-components'
import border from '../assets/boardBorder2.svg'

const StyledWrapper = styled.div`
  background-image: url(${border});
  background-color: white;
  background-size: 100% 100%;
  border-radius: 1em;
  background-repeat: no-repeat;
  position: relative;
  font-size: 1em;
  width: 18em;`

const StyledGameMenu = styled.div`
  margin-top:1em;
  margin-left: 1em;
  position: absolute;
  width: 13em;
  height: 95%;
  font-family: 'Norse';
  font-size:1.2em;
  background-color: white`

const StyledDisplay = styled.tr`
  cursor: pointer;`

const StyledButton = styled.button`
  font-family: 'Norse';
  margin: 1em 0 1.5em;
  font-size:1em;
  width: 6em;
  cursor: pointer;`

const StyledTable = styled.table`
  width: 100%;`

function GameMenu(props) {
  let { history, setNewGame } = props;
  return (
    <StyledWrapper>
      <StyledGameMenu>
        <h2>Game menu</h2>
        <StyledButton onClick ={setNewGame}>New game</StyledButton>
        <h3>History</h3>
        <StyledTable>
          <thead>
            <tr>
              <th></th>
              <th><Icon fill={'black'} svg={'wolf'} /></th>
              <th><Icon fill={'black'} svg={'crow'} /></th>
            </tr>
          </thead>
          <tbody>
            {
              history.map((obj, i) => {
              let totalPieces = piecesCounter(obj);
              return <StyledDisplay
                  onClick={() => props.returnGameToTurn(obj.turn)}
                  key={i}
                >
                  <td>{`Turn ${obj.turn}`}</td>
                  <td>{totalPieces.black}</td>
                  <td>{`${totalPieces.white} + ${totalPieces.king || 0}`}</td>
                </StyledDisplay>
              })
            }
          </tbody>
        </StyledTable>
      </StyledGameMenu>
    </StyledWrapper>
  )
}

const mapStateToProps = store => {
  return {
    availableSquares: store.availableSquares,
    history: store.history,
  }
}

const mapDispatchToProps = dispatch => ({
  setData: (board) => {dispatch(setData(board))},
  setNewGame: () => {dispatch(setNewGame())},
  returnGameToTurn: (turn) => {dispatch(returnGameToTurn(turn))},
})

export default connect(mapStateToProps, mapDispatchToProps) (GameMenu);
