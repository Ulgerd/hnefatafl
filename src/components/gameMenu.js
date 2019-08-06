import React from 'react';
import Icon from './icon.js';
import { piecesCounter } from '../utils/piecesCounter.js'
import { connect } from 'react-redux';
import { setData, setNewGame, returnGameToTurn } from '../actions/rootActions.js'
import styled from 'styled-components'

const StyledDisplay = styled.tr`
cursor: pointer;`

function GameMenu(props) {
  let { history, setNewGame } = props;
  return (
    <div>
      <h2>Game menu</h2>
      <button onClick ={setNewGame}>Начать новую игру</button>
      <h3>История ходов</h3>
      <table>
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
                <td>{`Ход ${obj.turn}`}</td>
                <td>{totalPieces.black}</td>
                <td>{`${totalPieces.white} + ${totalPieces.king || 0}`}</td>
              </StyledDisplay>
            })
          }
        </tbody>
      </table>
    </div>
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
