import React, { Component } from 'react';
import Header from './header.js';
import Board from './board.js';
import GameMenu from './gameMenu.js';
import { connect } from 'react-redux';
import { setInitialData } from '../actions/rootActions.js'
import {
  black_pieces, white_pieces, king, forbidden_squares
} from '../data/gameConditions.js';
import '../assets/CSS/app.css';

class App extends Component {

  componentDidMount() {
    let board = new Array(121).fill(0).map((id, i) => {
        if ( black_pieces.indexOf(i) > -1 ) return 'black';
        if ( white_pieces.indexOf(i) > -1 ) return 'white';
        if ( king.indexOf(i) > -1 ) return 'king';
        if ( forbidden_squares.indexOf(i) > -1 ) return 'escape';
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

const mapDispatchToProps = dispatch => ({
  setInitialData: (board) => {dispatch(setInitialData(board))},
})

export default connect(null, mapDispatchToProps) (App);
