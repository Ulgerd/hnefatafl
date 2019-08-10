import {
  SET_INITIAL_DATA,
  SET_DATA,
  SET_AVAILABLE_SQUARES,
  SET_NEW_GAME,
  SET_TURN,
  RETURN_GAME_TO_TURN
} from './actionTypes';

export function setInitialData(board,avSquares) {
  return {
    type: SET_INITIAL_DATA,
    board,
    avSquares
  }
}

export function setData(board) {
  return {
    type: SET_DATA,
    board,
  }
}

export function setAvailableSquares(squares) {
  return {
    type: SET_AVAILABLE_SQUARES,
    squares,
  }
}

export function setNewGame() {
  return {
    type: SET_NEW_GAME,
  }
}

export function setTurn(blockAll) {
  return {
    type: SET_TURN,
    blockAll
  }
}

export function returnGameToTurn(turn) {
  return {
    type: RETURN_GAME_TO_TURN,
    turn
  }
}
