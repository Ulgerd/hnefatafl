import { findRow } from './findRow.js';
import { neighbourSquares } from '../data/gameConditions.js';

export const blackWinning = (board, kingID, prevNum) => {
  let row = findRow(kingID);
  let kingIsDead = neighbourSquares.every((num) => {
    let border = (num === -11 || num === 11) ? [0, 120] : row;
    let temp;

    if ( num === -11 || num === -11) {
      temp = ((board[kingID + num] !== 'white' && board[kingID + num] !== 0) || prevNum+num === 0)
        ? true
        : false;
    } else if (kingID+num >= border[0] && kingID+num <= border[1]) {
        temp = (board[kingID + num] === 'black' || board[kingID + num] === 'throne' || board[kingID + num] === 'escape' || prevNum+num === 0 )
        ? true
        : false;
    } else {
      temp = true;
    }
    return temp;
  })

  if (kingIsDead) {
    board[kingID] = 0;
  };
}
