import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  setData,
  setNewGame,
  returnGameToTurn
} from '../actions/rootActions.js'

class GameMenu extends Component {

  // state = {
  //   squares: [],
  // }

  // onClick = (turn) => {
  //   this.props.setNewGame();
  // }

  render() {
    let { history } = this.props;
    return (
      <div>
        <h2>Game menu</h2>
        <button onClick ={this.props.setNewGame}>Начать новую игру</button>
        <h3>История ходов</h3>
        <table>
          <thead>
            <tr>
              <th>Номер хода</th>
              <th>Нападающих</th>
              <th>Защитников</th>
            </tr>
          </thead>
          <tbody>
            {
              history.map((arr, i) => {
              let totalPieces = arr.reduce((allPieces, piece)=>{
                if (piece in allPieces) {
                  allPieces[piece]++;
                }
                else {
                  allPieces[piece] = 1;
                }
                return allPieces;
              }, {})
              return <tr onClick={() => this.props.returnGameToTurn(i)}>
                  <td>{`Ход ${i}`}</td>
                  <td>{totalPieces.black}</td>
                  <td>{totalPieces.white}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    availableSquares: store.availableSquares,
    history: store.history, // [[],[],[],]
  }
}

const mapDispatchToProps = dispatch => ({
  setData: (board) => {dispatch(setData(board))},
  setNewGame: () => {dispatch(setNewGame())},
  returnGameToTurn: (turn) => {dispatch(returnGameToTurn(turn))},
})

export default connect(mapStateToProps, mapDispatchToProps) (GameMenu);
