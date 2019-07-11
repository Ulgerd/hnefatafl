import React, { Component } from 'react';
import Header from './header.js';
import Board from './board.js';
import GameMenu from './gameMenu.js';
import { connect } from 'react-redux';
import {
  setInitialData
} from '../actions/rootActions.js'
import '../data/App.css';

class App extends Component {

  componentDidMount() {
    let black_pieces = [3,4,5,6,7,16,33,43,44,54,55,56,64,65,66,76,77,87,104,113,114,115,116,117]
    let white_pieces = [38,48,49,50,58,59,61,62,70,71,72,82]
    let king = [60]
    let forbidden_squares = [0, 10, 110, 120]
    let board = new Array(121).fill(0).map((id, i) => {
        if (black_pieces.indexOf(i) > -1) {return 'black'}
        if (white_pieces.indexOf(i) > -1) {return 'white'}
        if (king.indexOf(i) > -1) {return 'king'}
        if (forbidden_squares.indexOf(i) > -1) {return 'escape'}
        return 0;
    })
    this.props.setInitialData(board)
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className={'app_body'}>
          <Board/>
          <GameMenu />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  setInitialData: (board) => {dispatch(setInitialData(board))},
})

export default connect(mapStateToProps, mapDispatchToProps) (App);
