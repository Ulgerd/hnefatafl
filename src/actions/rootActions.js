import {
  SET_DATA,
  SET_AVAILABLE_SQUARES
} from './actionTypes';

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
